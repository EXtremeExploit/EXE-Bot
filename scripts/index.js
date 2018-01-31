//#region Main
class Main {
   constructor() {
      this.json = require('../json/data.json');
      this.events = require('./events/events.js');
      this.functions = require('./Functions/index.js');
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
      return new this.functions.Functions();
   }
}
//#endregion

exports.Main = Main;
