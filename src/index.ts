console.log(`Starting...`);
import dotenv from 'dotenv';
dotenv.config({
	path: `./json/.env`
});

import discord from 'discord.js';
import fs from 'fs';
import commands from './commands.js';
import config from './config.js';
import events from './events.js';
import replies from './replies.js';


fs.writeFile(`./json/memory.json`, `{"rr":{"channels":[]}}`, (err) => {
	if (err) console.log(err);
});

let client: discord.Client = new discord.Client();

new commands(client);
new events(client);
new replies(client);

client.login(new config().GetToken());
