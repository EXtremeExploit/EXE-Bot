import { RichEmbed, GuildMember } from "discord.js";

export declare class Functions {
   constructor();
   clean(text: string): string;
   reverseString(string: string): string;
   userInfo(user: GuildMember): RichEmbed;
}
