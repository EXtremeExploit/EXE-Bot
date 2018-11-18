import { Client } from 'discord.js';

declare type Json = {
    token: string;
    prefix: string;
    osuApiKey: string;
    fortnite: string;
    discordBots: DiscordBots;
    db: DB;
    google: Google;
    owner: Owner;
    debug: boolean;
    wikisEnabled: boolean;
    wikis: Wikis;
    commands: Commands;
    maintance: boolean;
    replies: Replies;
}

export declare class Data {
    token(): string;
    prefix(): string;
    osuApiKey(): string;
    fortnite(): string;
    db(): DB;
    google(): Google;
    discordBots(): DiscordBots;
    owner(): Owner;
    debug(): boolean | string;
    wikisEnabled(): boolean | string;
    wikis(): Wikis;
    commands(): Commands;
    maintance(): boolean | string;
    replies(): Replies;
}


export declare type DiscordBots = {
    enabled: boolean;
    token: string;
}

export declare type DB = {
    url: string;
    username: string;
    password: string;
}

declare type Google = {
    cseID: string;
    appApiKey: string;
}

declare type Owner = {
    id: number;
    username: string;
    discriminator: string;
    tag: string;
}

declare type Wikis = {
    home: string;
    commands: string;
    replies: string;
    faq: string;
    modifiers: string;
}

declare type Commands = {
    categories: Categories
}

declare type Categories = {
    Support: boolean;
    Info: boolean;
    Random: boolean;
    Moderation: boolean;
    NSFW: boolean;
    Fun: boolean;
    Games: boolean;
    Misc: boolean;
    Wiki: boolean;
    BotOwner: boolean;
    Utility: boolean;
}

export declare type Replies = {
    standard: boolean;
    osu: boolean;
}

export declare class Functions {
    constructor();
    clean(text: string): string;
    reverseString(string: string): string;
    fixDecimals(number: number): string;
    replacedWikis(string: string): string;
    convertMS(ms: number): {
        miliseconds: number,
        seconds: number,
        minutes: number,
        hours: number,
        days: number
    }
}


export declare type HelpGenerator = {
    support: string;
    fun: string;
    info: string;
    misc: string;
    moderation: string;
    nsfw: string;
    osu: string;
    random: string;
    utility: string;
    wiki: string;
}

export declare class Events {
    constructor(client: Client): Events;
    ready(): void;
    disconnect(): void;
    reconnecting(): void;
    warn(): void;
    channelCreate(): void;
    channelDelete(): void;
    channelPinsUpdate(): void;
    channelUpdate(): void;
    clientUserGuildSettingsUpdate(): void;
    clientUserSettingsUpdate(): void;
    emojiCreate(): void;
    emojiDelete(): void;
    emojiUpdate(): void;
    guildBanAdd(): void;
    guildBanRemove(): void;
    guildCreate(): void;
    guildMemberAdd(): void;
    guildMemberAvailable(): void;
    guildMemberRemove(): void;
    guildMembersChunk(): void;
    guildMemberSpeaking(): void;
    guildMemberUpdate(): void;
    guildUnavailable(): void;
    guildUpdate(): void;
    messageDelete(): void;
    messageDeleteBulk(): void;
    messageReactionAdd(): void;
    messageReactionRemove(): void;
    messageReactionRemoveAll(): void;
    messageUpdate(): void;
    presenceUpdate(): void;
    resume(): void;
    roleCreate(): void;
    roleDelete(): void;
    roleUpdate(): void;
    typingStart(): void;
    typingStop(): void;
    userNoteUpdate(): void;
    userUpdate(): void;
    voiceStateUpdate(): void;
    all(): void;
    error(): void;
}

export declare class Main {
    json: Json;
    events: any;
    getJson(): Json;
    getData(): Data;
    getEvents(Client: Client): Events;
    getFunctions(): Functions;
    getPrototypes():  typeof import('./prototypes');
    getTools():  typeof import('./prototypes');
    helpGenerator(): HelpGenerator;
    getModels(): typeof import('./models')
}
