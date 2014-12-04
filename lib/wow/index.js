/**
* @fileoverview Expose Warcraft endpoints
*/

var Achievements = require('./achievements');
var Auctions = require('./auctions');

function Warcraft(Client) {

  return {
    Achievements: new Achievements(Client)
  }

};

Warcraft.prototype.Achievements = require('./achievements');
Warcraft.prototype.Auctions = require('./auctions');
Warcraft.prototype.Challenge = require('./challenge');
Warcraft.prototype.Character = require('./character');
Warcraft.prototype.Data = require('./data');
Warcraft.prototype.Guilds = require('./guilds');
Warcraft.prototype.Items = require('./items');
Warcraft.prototype.Pets = require('./pets');
Warcraft.prototype.Pvp = require('./pvp');
Warcraft.prototype.Quests = require('./quests');
Warcraft.prototype.Realms = require('./realms');
Warcraft.prototype.Recipes = require('./recipes');
Warcraft.prototype.Spells = require('./spells');

module.exports = Warcraft;
