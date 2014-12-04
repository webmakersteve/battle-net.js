/**
* @fileoverview Expose Blizzard client.
*/

var Client;
module.exports = Client = require('./lib/client')

var Blizzard = new Client(123);
var API = Blizzard.Games();

API.Warcraft.Achievements.getByID(2121).then(function(Achievement) {
  console.log(Achievement);
});
