import { MessageEmbed } from 'discord.js';

export default class {
	getToken() {
		if (this.useBeta() == 'true') {
			if (!process.env.tokenBeta) throw 'tokenBeta should be given in an enviromental variable';
			return process.env.tokenBeta;
		} else {
			if (!process.env.tokenRelease) throw 'tokenRelease should be given in an enviromental variable';
			return process.env.tokenRelease;
		}
	}
	useBeta() {
		if (process.env.useBeta == 'true' || process.env.useBeta == 'false')
			return process.env.useBeta as 'true' | 'false';
		else
			throw 'useBeta should only be string true or false';
	}
	getOwnerId() {
		if(!process.env.ownerId) throw 'ownerId should be given in an enviromental variable';
		return process.env.ownerId;
	}
	getDB() {
		if (!process.env.dbUrl) throw 'dbUrl should be given in an enviromental variable';
		return process.env.dbUrl;
	}
	getOsuKey() {
		if (!process.env.osuKey) throw 'osu! Api Key should be given in an enviromental variable';
		return process.env.osuKey;
	}
	getGoogle() {
		if (!process.env.googleCseID) throw 'googleCseID should be given in an enviromental variable';
		if (!process.env.googleAppApiKey) throw 'googleAppApiKey should be given in an enviromental variable';
		return {
			appApiKey: process.env.googleAppApiKey,
			cseID: process.env.googleCseID
		};
	}
}

interface RRSessions {
	[index: string]:
	RRSession;

}

interface RRSession {
	participants: string[];
	embed: MessageEmbed,
}

interface ImgsInts {
	[index: string]:
	{
		index: number,
		imgs: [{
			url: string;
		}],
		embed: MessageEmbed,
	}
}

export interface RAMData {
	rr: {
		sessions: RRSessions
	};
	cfg: {
		logcmd: boolean
	};
	images: {
		ints: ImgsInts
	};
}
export const ram: RAMData = {
	rr: {
		sessions: {} as RRSessions
	},
	cfg: {
		logcmd: true
	},
	images: {
		ints: {} as ImgsInts
	}
};
