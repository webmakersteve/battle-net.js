/**
* @fileoverview Expose Warcraft endpoints
*/

var Achievements = require('./achievements');
var Auctions = require('./auctions');
var Challenge = require('./challenge');
var Character = require('./character');
var Data = require('./data');
var Guilds = require('./guilds');
var Items = require('./items');
var Pets = require('./pets');
var Pvp = require('./pvp');
var Quests = require('./quests');
var Realms = require('./realms');
var Recipes = require('./recipes');
var Spells = require('./spells');

function Warcraft(Client) {

  return {
    Achievements: new Achievements(Client),
    Auctions: new Auctions(Client),
    Challenge: new Challenge(Client),
    Data: new Data(Client)

  }

};

module.exports = Warcraft;
