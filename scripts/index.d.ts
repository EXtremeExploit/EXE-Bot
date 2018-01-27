import { Events } from "./events/events";
import { Client } from "discord.js";
import { Data } from "./data/index";

declare type Json = {
   token: string;
   prefix: string;
   osuApiKey: string;
   owner: Owner
   allEvents: boolean;
   debug: boolean;
   wikisEnabled: boolean;
   wikis: Wikis;
   commands: Commands;
   maintance: boolean;
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
}

declare type Commands = {
   categories: Categories
}

declare type Categories = {
   Voice: boolean;
   Support: boolean;
   Info: boolean;
   Random: boolean;
   Moderation: boolean;
   Fun: boolean;
   Osu: boolean;
   Misc: boolean;
   Wiki: boolean;
   BotOwner: boolean;
}

export declare class Main {
   json: Json;
   events: any;
   getJson(): Json;
   getData(): Data;
   getEvents(Client: Client): Events;
}
