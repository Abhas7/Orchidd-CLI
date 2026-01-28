#!/usr/bin/env node

import dotenv from "dotenv"
import chalk from "chalk"
import figlet from "figlet"
import { wakeUp } from "./commands/ai/wakeUp.js";



import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";




dotenv.config();


async function main() {
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

