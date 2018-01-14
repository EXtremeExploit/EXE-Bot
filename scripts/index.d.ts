declare type Json = {
   token: string;
   prefix: string;
   osuApiKey: string;
   owner: Owner
   allEvents: boolean;
   debug: boolean;
   wikisEnabled: boolean;
   wikis: Wikis;
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

declare type Data = {
   token(): string;
   prefix(): string;
   osuApiKey(): string;
   owner(): Owner
   allEvents(): boolean;
   debug(): boolean;
   wikisEnabled(): boolean;
   wikis(): Wikis;
}

export declare class Main {
   json: Json;
   events: any;
   getJson(): Json
   getData(): Data;
   getEvents(): any
}
