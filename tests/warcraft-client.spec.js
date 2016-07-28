'use strict';

var t = require('assert');
var request = require('request');
var WarcraftClient = require('../lib/warcraft-client');
var nock = require('nock');

// Mock data
var mock = {
  achievements: require('./samples/wow/achievements.json'),
  bosses: require('./samples/wow/bosses.json'),
  character: require('./samples/wow/character.json'),
  failure: require('./samples/wow/failure.json')
};

describe('Warcraft client', function() {

  // Create a request default
  var baseUrl = 'http://us.api.battle.net';
  var defaultRequest = request.defaults({
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

  var scope;

  before(function() {
    scope = nock('http://us.api.battle.net')
      .defaultReplyHeaders({
        'X-Powered-By': 'Rails',
        'Content-Type': 'application/json;charset=utf-8',
        'Server': 'Apache'
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
      .get('/wow/character/maelstrom/chaosity?locale=en_US&apikey=mockkey')
      .reply(202, JSON.stringify(mock.character));

    client.getCharacter('maelstrom', 'chaosity', function(err, response) {
      t.ifError(err);
      t.deepEqual(response, mock.character);
      cb();
    });
  });

  it('should fail when we get a 404', function(cb) {
    var client = new WarcraftClient(defaultRequest);

    scope
      .get('/wow/character/maelstrom/chaosity?locale=en_US&apikey=mockkey')
      .reply(404, JSON.stringify(mock.failure));

    client.getCharacter('maelstrom', 'chaosity', function(err, response) {
      t.ok(err);
      t.equal(err.message, mock.failure.reason);
      t.equal(response, undefined);
      cb();
    });
  });

  describe('getAchievement()', function() {
    var client = new WarcraftClient(defaultRequest);

    it('should throw if a non-string is given as the first parameter', function() {
      t.throws(function() {
        client.getAchievement('rick-roll');
      });
    });

    it('should fail if the second parameter is a non function', function() {
      t.throws(function() {
        client.getAchievement(2144, 'hey');
      });
    });

    it('should properly fetch json', function(cb) {
      scope
        .get('/wow/achievement/2144?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.achievements));

      client.getAchievement(2144, function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should properly report errors on failure', function(cb) {
      scope
        .get('/wow/achievement/2144?locale=en_US&apikey=mockkey')
        .reply(400, JSON.stringify(mock.failure));

      client.getAchievement(2144, function(err, response) {
        t.ok(err);
        t.equal(response, undefined);
        cb();
      });
    });

  });

  // Next
  describe('getBosses()', function() {
    var client = new WarcraftClient(defaultRequest);

    it('should fail if the first parameter is a non function', function() {
      t.throws(function() {
        client.getBosses('hey');
      });
    });

    it('should properly fetch json', function(cb) {
      scope
        .get('/wow/boss?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.bosses));

      client.getBosses(function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should properly report errors on failure', function(cb) {
      scope
        .get('/wow/boss?locale=en_US&apikey=mockkey')
        .reply(400, JSON.stringify(mock.failure));

      client.getBosses(function(err, response) {
        t.ok(err);
        t.equal(response, undefined);
        cb();
      });
    });

  });

});
