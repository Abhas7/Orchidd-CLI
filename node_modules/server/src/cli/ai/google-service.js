import { google } from "@ai-sdk/google";
import { streamText, generateObject } from "ai";
import { config } from "../../config/google.config.js";
import chalk from "chalk";


export class AIService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    this.model = google(config.model, {
      apiKey: config.googleApiKey,
      apiVersion: "v1", // Using v1 instead of the default v1beta
    });

  }

  /**
   * Send a message and get streaming response
   * @param {Array} messages - Array of message objects {role, content}
   * @param {Function} onChunk - Callback for each text chunk
   * @param {Object} tools - Optional tools object
   * @param {Function} onToolCall - Callback for tool calls
   * @returns {Promise<Object>} Full response with content, tool calls, and usage
   */
  async sendMessage(messages, onChunk, tools = undefined, onToolCall = null) {
    try {
      console.log(chalk.gray(`[DEBUG] API Key: ${config.googleApiKey ? config.googleApiKey.slice(0, 5) + "..." : "EMPTY"}`));
      console.log(chalk.gray(`[DEBUG] Model: ${config.model}`));
      console.log(chalk.gray(`[DEBUG] Messages being sent: ${JSON.stringify(messages, null, 2)}`));

      const streamConfig = {
        model: this.model,
        messages: messages,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
      };

      // Add tools if provided with maxSteps for multi-step tool calling
      if (tools && Object.keys(tools).length > 0) {
        streamConfig.tools = tools;
        streamConfig.maxSteps = 5;

        console.log(chalk.gray(`[DEBUG] Tools enabled: ${Object.keys(tools).join(', ')}`));
      }

      const result = streamText(streamConfig);

      // The result of streamText is handled below through stream iteration and awaiting the result.


      let fullResponse = "";
      let hasError = false;

      // Stream text chunks
      try {
        for await (const chunk of result.textStream) {
          fullResponse += chunk;
          if (onChunk) {
            onChunk(chunk);
          }
        }
      } catch (streamIterationError) {
        hasError = true;
        console.error(chalk.red("\n❌ Error during stream iteration:"));
        console.error(chalk.red(`  Message: ${streamIterationError.message}`));

        if (streamIterationError.name === 'AI_APICallError' && streamIterationError.statusCode === 404) {
          console.error(chalk.yellow("  👉 Logic: The model name might be incorrect or not available for your API key."));
        } else if (streamIterationError.name === 'AI_APICallError' && streamIterationError.statusCode === 429) {
          console.error(chalk.yellow("  👉 Logic: You have exceeded your API quota. Please check your plan and usage."));
        } else if (streamIterationError.name === 'AI_APICallError' && streamIterationError.statusCode === 403) {
          console.error(chalk.yellow("  👉 Logic: API key is invalid or lacks permissions."));
        } else if (streamIterationError.name === 'AI_APICallError') {
          console.error(chalk.yellow(`  👉 Logic: An API call error occurred with status code ${streamIterationError.statusCode}.`));
        }

        if (!fullResponse) {
          fullResponse = "I'm sorry, I encountered an error while communicating with the AI service. Please try again in a moment.";
        }
      }

      // Finalize the result
      let fullResult;
      try {
        fullResult = await result;
      } catch (streamError) {
        if (streamError.name === 'AI_NoOutputGeneratedError' || streamError.name === 'AI_APICallError') {
          console.error(chalk.yellow("\n⚠️  AI SDK Error: No output generated or API call failed."));
          console.error(chalk.gray(`  Error Name: ${streamError.name}`));
          console.error(chalk.gray(`  Error Message: ${streamError.message}`));

          if (streamError.name === 'AI_APICallError') {
            if (streamError.statusCode === 404) {
              console.error(chalk.yellow("  👉 Logic: The model name might be incorrect or not available for your API key."));
            } else if (streamError.statusCode === 429) {
              console.error(chalk.yellow("  👉 Logic: You have exceeded your API quota. Please check your plan and usage."));
            } else if (streamError.statusCode === 403) {
              console.error(chalk.yellow("  👉 Logic: API key is invalid or lacks permissions."));
            } else {
              console.error(chalk.yellow(`  👉 Logic: An API call error occurred with status code ${streamError.statusCode}.`));
            }
          } else {
            console.error(chalk.gray("  This often happens due to safety filters blocking the response or an empty stream."));
          }

          return {
            content: fullResponse || "I'm sorry, I was unable to generate a response. This usually happens if the model is not found, your quota is limited, or safety filters blocked the content.",
            finishReason: "error",
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
            toolCalls: [],
            toolResults: [],
            steps: [],
          };
        }
        throw streamError;
      }

      const toolCalls = [];
      const toolResults = [];

      if (fullResult.steps && Array.isArray(fullResult.steps)) {
        for (const step of fullResult.steps) {
          if (step.toolCalls && step.toolCalls.length > 0) {
            for (const toolCall of step.toolCalls) {
              toolCalls.push(toolCall);
              if (onToolCall) onToolCall(toolCall);
            }
          }
          if (step.toolResults && step.toolResults.length > 0) {
            toolResults.push(...step.toolResults);
          }
        }
      }

      return {
        content: fullResponse || fullResult.text || "",
        finishReason: fullResult.finishReason,
        usage: fullResult.usage,
        toolCalls,
        toolResults,
        steps: fullResult.steps,
      };
    } catch (error) {
      console.error(chalk.red("\n❌ AI Service Error:"), error.name);
      console.error(chalk.red(`Message: ${error.message}`));
      if (error.cause) console.error(chalk.gray("Cause:"), JSON.stringify(error.cause, null, 2));
      return {
        content: "I'm sorry, an unexpected error occurred. Please check the logs above.",
        finishReason: "error",
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        toolCalls: [],
        toolResults: [],
        steps: [],
      };
    }
  }

  /**
   * Get a non-streaming response
   * @param {Array} messages - Array of message objects
   * @param {Object} tools - Optional tools
   * @returns {Promise<string>} Response text
   */
  async getMessage(messages, tools = undefined) {
    let fullResponse = "";
    const result = await this.sendMessage(messages, (chunk) => {
      fullResponse += chunk;
    }, tools);
    return result.content;
  }

  /**
   * Generate structured output using a Zod schema
   * @param {Object} schema - Zod schema
   * @param {string} prompt - Prompt for generation
   * @returns {Promise<Object>} Parsed object matching the schema
   */
  async generateStructured(schema, prompt) {
    try {
      const result = await generateObject({
        model: this.model,
        schema: schema,
        prompt: prompt,
      });

      return result.object;
    } catch (error) {
      console.error(chalk.red("AI Structured Generation Error:"), error.message);
      throw error;
    }
  }
}