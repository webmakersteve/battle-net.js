// Module Dependencies.
var request = require('request');
var url = require('url');
var Q = require('kew');
var assert = require('assert');
var pjson = require('../package.json');

/**
* Creates an instance of Client which can be used to access
* the Battle.net API.
*
* @constructor
* @param {string} token
*/
function Client (token) {
  assert(token, 'API key required.')
  if (!(this instanceof Client)) {
    return new Client(token)
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
  * @enum {string}
  * @protected
  */
  this._locale = 'en_US';

}


/**
* Api endpoint.
* @enum {string}
*/
Client.ApiEndPoint = 'api.battle.net';


Client.prototype.setLocale = function (locale) {
  this._locale = locale;
}

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
  return this._request('GET', url)
}


/**
* POST request with authentication.
* @param {string} url
* @param {Object} data
* @param {Object} header
* @return {Promise}
* @protected
*/
Client.prototype._post = function (url, data, header) {
  return this._request('POST', url, data, header)
}


/**
* PUT request with authentication.
* @param {string} url
* @param {Object} data
* @param {Object} header
* @return {Promise}
* @protected
*/
Client.prototype._put = function (url, data, header) {
  return this._request('PUT', url, data, header)
}


/**
* DELETE request with authentication.
* @param {string} url
* @return {Promise}
* @protected
*/
Client.prototype._del = function (url, header) {
  return this._request('DELETE', url, undefined, header)
}


/**
* HEAD request with authentication.
* @param {string} url
* @return {Promise}
* @protected
*/
Client.prototype._head = function (url) {
  return this._request('HEAD', url)
}

/**
* Makes a request to the Orchestrate api.  The request will be set up with all
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
  var defer = Q.defer();
  headers = headers || {}
  if (!headers['Content-Type']) headers['Content-Type'] = this.contentType;
  headers['User-Agent'] = this._userAgent

  request({
    method: method,
    url : url,
    auth: {user: this._token},
    headers: headers,
    body: JSON.stringify(data)
  }, defer.makeNodeResolver())

  return defer.promise
  .then(this._validateResponse.bind(this))
  .then(this._parseLinks.bind(this))
}


/**
* Quote the provided string if not already quoted.
* @param {string} str
* @return {string}
* @protected
*/
Client.prototype._quote = function (str) {
  return str.charAt(0) == '"' ? str : '"' + str + '"';
}


/**
* Ensure valid response.
* @param {Request} req
* @return {(Request|Promise)}
*/
Client.prototype._validateResponse = function (res) {
  if (res.body) {
    try {
      res.body = JSON.parse(res.body);
    } catch (e) {}
  }

  if (!~[200, 201, 204].indexOf(res.statusCode)) {
    throw res
  }

  return res
}

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
    if (query[key] == undefined)
      delete query[key]
  });

  return url.format({
    protocol: 'https:',
    host: this._region + '.' + Client.ApiEndPoint,
    pathname: pathname,
    query: query
  });

}


Client.Utilities = require('./util/index.js');

Client.Games = {
  //Starcraft: require('./starcraft'),
  //Diablo: require('./diablo'),
  //Heroes: require('./hots'),
  //Overwatch: require('./overwatch'),
  //Hearthstone: require('./hearthstone'),
  Warcraft: require('./wow')
}

// Module exports.
module.exports = Client
