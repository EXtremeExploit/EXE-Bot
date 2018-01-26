import { Commands, Owner, Wikis } from "../index";

export declare class Data {
   token(): string;
   prefix(): string;
   osuApiKey(): string;
   owner(): Owner
   allEvents(): boolean;
   debug(): boolean;
   wikisEnabled(): boolean;
   wikis(): Wikis;
   commands(): Commands
}
