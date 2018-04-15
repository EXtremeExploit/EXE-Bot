import { Commands, Owner, Wikis, Replies, Servers, DiscordBots } from '../index';

export declare class Data {
   token(): string;
   prefix(): string;
   osuApiKey(): string;
   discordBots(): DiscordBots;
   owner(): Owner;
   allEvents(): boolean | string;
   debug(): boolean | string;
   wikisEnabled(): boolean | string;
   wikis(): Wikis;
   commands(): Commands;
   maintance(): boolean | string;
   replies(): Replies;
   servers(): Servers;
}
