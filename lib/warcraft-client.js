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

  this._request('get', [normalizeRealm(realm), name], this.parseFields(fields),
    cb);
};
