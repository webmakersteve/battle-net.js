'use strict';

// Module Dependencies.
var request = require('request');
var url = require('url');
var Bluebird = require('bluebird');
var assert = require('assert');
var pjson = require('../package.json');
var util = require('util');
var Err = require('./util/error');

function createError(response) {
  return Err.create(response.body);
}

/**
* Ensure valid response.
* @param {Request} req
* @return {Request}
*/

function validateResponse(res) {
  var isJson = res.headers['content-type'].indexOf('application/json') > -1;

  if (res.body && isJson) {
    try {
      res.body = JSON.parse(res.body);
    } catch (e) {
      return e;
    }
  }

  if (res.statusCode >= 300) {
    return createError(res);
  }

  return res;
}

/**
* Creates an instance of Client which can be used to access
* the Battle.net API.
*
* @constructor
* @param {string} token
*/
function Client (token) {
  assert(token, 'API key required.');
  if (!(this instanceof Client)) {
    return new Client(token);
  }

  /**
  * HTTP content-type.
  * @type {string}
  */
  this.contentType = 'application/json';

  /**
  * API token used for HTTP Authentication.
  * @type {string}
  * @protected
  */
  this._token = token;

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
  this._region = 'us';

  /**
  * Locale. Defaults to English US
  * @type {string}
  * @protected
  */
  this._locale = 'en_US';

  /**
   * Most important object in here.
   * @object {object}
   * @protected?
   */

  this.Games = {
    //Starcraft: require('./starcraft'),
    //Diablo: require('./diablo'),
    //Heroes: require('./hots'),
    //Overwatch: require('./overwatch'),
    //Hearthstone: require('./hearthstone'),
    Warcraft: require('./wow')(this)
  };

  this.OAuth = require('./oauth')(this);

}


/**
* Api endpoint.
* @enum {string}
*/
Client.ApiEndPoint = 'api.battle.net';


Client.prototype.setLocale = function (locale) {
  this._locale = locale;
};

/**
* Api version
* @enum {string}
*/
Client.ApiVersion = 'v1';

/**
* GET request with authentication.
* @param {string} url
* @return {Promise}
* @protected
*/
Client.prototype._get = function (url) {
  return this._request('GET', url);
};


/**
* HEAD request with or without authentication.
* @param {string} url
* @return {Promise}
* @protected
*/
Client.prototype._head = function (url) {
  return this._request('HEAD', url);
};

/**
* Makes a request to the Blizzard api. The request will be set up with all
* the necessary headers (eg auth, content type, user agent, etc).
*
* @param {string} method The HTTP method for the request
* @param {string} url The full endpoint url (including query portion).
* @param {Object} data (optional) The body of the request (will be converted to json).
* @param {Object} header (optional) Any additional headers to go along with the request.
* @return {Promise}
* @protected
*/
Client.prototype._request = function (method, url, data, headers) {
  headers = headers || {};
  if (!headers['Content-Type']) headers['Content-Type'] = this.contentType;
  headers['User-Agent'] = this._userAgent;

  var self = this;

  return new Bluebird(function(resolve, reject) {
    request({
      method: method,
      url : url,
      //auth: {user: this._token}, ONLY FOR OAUTH
      headers: headers,
      body: JSON.stringify(data)
    }, function(err, content) {
      if (err) {
        return reject(err);
      }

      var result = validateResponse(content);

      if (util.isError(result)) {
        return reject(result);
      }
      return resolve(result);
    });
  });

};

/**
* Quote the provided string if not already quoted.
* @param {string} str
* @return {string}
* @protected
*/
Client.prototype._quote = function (str) {
  return str.charAt(0) == '"' ? str : '"' + str + '"';
};

/**
* Generates and formats api url.
* @param {Array.<string>} path
* @param {Object} query
* @return {string}
*/
Client.prototype.generateApiUrl = function (path, query) {
  var href = Client.ApiEndPoint;
  var pathname = '';

  if (!path) path = [];

  for (var i = 0; i < path.length; i++)
    pathname += '/' + encodeURIComponent(path[i]);

  // Remove undefined key-value pairs.
  if (!query) {
    var query = {};
  }

  query.locale = this._locale;
  query.apikey = this._token;

  // These can be overridden in query parameters

  Object.keys(query).forEach(function (key) {
    if (query[key] === undefined)
      delete query[key];
  });

  return url.format({
    protocol: 'https:',
    host: this._region + '.' + Client.ApiEndPoint,
    pathname: pathname,
    query: query
  });

};

Client.prototype.Utilities = require('./util/index.js');

// Module exports.
module.exports = Client;
