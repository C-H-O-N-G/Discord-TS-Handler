import chalk from "chalk";
import { CommandInteraction, Message } from "discord.js";
import { removeAllListeners } from "process";

let error: any;

export class errHandler {
    private async watch(msg) {
        if (msg instanceof CommandInteraction) {
            console.log(`[${chalk.red("ERROR")}] ${error}`);
        } else if (msg instanceof Message) {
            console.log(`[${chalk.red("ERROR")}] ${error}`);
        }
    }

    public async check(message) {
        ["rejectionHandled", "uncaughtException", "unhandledRejection", "uncaughtExceptionMonitor"].forEach(x => {
            process.on(x, err => {
                error = err;
                this.watch(message);
                removeAllListeners;
            })
        })
    }
}