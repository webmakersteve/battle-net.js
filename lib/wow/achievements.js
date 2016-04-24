'use strict';

/**
* Wrapper Object. Wraps the client inside the achievement API so it doesn't need to be bind and pollute this.
* @param {Client} Client
*/
function Achievements (Client) {
  this._client = Client;
}

/**
* Fetch achievement information through the API
* @param {integer} path
* @return {request|promise}
*/
Achievements.prototype.getByID = function (achievementID) {
  var request = this._client._get(urlWrapper(this._client, [achievementID]));
  var util = this._client.Utilities;
  return request
    .then(function(body) {
      return util.response.createObject(body, this.createAchievement);
    })
    .catch(function(error) {
      return util.error.createFromResponse(error);
    });
};

/**
* Generates and formats api url specifically as they relate to the achievements API.
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
var urlWrapper = function (client, path, query) {
  var newPath = ['wow', 'achievement'];
  if (!path) path = [];
  if (!query) query = {};

  for (var x in path) {
    newPath.push(path[x]);
  }

  var path = newPath;

  return client.generateApiUrl(path, query);

};

module.exports = Achievements;
