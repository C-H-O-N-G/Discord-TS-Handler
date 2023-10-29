import { ChatInputApplicationCommandData, ChatInputCommandInteraction, CommandInteraction, CommandInteractionOptionResolver, Guild, GuildMember, Message, ModalMessageModalSubmitInteraction, ModalSubmitInteraction, PermissionResolvable, User, UserMention } from "discord.js";
import { extBot } from "../../client";

export interface extInteraction extends CommandInteraction {
    member: GuildMember
    user: User
    mention: UserMention
    guild: Guild
};

export interface extMessage extends Message {
    member: GuildMember
    author: User
    mention: UserMention
    guild: Guild
};

export interface extModals extends ModalSubmitInteraction {
    member: GuildMember
    user: User
    mention: UserMention
    guild: Guild
}

interface runSm {
    bot: extBot
    interaction: extInteraction
    args: CommandInteractionOptionResolver
};

interface runNm {
    bot: extBot,
    msg: extMessage,
    args: string[]
};

interface runModals {
    bot: extBot,
    interaction: extModals
};

type functionRunSlash = (options: runSm) => any;
type functionRunCmd = (options: runNm) => any;
type functionRunModals = (options: runModals) => any;

export type modals = {
    name: string,
    exec: functionRunModals
} & ChatInputApplicationCommandData;

export type cmdSm = {
    name: string,
    description: string,
    defer: boolean,
    perms?: PermissionResolvable[],
    timeout?: number,
    reply: boolean,
    exec: functionRunSlash,
} & ChatInputApplicationCommandData;

export type cmdNm = {
    name: string,
    description: string,
    perms?: PermissionResolvable[],
    timeout?: number,
    aliases?: string[],
    exec: functionRunCmd
};