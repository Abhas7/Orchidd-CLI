#!/usr/bin/env node

import dotenv from "dotenv"
import chalk from "chalk"
import figlet from "figlet"
import { wakeUp } from "./commands/ai/wakeUp.js";



import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";




import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly point to the .env file in the server root
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Handle global errors and unhandled rejections to prevent silent crashes
process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.red("\n❌ Unhandled Rejection at:"), promise);
    console.error(chalk.red("Reason:"), reason);
});

process.on("uncaughtException", (error) => {
    console.error(chalk.red("\n❌ Uncaught Exception:"));
    console.error(error);
    process.exit(1);
});


async function main() {
    // Debug logging for .env
    const envPath = path.join(__dirname, "../../.env");
    console.log(chalk.gray(`[DEBUG] Loading .env from: ${envPath}`));
    console.log(chalk.gray(`[DEBUG] API Key starts with: ${process.env.GOOGLE_GENERATIVE_AI_API_KEY ? process.env.GOOGLE_GENERATIVE_AI_API_KEY.slice(0, 5) : "MISSING"}`));
    console.log(chalk.gray(`[DEBUG] Model set in env: ${process.env.ORBITAL_MODEL || "gemini-1.5-flash"}`));

    // Display Banner
    console.log(
        chalk.cyan(
            figlet.textSync("Orbital CLI", {
                font: "Standard",
                horizontalLayout: "default"
            })
        )
    )

    console.log(chalk.red("A cli based AI tool \n"))

    const program = new Command("orbitals")

    program.version("0.0.0")
        .description("Orbital CLI - A cli Based AI Tool")
        .addCommand(login)
        .addCommand(logout)
        .addCommand(whoami)
        .addCommand(wakeUp)

    // Default action shows help
    program
        .action((_args, command) => {
            command.help();
        })
        .allowExcessArguments();

    program.parse()

}

main().catch((err) => {
    console.log(chalk.red("Error running orbital CLI:"), err)
    process.exit(1)

})
