//#region Main
class Main {
	constructor() {
		this.fs = require('fs');
		this.json = require('../json/data.json');
		this.events = require('./events');
		this.functions = require('./functions');
		this.Prototypes = require('./prototypes');
		this.HelpGenerator = require('./helpGenerator');
		this.tools = require('./tools');
		this.models = require('./models');
	}
	getJson() {
		return this.json;
	}
	getData() {
		var data = require('./data');
		return new data.Data();
	}
	getEvents(Client) {
		return new this.events.Events(Client);
	}
	getFunctions() {
		return new this.functions();
	}
	getPrototypes() {
		return this.Prototypes;
	}
	getTools() {
		return this.tools;
	}
	helpGenerator() {
		return this.HelpGenerator;
	}
	getModels() {
		return this.models;
	}
	getMemory() {
		var content = this.fs.readFileSync('./json/memory.json', { encoding: 'utf-8' });
		return JSON.parse(content);
	}
	writeMemory(DataToWrite) {
		this.fs.writeFile('./json/memory.json', JSON.stringify(DataToWrite), (err) => {
			if (err) throw err;
		});
	}
}
//#endregion

exports.Main = Main;
