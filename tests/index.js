// Copyright 2014 Stephen Parente
/**
* @fileoverview Runs tests from all runners.
*/

'use strict';

// Module Dependencies.
var assert = require('assert')
var nock = require('nock')

var Client = require('../index');


describe('Client tests', function () {


  beforeEach(function (done) {
    done();
  });


  it('should make a successful request', function (done) {

    var Blizzard = new Client(123);

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

    var Blizzard = new Client(123);
    var url = Blizzard.generateApiUrl(['this', 'that'], {hey: 'there'});

    assert.equal(url, 'https://us.api.battle.net/this/that?hey=there&locale=en_US&apikey=123', "Should build a specific URL");
    done();

  });

  it('should return a promise', function (done) {

    var Blizzard = new Client(123);
    var promise = Blizzard._get('https://www.google.com');

    assert.equal(promise._isPromise, true, 'Is not a promise');
    done();


  });

  it('should not alter input after being used', function (done) {

    var Blizzard = new Client(123);
    var dummystring = 'heythere';

    var once = Blizzard._quote(dummystring);
    var twice = Blizzard._quote(once);

    assert.equal(once, twice, 'They do not match');

    done();

  });

  it('should add quotes to the string', function (done) {

    var Blizzard = new Client(123);
    var dummystring = 'heythere';

    var once = Blizzard._quote(dummystring);

    assert.notEqual(dummystring, once, 'They do match');

    done();

  });


});
