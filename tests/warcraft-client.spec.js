'use strict';

var t = require('assert');
var request = require('request');
var WarcraftClient = require('../lib/warcraft-client');
var nock = require('nock');

describe('Warcraft client', function() {

  // Create a request default
  var baseUrl = 'http://us.api.battle.net';
  var defaultRequest;
  beforeEach(function() {
    defaultRequest = request.defaults({
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this._userAgent
      },
      baseUrl: 'http://us.api.battle.net',
      qs: {
        locale: 'en_US',
        apikey: 'mockkey'
      }
    });
  });

  it('should be a function', function() {
    t.equal(typeof WarcraftClient, 'function');
  });

  it('should be able to instantiate', function() {
    var client = new WarcraftClient(defaultRequest);
    t.equal(typeof client, 'object');
  });

  it('should throw an exception when instantiated without request handler', function() {
    t.throws(function() {
      var client = new WarcraftClient();
    });
  });

  it('should connect to the correct url', function(cb) {
    var client = new WarcraftClient(defaultRequest);

    nock('http://us.api.battle.net')
      .get('/maelstrom/chaosity?locale=en_US&apikey=mockkey&fields=guild')
      .reply(202, JSON.stringify({}));

    client.getCharacter('maelstrom', 'chaosity', ['guild'], function(err, response) {
      cb();
    });
  });

});
