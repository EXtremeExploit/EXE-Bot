import { RichEmbed, GuildMember } from 'discord.js';
import { Beatmap, UserBest, User } from 'osu.js/dist/api';

export declare class Functions {
   constructor();
   clean(text: string): string;
   reverseString(string: string): string;
   userInfo(user: GuildMember): RichEmbed;
   fixDecimals(number: number): string;
   replacedWikis(string: string): string;
}
