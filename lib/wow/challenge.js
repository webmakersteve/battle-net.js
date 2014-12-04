'use strict';

var Q = require('kew');

/**
* Wrapper Object. Wraps the client inside the auction API so it doesn't need to be bind and pollute this.
* @param {Client} Client
*/
function Challenge (Client) {
  this._client = Client;
}

/**
* Fetch achievement information through the API
* @param {integer} path
* @return {request|promise}
*/
Challenge.prototype.getRealmLeaderboard = function (realm) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  realm = util.formatting.normalizeRealm(realm);

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, [realm]));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body, this.createList));
  })
  .fail(function(error) {
    defer.reject(util.error.createFromResponse(error));
  });

  return defer;
}

Challenge.prototype.createList = function (body) {
  return body;
}

Challenge.prototype.getRegionLeaderboard = function () {

  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, ['region']));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body, this.createList));
  })
  .fail(function(error) {
    defer.reject(util.error.createFromResponse(error));
  });

  return defer;

}

/**
* Generates and formats api url specifically as they relate to the achievements API.
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
var urlWrapper = function (client, path, query) {
  var newPath = ['wow', 'challenge'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

}

module.exports = Challenge;
