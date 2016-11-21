'use strict';

module.exports = WarcraftClient;

var util = require('util');
var ApiClient = require('./api-client');

util.inherits(WarcraftClient, ApiClient);

function normalizeRealm(realmName) {
  return realmName.replace(' ', '-').toLowerCase();
}

/**
 * All possible character fields for documentation purposes
 * @type {Array}
 */
var characterFields = [
  'achievements',
  'appearance',
  'feed',
  'guild',
  'hunterPets',
  'items',
  'mounts',
  'pets',
  'petSlots',
  'professions',
  'progression',
  'pvp',
  'quests',
  'reputation',
  'statistics',
  'stats',
  'talents',
  'titles',
  'audit'
];

/**
 * All possible guild fields for documentation purposes
 * @type {Array}
 */
var guildFields = [
  'achievements',
  'challenge',
  'news'
];

function WarcraftClient(httpAdapter) {
  if (!(this instanceof WarcraftClient)) {
    return new WarcraftClient(httpAdapter);
  }

  ApiClient.call(this, httpAdapter);
}

/**
 * Get an achievement from the Battle.net API by ID.
 *
 * @param  {number}   id Achievement ID to request
 * @param  {Function} cb Callback to call with the data.
 */
WarcraftClient.prototype.getAchievement = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'achievement', id], null, cb);
};

/**
 * Get an achievement from the Battle.net API by ID.
 *
 * @param  {string}   realm Realm name to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getAuctionStatus = function(realm, cb) {
  if (typeof realm !== 'string') {
    throw new TypeError('"realm" must be a number');
  }

  if (cb === undefined) {
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'auction', 'data', realm], null, cb);
};

/**
 * Get the list of bosses from Battle.net
 *
 * @param  {Function} cb Callback to call with the data.
 */
WarcraftClient.prototype.getBosses = function(cb) {
  if (cb === undefined) {
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'boss'], null, cb);
};

/**
 * Get a boss from the Battle.net API by ID.
 *
 * @param  {number}   id Achievement ID to request
 * @param  {Function} cb Callback to call with the data.
 */
WarcraftClient.prototype.getBoss = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'boss', id], null, cb);
};

/**
 * Get challenge mode realm leaderboard from the Battle.net API by ID.
 *
 * @param  {string}   realm Achievement ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getRealmLeaderboard = function(realm, cb) {
  if (typeof realm !== 'string') {
    throw new TypeError('"realm" must be a number');
  }

  if (cb === undefined) {
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'challenge', realm], null, cb);
};

/**
 * Get challenge mode region leaderboard from the Battle.net API using the
 * currently configured region.
 *
 * @param  {Function} cb Callback to call with the data.
 */
WarcraftClient.prototype.getRegionLeaderboard = function(cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'challenge', 'region'], null, cb);
};

/**
 * Get a character from the Battle.net API.
 *
 * @param  {string}   realm  Realm to request. Will be normalized.
 * @param  {string}   name   Character name on the realm
 * @param  {array}    fields Array of fields to request.
 * @param  {Function} cb     Callback to call with the data.
 */
WarcraftClient.prototype.getCharacter = function(realm, name, fields, cb) {
  if (typeof realm !== 'string') {
    throw new TypeError('"realm" must be a string');
  } else if (typeof name !== 'string') {
    throw new TypeError('"name" must be a string');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    if (typeof fields === 'function') {
      cb = fields;
      fields = [];
    } else {
      cb = function() {};
    }
  }

  if (!Array.isArray(fields)) {
    throw new TypeError('"fields" must be an array');
  } else if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'character', normalizeRealm(realm), name],
    this.parseFields(fields), cb);
};

/**
 * Get a guild from the Battle.net API.
 *
 * @param  {string}   realm  Realm to request. Will be normalized.
 * @param  {string}   name   Guild name on the realm
 * @param  {array}    fields Array of fields to request.
 * @param  {Function} cb     Callback to call with the data.
 */
WarcraftClient.prototype.getGuild = function(realm, name, fields, cb) {
  if (typeof realm !== 'string') {
    throw new TypeError('"realm" must be a string');
  } else if (typeof name !== 'string') {
    throw new TypeError('"name" must be a string');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    if (typeof fields === 'function') {
      cb = fields;
      fields = [];
    } else {
      cb = function() {};
    }
  }

  if (!Array.isArray(fields)) {
    throw new TypeError('"fields" must be an array');
  } else if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'guild', normalizeRealm(realm), name],
    this.parseFields(fields), cb);
};

/**
 * Get an item from the Battle.net API by ID.
 *
 * @param  {number}   id    Item ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getItem = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'item', id], null, cb);
};

/**
 * Get an item set from the Battle.net API by ID.
 *
 * @param  {number}   id    Item set ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getItemSet = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'item', 'set', id], null, cb);
};

/**
 * Get an exhaustive list of mounts from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getMounts = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'mount'], null, cb);
};

/**
 * Get an exhaustive list of pets from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getPets = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'pet'], null, cb);
};

/**
 * Get a pet ability from the Battle.net API by ID.
 *
 * @param  {number}   id    Pet ability ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getPetAbility = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'pet', 'ability', id], null, cb);
};

/**
 * Get a pet species from the Battle.net API by ID.
 *
 * @param  {number}   id    Species ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getPetSpecies = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'pet', 'species', id], null, cb);
};

/**
 * Get pet stats by species from the Battle.net API by ID.
 *
 * @param  {number}   id    Species ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getPetStats = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'pet', 'stats', id], null, cb);
};

/**
 * Get PvP leaderboard by bracket from the Battle.net API.
 *
 * @param  {string}   bracket Bracket string
 * @param  {Function} cb      Callback to call with the data.
 */
WarcraftClient.prototype.getPvpLeaderboard = function(bracket, cb) {
  if (typeof bracket !== 'string') {
    throw new TypeError('"bracket" must be a string');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'leaderboard', bracket], null, cb);
};

/**
 * Get a quest from the Battle.net API by ID.
 *
 * @param  {number}   id    Quest ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getQuest = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'quest', id], null, cb);
};

/**
 * Get realm status from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getRealmStatus = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'realm', 'status'], null, cb);
};

/**
 * Get a recipe from the Battle.net API by ID.
 *
 * @param  {number}   id    Quest ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getRecipe = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'recipe', id], null, cb);
};

/**
 * Get a spell from the Battle.net API by ID.
 *
 * @param  {number}   id    Quest ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getSpell = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'spell', id], null, cb);
};

/**
 * Get an exhaustive list of zones from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getZones = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'zone'], null, cb);
};

/**
 * Get a zone from the Battle.net API by ID.
 *
 * @param  {number}   id    Quest ID to request
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getZone = function(id, cb) {
  if (typeof id !== 'number') {
    throw new TypeError('"id" must be a number');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'zone', id], null, cb);
};

/**
 * Get battlegroups data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getBattlegroups = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'battlegroups'], null, cb);
};

/**
 * Get character races data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getCharacterRaces = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'character', 'races'], null, cb);
};

/**
 * Get character classes data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getCharacterClasses = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'character', 'classes'], null, cb);
};

/**
 * Get character achievements data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getCharacterAchievements = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'character', 'achievements'], null, cb);
};

/**
 * Get guild rewards data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getGuildRewards = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'guild', 'rewards'], null, cb);
};

/**
 * Get guild perks data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getGuildPerks = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'guild', 'perks'], null, cb);
};

/**
 * Get guild achievements data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getGuildAchievements = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'guild', 'achievements'], null, cb);
};

/**
 * Get item classes data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getItemClasses = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'item', 'classes'], null, cb);
};

/**
 * Get talents data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getTalents = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'talents'], null, cb);
};

/**
 * Get pet types data resource from the Battle.net API.
 *
 * @param  {Function} cb    Callback to call with the data.
 */
WarcraftClient.prototype.getPetTypes = function(cb) {
  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  this._request('get', ['wow', 'data', 'pet', 'types'], null, cb);
};

WarcraftClient.prototype.getUserCharacters = function(token, cb) {
  if (typeof token !== 'string') {
    throw new TypeError('"token" must be a string');
  }

  if (cb === undefined) {
    // If we don't have a CB check if fields is a CB
    cb = function() {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('"cb" must be a function');
  }

  var opt = {token: token};
  this._request('get', ['wow', 'user', 'characters'], null, opt, cb);
};

