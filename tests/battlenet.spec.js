'use strict';

var t = require('assert');
var BNC = require('../lib/battlenet');

describe('Battle.net', function() {

  it('should be a function', function() {
    t.equal(typeof BNC, 'function');
  });

  it('should be able to instantiate', function() {
    var client = new BNC('token');
    t.equal(typeof client, 'object');
  });

  it('should throw an exception when instantiated without an API key', function() {
    t.throws(function() {
      var client = new BNC();
    });
  });

  it('should throw an exception when instantiated with an invalid region', function() {
    t.throws(function() {
      var client = new BNC('hey', {
        region: 'gepetto'
      });
    });
  });

  it('should succeed when initiated with a valid region', function() {
    var client = new BNC('hey', { region: 'us' });
    t.equal(typeof client, 'object');
  });

  it('should set US as the default region when one is not provided', function() {
    var client = new BNC('hey');
    t.equal(client._region, 'us');
  });

  it('should allow locale to be set when provided in the options', function() {
    var client = new BNC('hey', {
      locale: 'en_GB'
    });

    t.equal(client._locale, 'en_GB');
  });

});
