#!/usr/bin/env node

import dotev from "dotenv"
import chalk from "chalk"
import figlet from "figlet"


import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";




dotev.config();


async function main() {
    // Display Banner
    console.log(
        chalk.cyan(
            figlet.textSync("Orbital CLI", {
                font:"Standard",
                horizontalLayout:"default"
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
    // Default action shows help
  program.action(()=>{
    program.help();
  });

  program.parse()

}

main().catch((err) =>{
    console.log(chalk.red("Error running orbital CLI:"), err)
    process.exit(1)

})

