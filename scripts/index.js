class Main {
   constructor(){
      this.json = require("../json/data.json");
      this.events = require('./events/events.js');
   }
   getJson() {
      return this.json;
   }
   getData() {
      var data = require('./data');
      return new data();
   }
   getEvents(){
      return this.events;
   }
}
exports.Main = Main;
