'use strict';

module.exports = ApiClient;

function ApiClient(httpAdapter) {
  if (!(this instanceof ApiClient)) {
    return new ApiClient(httpAdapter);
  }

  if (httpAdapter === undefined) {
    throw new TypeError('"httpAdapter" must be a request object');
  }

  this.http = httpAdapter;
}

ApiClient.prototype.parseFields = function(fields) {
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

  return fieldsParsed;
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
ApiClient.prototype._request = function (method, path, data, cb) {
  if (Array.isArray(path)) {
    path = path.join('/');
  }

  this.http({
    method: method,
    url : path,
    //auth: {user: this._token}, ONLY FOR OAUTH
    body: JSON.stringify(data)
  }, function(err, response, content) {
    if (err) {
      return cb(err);
    }

    // @todo response validation
    return cb(null, content);
  });

};

/**
* Quote the provided string if not already quoted.
* @param {string} str
* @return {string}
* @protected
*/
ApiClient.prototype._quote = function (str) {
  return str.charAt(0) == '"' ? str : '"' + str + '"';
};
