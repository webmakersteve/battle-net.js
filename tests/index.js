// Copyright 2014 Stephen Parente
/**
* @fileoverview Runs tests from all runners.
*/

'use strict';

// Module Dependencies.
var assert = require('assert')
var nock = require('nock')

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
      .fail(function(error) {
        assert.fail(error, "200", "Should have successfully connected to Google");
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

    assert.equal(promise._isPromise, true, 'Is not a promise');
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

  it('should create an error object', function (done) {

    var err = Blizzard.createError({});

    if (!(err instanceof Error)) {
      assert.fail(err, "Error", "is not an error");
    }

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
    }

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

    var deferred = Blizzard.Games.Warcraft.Achievements.getByID(212);

    assert.doesNotThrow(function () {
      deferred.then(function (response) {

        done();
      }).fail(function (error) {
        done(new Error("Did not recieve a valid response"));
      });
    });

  });

});
