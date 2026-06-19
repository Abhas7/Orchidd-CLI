import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const config = {
    googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
    model: process.env.ORBITAL_MODEL || "gemini-1.5-flash",
    aiProvider: process.env.AI_PROVIDER || "google",
    ollamaModel: process.env.OLLAMA_MODEL || "qwen2.5-coder:1.5b",
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
    customModel: process.env.CUSTOM_AI_MODEL || "",
    customBaseUrl: process.env.CUSTOM_AI_BASE_URL || "",
    customApiKey: process.env.CUSTOM_AI_API_KEY || "",
}
