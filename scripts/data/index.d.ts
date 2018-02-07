import { Commands, Owner, Wikis, Replies, Servers } from "../index";

export declare class Data {
   token(): string;
   prefix(): string;
   osuApiKey(): string;
   owner(): Owner;
   allEvents(): boolean | string;
   debug(): boolean | string;
   wikisEnabled(): boolean | string;
   wikis(): Wikis;
   commands(): Commands;
   maintance(): boolean | string;
   replies(): Replies;
   servers(): Servers;
   disconnect(): boolean;
}
