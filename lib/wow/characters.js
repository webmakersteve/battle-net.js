'use strict';

/**
* Wrapper Object. Wraps the client inside the character API so it doesn't need to be bind and pollute this.
* @param {Client} Client
*/
function Characters(Client) {
  this._client = Client;
}

/**
* Fetch achievement information through the API
* @param {integer} path
* @return {request|promise}
*/
Characters.prototype.get = function (realm, name, fields) {

  var util = this._client.Utilities;
  realm = util.formatting.normalizeRealm(realm);
  fields = fields || {};

  var fieldsParsed;

  if (fields) {
    if (fields.length > 0) {
      fieldsParsed = {
        fields: fields.join(',')
      };
    } else {
      fieldsParsed = {
        fields: fields
      };
    }

  } else {
    fieldsParsed = {};
  }

  var url = urlWrapper(this._client, [realm, name], fieldsParsed);
  var request = this._client._get(url);

  return request
    .then(function(body) {
      //check status code to make sure the character exists
      return util.response.createObject(body, this.createAchievement);
    });

};

/**
* Generates and formats api url specifically as they relate to the achievements API.
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
var urlWrapper = function (client, path, query) {
  var newPath = ['wow', 'character'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

};

module.exports = Characters;
