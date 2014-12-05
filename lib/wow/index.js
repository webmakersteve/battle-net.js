/**
* @fileoverview Expose Warcraft endpoints
*/

var Achievements = require('./achievements');
var Auctions = require('./auctions');
var Challenge = require('./challenge');
var Characters = require('./characters');
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
    Characters: new Characters(Client),
    Data: new Data(Client),
    Guilds: new Guilds(Client),
    Items: new Items(Client),
    Pets: new Pets(Client),
    Pvp: new Pvp(Client),
    Quests: new Quests(Client),
    Realms: new Realms(Client),
    Recipes: new Recipes(Client),
    Spells: new Spells(Client)
  }

};

module.exports = Warcraft;
