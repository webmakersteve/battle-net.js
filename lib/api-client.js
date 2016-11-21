'use strict';

module.exports = ApiClient;

function buildError(reason, response) {
  var err = new Error(reason);
  err.statusCode = response.statusCode;
  return err;
}

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

  if (data === undefined || data === null) {
    data = {};
  }

  method = method.toUpperCase();

  var options = {
    method: method,
    url : path,
    //auth: {user: this._token}, ONLY FOR OAUTH
  };

  if (method === 'POST' || method === 'PUT') {
    options.body = data;
  } else {
    options.qs = data;
  }

  this.http(options, function(err, response, content) {
    if (err) {
      return cb(err);
    }

    var contentType = response.headers['content-type'];

    // We only care about the stuff before the semicolon, if there is one
    if (contentType.indexOf(';')) {
      contentType = contentType.substring(0, contentType.indexOf(';'));
    }

    if (contentType === 'application/json') {
      // Parse it
      try {
        var returnObj = JSON.parse(content);
        // Check status code first
        if (response.statusCode >= 300) {
          // Error on our side
          if (returnObj.reason) {
            // Bad stuff
            cb(buildError(returnObj.reason, response));
          } else {
            cb(buildError('Got a bad status code: ' + response.statusCode, response));
          }
        } else {
          if (returnObj.status && returnObj.status === 'nok') {
            // Bad stuff
            cb(buildError(returnObj.reason, response));
          } else {
            cb(null, returnObj);
          }
        }
      } catch (e) {
        cb(e);
      }
    } else {
      // Check status code first
      if (response.statusCode >= 300) {
        // Error on our side
        cb(buildError('Got a bad status code: ' + response.statusCode, response));
      } else {
        cb(buildError(contentType + ': content type not supported.', response));
      }
    }

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
