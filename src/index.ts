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
import * as mongoose from 'mongoose';
let db = new config().GetDB();


fs.writeFile(`./json/memory.json`, `{"rr":{"channels":[]}}`, (err) => {
	if (err) console.log(err);
});

let client: discord.Client = new discord.Client();

(async () => {
	console.log('Logging to Database...');
	await ((mongoose as any).default as mongoose.Mongoose).connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log('DB Connected')

	new commands(client);
	new events(client);
	new replies(client);

	console.log('Logging to Discord...');
	client.login(new config().GetToken()).catch((e) => console.error(e));
})();
