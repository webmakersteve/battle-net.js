'use strict';

var t = require('assert');
var request = require('request');
var WarcraftClient = require('../lib/warcraft-client');
var nock = require('nock');

// Mock data
var mock = {
  withGuild: require('./samples/chaosity-with-guild.json'),
  failure: require('./samples/failure.json')
};

describe('Warcraft client', function() {

  // Create a request default
  var baseUrl = 'http://us.api.battle.net';
  var defaultRequest;

  var scope;

  before(function() {
    scope = nock('http://us.api.battle.net')
      .defaultReplyHeaders({
        'X-Powered-By': 'Rails',
        'Content-Type': 'application/json;charset=utf-8',
        'Server': 'Apache'
      });
  });

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

    scope
      .get('/wow/character/maelstrom/chaosity?locale=en_US&apikey=mockkey&fields=guild')
      .reply(202, JSON.stringify(mock.withGuild));

    client.getCharacter('maelstrom', 'chaosity', ['guild'], function(err, response) {
      t.ifError(err);
      t.deepEqual(response, mock.withGuild);
      cb();
    });
  });

  it('should fail when we get a 404', function(cb) {
    var client = new WarcraftClient(defaultRequest);

    scope
      .get('/wow/character/maelstrom/chaosity?locale=en_US&apikey=mockkey&fields=guild')
      .reply(404, JSON.stringify(mock.failure));

    client.getCharacter('maelstrom', 'chaosity', ['guild'], function(err, response) {
      t.ok(err);
      t.equal(err.message, mock.failure.reason);
      t.equal(response, undefined);
      cb();
    });
  });

});
