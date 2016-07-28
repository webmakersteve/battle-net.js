'use strict';

var BlizzardAPI = require("../lib/battlenet.js");
var client = new BlizzardAPI('test');
var fs = require('fs');

client.warcraft.getRealmLeaderboard('maelstrom', function(err, response) {
  fs.writeFileSync('tests/samples/wow/challenge-realm.json', JSON.stringify(response));
});
