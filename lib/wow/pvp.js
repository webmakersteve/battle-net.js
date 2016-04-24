'use strict';

var Bluebird = require('bluebird');

/**
* Wrapper Object. Wraps the client inside the PVP API so it doesn't need to be bind and pollute `this`.
* @param {Client} Client
*/
function Pvp (Client) {
  this._client = Client;
}

/**
* Fetch PVP information through the API
* @return {request|promise}
*/
Pvp.prototype.getByBracket = function (bracket) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, [bracket]));

  request
  .then(function(body) {
    defer.resolve(util.response.createObject(body));
  })
  .catch(function(error) {
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
  var newPath = ['wow', 'leaderboard'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

}

module.exports = Pvp;
