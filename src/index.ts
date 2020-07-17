console.log(`Starting...`);
import dotenv from 'dotenv';
dotenv.config({
	path: `./json/.env`
});

import discord from 'discord.js';
import commands from './commands.js';
import config from './config.js';
import events from './events.js';
import replies from './replies.js';
import * as mongoose from 'mongoose';
let db = new config().GetDB();

// Clear the Russian Roullette memory
let cMemory = new config().GetMemory();
cMemory.rr.channels = [];
new config().WriteMemory(cMemory);

let client: discord.Client = new discord.Client({
	http: {
		api: 'https://discord.com/api',
		cdn: 'https://cdn.discordapp.com'
	}
});

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
