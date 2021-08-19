console.log('Starting...');
import dotenv from 'dotenv';
dotenv.config({
	path: './json/.env'
});

import discord, { Intents } from 'discord.js';
import commands from './commands.js';
import config from './config.js';
import events from './events.js';
import mongoose from 'mongoose';
const db = new config().getDB();

const client: discord.Client = new discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS
	]
});

(async () => {
	console.log('Logging to Database...');
	await mongoose.connect(db,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	console.log('DB Connected');

	const c = new commands(client);
	new events(client);

	console.log('Logging to Discord...');
	await client.login(new config().getToken()).catch((e) => console.error(e));
	c.register();
})();
