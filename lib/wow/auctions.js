'use strict';

var Q = require('kew');

/**
* Wrapper Object. Wraps the client inside the auction API so it doesn't need to be bind and pollute this.
* @param {Client} Client
*/
function Auctions (Client) {
  this._client = Client;
}

/**
* Fetch achievement information through the API specifying realm
* @param {string} realm
* @return {request|promise}
*/
Auctions.prototype.getByRealm = function (realm) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  realm = util.formatting.normalizeRealm(realm);

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, [realm]));

  request
    .then(function(body) {
      defer.resolve(util.response.createObject(body, this.createAuctionList));
    })
    .fail(function(error) {
      defer.reject(util.error.createFromResponse(error));
    });

  return defer;
}

/**
* Generates and formats api url specifically as it relates to the achievements API.
* @param {Client} client
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
var urlWrapper = function (client, path, query) {
  var newPath = ['wow', 'auction', 'data'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

}

module.exports = Auctions;
