import { Commands, Owner, Wikis, Replies, DiscordBots, Google, MySQL } from '../index';

export declare class Data {
    token(): string;
    prefix(): string;
    osuApiKey(): string;
    fortnite(): string;
    mysql(): MySQL;
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
