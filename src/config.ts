import json from '../json/config.json';
import fs from 'fs';

export default class {
	GetToken() {
		if (!process.env.token) new Error(`Token should be given in an enviromental variable`);
		return process.env.token;
	}
	GetPrefix() {
		return json.prefix;
	}
	GetOwner() {
		return json.owner;
	}
	GetWikis() {
		return json.wikis;
	}
	GetDB() {
		if (!process.env.db_url) new Error(`db_url should be given in an enviromental variable`);
		return process.env.db_url;
	}
	GetMemory(): Memory {
		let content = fs.readFileSync(`./json/memory.json`, { encoding: `utf-8` });
		return JSON.parse(content);
	}
	WriteMemory(Data: Memory){
		fs.writeFile(`./json/memory.json`, JSON.stringify(Data), (err) => {
			if (err) throw err;
		});
	}
	GetOsuKey(){
		if (!process.env.OsuKey) new Error(`osu! Api Key should be given in an enviromental variable`);
		return process.env.OsuKey;
	}
	GetGoogle(){
		if (!process.env.GoogleCseID) new Error(`GoogleCseID should be given in an enviromental variable`);
		if (!process.env.GoogleAppApiKey) new Error(`GoogleAppApiKey should be given in an enviromental variable`);
		return {
			appApiKey: process.env.GoogleAppApiKey,
			cseID: process.env.GoogleCseID
		}
	}
}

class Memory{
	rr: {
		channels: string[]
	}
}