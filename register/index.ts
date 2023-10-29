import { ApplicationCommandDataResolvable, ClientEvents } from "discord.js";
import { cmdSm, cmdNm, modals } from "../code/cmd/format";
import { bot } from "../../"
import { Event } from "../event";
import { fileRead } from "../code/cmd/fileRead";

const getFiles = new fileRead()

export class register {
    public async register() {
        // SLASH COMMAND
        const sm: ApplicationCommandDataResolvable[] = [];

        getFiles.read("./src/cmd/sCmd/").then(async paths => {
            for (const path of paths) {
                const cmd: cmdSm = await getFiles.import(path);
                if (!cmd.name) return;
                bot.slashCmds.set(cmd.name, cmd);

                sm.push(cmd);

                bot.on("ready", async () => {
                    bot.application.commands.set(sm);
                });
            };
        });

        // NORMAL COMMANDS  
        getFiles.read("./src/cmd/nCmd/").then(async paths => {
            for (const path of paths) {
                const cmd: cmdNm = await getFiles.import(path);
                if (!cmd.name) return;

                bot.normalCmds.set(cmd.name, cmd);
                if (cmd?.aliases && Array.isArray(cmd?.aliases)) cmd.aliases.forEach(alias => bot.normalCmds.set(alias, cmd));
            };
        });

        // MODALS
        getFiles.read("./src/cmd/modals").then(async paths => {
            for (const path of paths) {
                const modalsFile: modals = await getFiles.import(path);
                if (!modalsFile.name) return;
                bot.modals.set(modalsFile.name, modalsFile);
            };
        });

        // EVENTS
        getFiles.read("./src/events/").then(async files => {
            for (const file of files) {
                const eventName: Event<keyof ClientEvents> = await getFiles.import(file);
                bot.on(eventName.event, eventName.exec);
            };
        });
    }
}