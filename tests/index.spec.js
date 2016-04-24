// Copyright 2014 Stephen Parente
/**
* @fileoverview Runs tests from all runners.
*/

'use strict';

// Module Dependencies.
var assert = require('assert');
var nock = require('nock');

var Client = require('../index');
var validAPIKey = process.env.BLIZZ_KEY || require('../key');

describe('Client tests', function () {

  var Blizzard;

  beforeEach(function (done) {
    Blizzard = new Client(validAPIKey);
    done();
  });


  it('should make a successful request', function (done) {

    Blizzard._get('https://www.google.com')
      .then(function(data) {
        assert.equal(data.statusCode,200, "Status code should be 200");
        done();
      })
      .catch(function(error) {
        assert.catch(error, "200", "Should have successfully connected to Google");
        done();
      });

  });

  it('should generate the proper url', function (done) {

    var url = Blizzard.generateApiUrl(['this', 'that'], {hey: 'there'});

    assert.equal(url, 'https://us.api.battle.net/this/that?hey=there&locale=en_US&apikey=' + validAPIKey, "Should build a specific URL");
    done();

  });

  it('should return a promise', function (done) {

    var promise = Blizzard._get('https://www.google.com');

    assert.equal(typeof promise.then, 'function', 'Is not a promise');
    done();


  });

  it('should not alter input after being used', function (done) {

    var dummystring = 'heythere';

    var once = Blizzard._quote(dummystring);
    var twice = Blizzard._quote(once);

    assert.equal(once, twice, 'They do not match');

    done();

  });

  it('should add quotes to the string', function (done) {

    var dummystring = 'heythere';
    var once = Blizzard._quote(dummystring);

    assert.notEqual(dummystring, once, 'They do match');
    done();

  });

  it('should return a new object', function (done) {

    assert.notEqual(Blizzard.Games, null, "Games is null");
    done();

  });

});

describe('Utility tests', function () {

  var Blizzard;

  beforeEach(function (done) {
    Blizzard = new Client(validAPIKey);
    done();
  });

  it('should format the realm properly', function (done) {

    var realm = Blizzard.Utilities.formatting.normalizeRealm('Wyrmrest Accord');

    assert.equal(realm, 'wyrmrest-accord', "not formatted properly");
    done();

  });

  it('should create a valid error object', function (done) {

    var body = {
      code: 210,
      type: 'forbidden',
      detail: 'account not active'
    };

    var err = Blizzard.Utilities.error.createFromResponse({body: body});

    assert.ok(err, "Returned nothing");
    done();

  });

});

describe('Warcraft tests', function() {

  var Blizzard;

  beforeEach(function (done) {
    Blizzard = new Client(validAPIKey);
    done();
  });

  // Achievement description
  it('should fetch an achievement description', function (done) {

    this.timeout(6000);

    var deferred = Blizzard.Games.Warcraft.Achievements.getByID(212);

    assert.doesNotThrow(function () {
      deferred.then(function (response) {

        done();
      }).catch(function (error) {
        done(new Error("Did not recieve a valid response"));
      });
    });

  });

});

describe('Character tests', function () {

  var Blizzard;

  beforeEach(function (done) {

    this.timeout(6000);

    Blizzard = new Client(validAPIKey);
    done();
  });

  it('should find this character', function (done) {

    Blizzard.Games.Warcraft.Characters.get('Maelstrom', 'Chaosity')
      .then(function (data) {
        assert.ok(data, "Character data is empty");
        done();
      })
      .catch(function (err) {
        done(err);
      });

  });

  it('should not find this character', function (done) {

    this.timeout(3000);
    Blizzard.Games.Warcraft.Characters.get('Maelstrom', 'Chaositynoexists')
      .then(function (data) {
        done(new Error("Didn't find it"));
      })
      .catch(function (err) {
        done();
      });

  });

  it('should get the feed of this character', function (done) {

    this.timeout(3000);
    Blizzard.Games.Warcraft.Characters.get('Maelstrom', 'Chaosity', ['feed'])
      .then(function (data) {
        assert.ok(data.body.feed, "Should have feed field set");
        done();
      })
      .catch(function (err) {
        done(err);
      });

  });

});
