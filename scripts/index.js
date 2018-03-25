//#region Main
class Main {
    constructor() {
        this.json = require('../json/data.json');
        this.events = require('./events/events.js');
        this.functions = require('./Functions/index.js');
        this.Prototypes = require('./prototypes/prototypes');
        this.HelpGenerator = require('./helpGenerator');
        this.tools = require('./prototypes/tools');
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
}
//#endregion

exports.Main = Main;
