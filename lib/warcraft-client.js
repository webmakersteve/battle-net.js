'use strict';

module.exports = WarcraftClient;

var util = require('util');
var ApiClient = require('./api-client');

util.inherits(WarcraftClient, ApiClient);

function normalizeRealm(realmName) {
  return realmName.replace(' ', '-').toLowerCase();
}

function WarcraftClient(httpAdapter) {
  if (!(this instanceof WarcraftClient)) {
    return new WarcraftClient(httpAdapter);
  }

  ApiClient.call(this, httpAdapter);
}

WarcraftClient.prototype.getCharacter = function(realm, name, fields) {
  realm = normalizeRealm(realm);
  fields = this.parseFields(fields);

  this._request('get', [realm, name], null, function(err, response) {
    console.log(err);
    console.log(response);
  });
};
