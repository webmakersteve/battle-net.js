'use strict';

var Q = require('kew');

/**
* Wrapper Object. Wraps the client inside the Battle Pet API so it doesn't need to be bind and pollute `this`.
* @param {Client} Client
*/
function Pets(Client) {
  this._client = Client;
}

/**
* Fetch ability information through the API
* @return {request|promise}
*/
Pets.prototype.getAbilityByID = function (abilityID) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, ['ability', abilityID]));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body));
  })
  .fail(function(error) {
    defer.reject(util.error.createFromResponse(error));
  });

  return defer;
}

/**
* Fetch species information through the API
* @return {request|promise}
*/
Pets.prototype.getSpeciesByID = function (speciesID) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, ['species', speciesID]));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body));
  })
  .fail(function(error) {
    defer.reject(util.error.createFromResponse(error));
  });

  return defer;
}

/**
* Fetch stats information through the API
* @return {request|promise}
*/
Pets.prototype.getStatsBySpecies = function (speciesID) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, ['stats', speciesID]));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body));
  })
  .fail(function(error) {
    defer.reject(util.error.createFromResponse(error));
  });

  return defer;
}


/**
* Generates and formats api url specifically as they relate to the PVP API.
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
var urlWrapper = function (client, path, query) {
  var newPath = ['wow', 'battlepet'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

}

module.exports = Pets;
