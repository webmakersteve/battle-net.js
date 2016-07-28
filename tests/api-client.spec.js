'use strict';

var t = require('assert');
var request = require('request');
var ApiClient = require('../lib/api-client');

describe('API client', function() {

  it('should be a function', function() {
    t.equal(typeof ApiClient, 'function');
  });

  it('should be able to instantiate', function() {
    var client = new ApiClient(request);
    t.equal(typeof client, 'object');
  });

  it('should throw an exception when instantiated without request handler', function() {
    t.throws(function() {
      var client = new ApiClient();
    });
  });

});
