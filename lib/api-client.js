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
* @param {string} path The full endpoint url (including query portion).
* @param {Object} data (optional) The body of the request (will be converted to json)
*                      or query parameters, depending on the specified request method.
* @param {Object} opt (optional) Additional options.
* @param {Object} opt.token (optional) The access token to use for the request.
* @param {Function} cb The node-style callback to pass the result to.
* @protected
*/
ApiClient.prototype._request = function (method, path, data, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt;
    opt = null;
  }
  if (Array.isArray(path)) {
    path = path.map(encodeURIComponent).join('/');
  }

  if (data === undefined || data === null) {
    data = {};
  }

  method = method.toUpperCase();

  var options = {
    method: method,
    url : path
  };
  if (opt && opt.token) {
    options.headers = {'Authorization': 'Bearer ' + opt.token};
  }

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
    if (contentType && contentType.indexOf(';')) {
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
            err = new Error(returnObj.reason);
            cb(err);
          } else {
           cb(new Error('Got a bad status code: ' + response.statusCode));
          }
        } else {
          if (returnObj.status && returnObj.status === 'nok') {
            // Bad stuff
            err = new Error(returnObj.reason);
            cb(err);
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
        return cb(new Error('Got a bad status code: ' + response.statusCode));
      } else {
        cb(new Error(contentType + ': content type not supported.'));
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
