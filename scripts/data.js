//#region JSON
const main = new (require('./')).Main();
const json = main.getJson();
//#endregion

class Data {
    token() {
        json.token = (process.env.token) ? (process.env.token) : (json.token);
        return json.token;
    }
    prefix() {
        json.prefix = (process.env.prefix) ? (process.env.prefix) : (json.prefix);
        return json.prefix;
    }
    osuApiKey() {
        json.osuApiKey = (process.env.osuApiKey) ? (process.env.osuApiKey) : (json.osuApiKey);
        return json.osuApiKey;
    }
    fortnite() {
        json.fortnite = (process.env.fortnite) ? (process.env.fortnite) : (json.fortnite);
        return json.fortnite;
    }
    mysql() {
        json.mysql.host = (process.env.db_host) ? (process.env.db_host) : (json.mysql.host);
        json.mysql.port = (process.env.db_port) ? (process.env.db_port) : (json.mysql.port);
        json.mysql.database = (process.env.db_database) ? (process.env.db_database) : (json.mysql.database);
        json.mysql.user = (process.env.db_user) ? (process.env.db_user) : (json.mysql.user);
        json.mysql.password = (process.env.db_password) ? (process.env.db_password) : (json.mysql.password);
        return json.mysql;
    }
    google() {
        json.google.cseID = (process.env.db_cseID) ? (process.env.db_cseID) : (json.google.cseID);
        json.google.appApiKey = (process.env.db_appApiKey) ? (process.env.db_appApiKey) : (json.google.appApiKey);
        return json.google;
    }
    discordBots() {
        json.discordBots.token = (process.env.discordBots_token) ? (process.env.discordBots_token) : (json.discordBots.token);
        json.discordBots.enabled = (process.env.discordBots_enabled) ? (process.env.discordBots_enabled) : (json.discordBots.enabled);
        return json.discordBots;
    }
    owner() {
        json.owner.id = (process.env.owner_id) ? (process.env.owner_id) : (json.owner.id);
        json.owner.discriminator = (process.env.owner_discriminator) ? (process.env.owner_discriminator) : (json.owner.discriminator);
        json.owner.username = (process.env.owner_username) ? (process.env.owner_username) : (json.owner.username);
        json.owner.tag = (process.env.owner_tag) ? (process.env.owner_tag) : (json.owner.tag);
        return json.owner;
    }
    debug() {
        json.debug = (process.env.debug) ? (process.env.debug) : (json.debug);
        return json.debug;
    }
    wikisEnabled() {
        json.wikisEnabled = (process.env.wikisEnabled) ? (process.env.wikisEnabled) : (json.wikisEnabled);
        return json.wikisEnabled;
    }
    wikis() {
        json.wikis.home = (process.env.wikis_home) ? (process.env.wikis_home) : (json.wikis.home);
        json.wikis.commands = (process.env.wikis_commands) ? (process.env.wikis_commands) : (json.wikis.commands);
        json.wikis.replies = (process.env.wikis_replies) ? (process.env.wikis_replies) : (json.wikis.replies);
        json.wikis.faq = (process.env.wikis_faq) ? (process.env.wikis_faq) : (json.wikis.faq);
        json.wikis.modifiers = (process.env.wikis_modifiers) ? (process.env.wikis_modifiers) : (json.wikis.modifiers);
        return json.wikis;
    }
    commands() {
        json.commands.categories.Support = (process.env.commands_categories_Support) ? (process.env.commands_categories_Support) : (json.commands.categories.Support);
        json.commands.categories.Info = (process.env.commands_categories_Info) ? (process.env.commands_categories_Info) : (json.commands.categories.Info);
        json.commands.categories.Random = (process.env.commands_categories_Random) ? (process.env.commands_categories_Random) : (json.commands.categories.Random);
        json.commands.categories.Moderation = (process.env.commands_categories_Moderation) ? (process.env.commands_categories_Moderation) : (json.commands.categories.Moderation);
        json.commands.categories.NSFW = (process.env.commands_categories_NSFW) ? (process.env.commands_categories_NSFW) : (json.commands.categories.NSFW);
        json.commands.categories.Fun = (process.env.commands_categories_Fun) ? (process.env.commands_categories_Fun) : (json.commands.categories.Fun);
        json.commands.categories.Games = (process.env.commands_categories_Games) ? (process.env.commands_categories_Games) : (json.commands.categories.Games);
        json.commands.categories.Misc = (process.env.commands_categories_Misc) ? (process.env.commands_categories_Misc) : (json.commands.categories.Misc);
        json.commands.categories.Wiki = (process.env.commands_categories_Wiki) ? (process.env.commands_categories_Wiki) : (json.commands.categories.Wiki);
        json.commands.categories.BotOwner = (process.env.commands_categories_BotOwner) ? (process.env.commands_categories_BotOwner) : (json.commands.categories.BotOwner);
        json.commands.categories.Utility = (process.env.commands_categories_Utility) ? (process.env.commands_categories_Utility) : (json.commands.categories.Utility);
        return json.commands;
    }
    maintance() {
        json.maintance = (process.env.maintance) ? (process.env.maintance) : (json.maintance);
        return json.maintance;
    }
    replies() {
        json.replies.standard = (process.env.replies_standard) ? (process.env.replies_standard) : (json.replies.standard);
        json.replies.osu = (process.env.replies_osu) ? (process.env.replies_osu) : (json.replies.osu);
        return json.replies;
    }
}

exports.Data = Data;
