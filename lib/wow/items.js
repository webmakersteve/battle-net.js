'use strict';

var Q = require('kew');

/**
* Wrapper Object. Wraps the client inside the Battle Pet API so it doesn't need to be bind and pollute `this`.
* @param {Client} Client
*/
function Items(Client) {
  this._client = Client;
}

/**
* Fetch ability information through the API
* @return {request|promise}
*/
Items.prototype.getItemByID = function (itemID) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, [itemID]));

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
Items.prototype.getSetByID = function (setID) {
  //we need to normalize the realm
  var util = this._client.Utilities;

  var defer = Q.defer();
  var request = this._client._get(urlWrapper(this._client, ['set', setID]));

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
  var newPath = ['wow', 'item'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

}

module.exports = Items;
