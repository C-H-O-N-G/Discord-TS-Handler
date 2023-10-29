import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { cmdNm, cmdSm, modals } from "./code/cmd/format";
import { register } from "./register";

const registerClient = new register();

export class extBot extends Client {
    slashCmds: Collection<string, cmdSm> = new Collection();
    normalCmds: Collection<string, cmdNm> = new Collection();
    modals: Collection<string, modals> = new Collection();
    timeout: Collection<any, any> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ],
            waitGuildTimeout: 30000,
            partials: [
                Partials.GuildMember,
                Partials.Channel,
                Partials.Message,
                Partials.User
            ],
            allowedMentions: {
                parse: ["roles", "users"]
            },
        })
    };

    start(token: string) {
        this.login(token);
        registerClient.register();
    };
}