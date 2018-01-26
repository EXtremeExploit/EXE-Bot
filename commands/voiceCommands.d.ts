import { Message, VoiceConnection, StreamDispatcher } from "discord.js";

export declare type Servers = {
   queue: string[];
   dispatcher: StreamDispatcher;
}

export declare class voiceCommands {
   constructor(msg: Message, servers: Servers[]);

   play(connection: VoiceConnection, msg: Message);
}
