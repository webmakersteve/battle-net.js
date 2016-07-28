'use strict';

module.exports = BattleNetClient;

var pjson = require('../package.json');
var util = require('util');
var url = require('url');

var request = require('request');

var WarcraftClient = require('./warcraft-client');

function BattleNetClient(apiKey, options) {
  if (!(this instanceof BattleNetClient)) {
    return new BattleNetClient(apiKey);
  }

  if (!apiKey) {
    throw new TypeError('"apiKey" must be set. API keys are required.');
  } else if (typeof options !== 'object') {
    options = {
      region: 'us',
      locale: 'en_US',
      useSSL: true
    };
  }

  /**
  * API key used for HTTP Authentication.
  * @type {string}
  * @protected
  */
  this._apiKey = apiKey;

  /**
  * Identifies the battlenet.js client as the UserAgent to the Battle.net API Service.
  * @type {string}
  * @protected
  */
  this._userAgent = 'battlenet.js/' + pjson.version + ' (node.js client)';

  /**
  * Identifies the region we are trying to connect to
  * @type {string}
  * @protected
  */
  this._region = options.region || 'us';

  if (!BattleNetClient.apiEndpoints.hasOwnProperty(this._region)) {
    throw new TypeError('"options.region" must be one of the following: ' +
      Object.keys(BattleNetClient.apiEndpoints).join(', '));
  }

  /**
  * Locale. Defaults to English US
  * @type {string}
  * @protected
  */
  this._locale = options.locale || 'en_US';

  /**
   *
   */
  this._useSSL = options.useSSL === undefined ? true : options.useSSL;

  this._request = this._createHttpAdapter();

  this.warcraft = new WarcraftClient(this._request);
}

/**
* Api version
* @enum {string}
*/
BattleNetClient.apiVersion = 'v1';

/**
* Api endpoints.
* @enum {string}
*/
BattleNetClient.apiEndpoints = {
  us: 'us.api.battle.net',
  eu: 'eu.api.battle.net',
  kr: 'kr.api.battle.net',
  tw: 'tw.api.battle.net',
  cn: 'api.battlenet.com.cn',
  sea: 'sea.api.battle.net',
};

BattleNetClient.prototype._createHttpAdapter = function() {
  // Create the adapter

  var hostname = BattleNetClient.apiEndpoints[this._region];

  var baseUrl = url.format({
    protocol: this._useSSL ? 'https:' : 'http:',
    hostname: hostname,
    path: '/'
  });

  return request.defaults({
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': this._userAgent
    },
    baseUrl: baseUrl,
    qs: {
      locale: this._locale,
      apikey: this._apiKey
    }
  });
};
