'use strict';

var t = require('assert');
var request = require('request');
var WarcraftClient = require('../lib/warcraft-client');

describe('Warcraft client', function() {

  it('should be a function', function() {
    t.equal(typeof WarcraftClient, 'function');
  });

  it('should be able to instantiate', function() {
    var client = new WarcraftClient(request);
    t.equal(typeof client, 'object');
  });

  it('should throw an exception when instantiated without request handler', function() {
    t.throws(function() {
      var client = new WarcraftClient();
    });
  });

});
