/**
* @fileoverview Expose Blizzard client.
*/

var Client;
module.exports = Client = require('./lib/client')

var Blizzard = new Client(123);
var API = Blizzard.Games();

API.Warcraft.Auctions.getByRealm('Wyrmrest Accord').then(function(Auctions) {
  console.log(Auctions);
}).fail(function(err) {
  console.log(err);
});
