import { Events } from './events/events';
import { Client, StreamDispatcher } from 'discord.js';
import { Data } from './data/index';
import { Functions } from './Functions/index';

declare type Json = {
    token: string;
    prefix: string;
    osuApiKey: string;
    discordBots: DiscordBots;
    owner: Owner
    allEvents: boolean;
    debug: boolean;
    wikisEnabled: boolean;
    wikis: Wikis;
    commands: Commands;
    maintance: boolean;
    replies: Replies;
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

export declare type Servers = {
    queue: string[];
    dispatcher: StreamDispatcher;
}

export declare type DiscordBots = {
    enabled: boolean;
    token: string;
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

export declare class Main {
    json: Json;
    events: any;
    getJson(): Json;
    getData(): Data;
    getEvents(Client: Client): Events;
    getFunctions(): Functions;
    getPrototypes(): any;
    getTools(): any;
    helpGenerator(): HelpGenerator;
}