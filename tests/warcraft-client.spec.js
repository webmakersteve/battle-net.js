'use strict';

var t = require('assert');
var request = require('request');
var WarcraftClient = require('../lib/warcraft-client');
var nock = require('nock');

// Mock data
var mock = {
  achievements: require('./samples/wow/achievements.json'),
  auctionStatus: require('./samples/wow/auction-status.json'),
  boss: require('./samples/wow/boss.json'),
  bosses: require('./samples/wow/bosses.json'),
  challengeRealm: require('./samples/wow/challenge-realm.json'),
  challengeRegion: require('./samples/wow/challenge-region.json'),
  character: require('./samples/wow/character.json'),
  characterAchievements: require('./samples/wow/character-achievements.json'),
  characterAppearance: require('./samples/wow/character-appearance.json'),
  characterAudit: require('./samples/wow/character-audit.json'),
  characterFeed: require('./samples/wow/character-feed.json'),
  characterGuild: require('./samples/wow/character-guild.json'),
  characterHunterPets: require('./samples/wow/character-hunterPets.json'),
  characterItems: require('./samples/wow/character-items.json'),
  characterMounts: require('./samples/wow/character-mounts.json'),
  characterPets: require('./samples/wow/character-pets.json'),
  characterPetSlots: require('./samples/wow/character-petSlots.json'),
  characterProfessions: require('./samples/wow/character-professions.json'),
  characterProgression: require('./samples/wow/character-progression.json'),
  characterPvp: require('./samples/wow/character-pvp.json'),
  characterQuests: require('./samples/wow/character-quests.json'),
  characterReputation: require('./samples/wow/character-reputation.json'),
  characterStatistics: require('./samples/wow/character-statistics.json'),
  characterStats: require('./samples/wow/character-stats.json'),
  characterTalents: require('./samples/wow/character-talents.json'),
  characterTitles: require('./samples/wow/character-titles.json'),
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

  describe('getBoss()', function() {
    var client = new WarcraftClient(defaultRequest);

    it('should fail if the first parameter is not a number', function() {
      t.throws(function() {
        client.getBoss('hey', function() {});
      });
    });

    it('should fail if the second parameter is a non function', function() {
      t.throws(function() {
        client.getBoss(1, 'hey');
      });
    });

    it('should properly fetch json', function(cb) {
      scope
        .get('/wow/boss/1?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.boss));

      client.getBoss(1, function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should properly report errors on failure', function(cb) {
      scope
        .get('/wow/boss/1?locale=en_US&apikey=mockkey')
        .reply(400, JSON.stringify(mock.failure));

      client.getBoss(1, function(err, response) {
        t.ok(err);
        t.equal(response, undefined);
        cb();
      });
    });

  });

  describe('getRealmLeaderboard()', function() {
    var client = new WarcraftClient(defaultRequest);

    it('should fail if the second parameter is a non function', function() {
      t.throws(function() {
        client.getRealmLeaderboard('maelstrom', 'hey');
      });
    });

    it('should properly fetch json', function(cb) {
      scope
        .get('/wow/challenge/maelstrom?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.challengeRealm));

      client.getRealmLeaderboard('maelstrom', function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should use realm name as part of the path fetch json', function(cb) {
      var realm = 'tichondrius';

      scope
        .get('/wow/challenge/' + realm + '?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.challengeRealm));

      client.getRealmLeaderboard(realm, function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should properly report errors on failure', function(cb) {
      scope
        .get('/wow/boss/1?locale=en_US&apikey=mockkey')
        .reply(400, JSON.stringify(mock.failure));

      client.getRealmLeaderboard('maelstrom', function(err, response) {
        t.ok(err);
        t.equal(response, undefined);
        cb();
      });
    });

  });

  describe('getRegionLeaderboard()', function() {
    var client = new WarcraftClient(defaultRequest);

    it('should fail if the first parameter is a non function', function() {
      t.throws(function() {
        client.getRegionLeaderboard('hey');
      });
    });

    it('should properly fetch json', function(cb) {
      scope
        .get('/wow/challenge/region?locale=en_US&apikey=mockkey')
        .reply(200, JSON.stringify(mock.challengeRegion));

      client.getRegionLeaderboard(function(err, response) {
        t.ifError(err);
        cb();
      });
    });

    it('should properly report errors on failure', function(cb) {
      scope
        .get('/wow/challenge/region?locale=en_US&apikey=mockkey')
        .reply(400, JSON.stringify(mock.challengeRegion));

      client.getRegionLeaderboard(function(err, response) {
        t.ok(err);
        t.equal(response, undefined);
        cb();
      });
    });

  });

});
