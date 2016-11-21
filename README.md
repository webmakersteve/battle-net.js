battle-net.js [![Build Status](https://travis-ci.org/webmakersteve/battle-net.js.svg?branch=master)](https://travis-ci.org/webmakersteve/battle-net.js)
=============

This package allows you to integrate Blizzard's Battle.net API's into your website. It is pretty easy to use, and still a work in progress.

Feel free to help by tracking issues or forking the repository.

Install with:

    npm install --save battlenet.js

Once you install it you can require it on any of your pages.

    var BlizzardClient = require('battlenet.js');

## Notice

I have redone the API wrapper from the old version, which reminded me of Java. The new version is a bit easier to use, but there have been loads of breaking changes. Stay on 1.0 if you don't want them.

## Tests

This package contains unit tests. I haven't written all of them, but the core should be stable enough in v2. A lot of the unit testing is boilerplate stuff to simulate real responses, so I have some level of confidence in it, though I haven't tested all of the endpoints myself.

Run `grunt test` to run the tests. There are no prerequesites as long as you have installed `devDependencies`.

## Usage

```js
    var BnetClient = require("battlenet.js"),
    var client = new BnetClient('validAPIKey', {
      region: 'us',
      locale: 'en_US'
    });
```

You must put your API key in when you instantiate the client. Otherwise, it's going to throw an exception. Don't say I didn't warn you.

From there, there are abstracted methods to allow you to access Battle.net data without having to deal with knowing the API endpoints and so on.

The client defaults to the US region in the `en_US` locale. If you need something else just pass configuration changes.

## Promises

__The API no longer uses promises. If you want a promise based API, use a library with lift support__

# API

## Warcraft

```js
    var BnetClient = require("battlenet.js"),
    var client = new BnetClient('validAPIKey', {
      region: 'us',
      locale: 'en_US'
    });

    // var warcraft = client.warcraft;
```

Here's the part everyone came to see. Just how do we get that data from the API? The API is organized by game. Currently, only World of Warcraft is supported. `client` will refer to an instantiated object of the main API class.

### client.warcraft.getAchievement(id, cb)

Fetches achievement data for a given achievement ID.

### client.warcraft.getAuctionStatus(realm, cb)

Fetches the auctions for a given realm

### client.warcraft.getBoss(id, cb)

Gets a boss by ID

### client.warcraft.getBosses(cb)

Gets a list of bosses

### client.warcraft.getRealmLeaderboard(realm, cb)

Returns challenge mode leaderboards for a given realm.

### client.warcraft.getRegionLeaderboard(cb)

Gets challenge mode leaderboards for the currently configured region.

### client.warcraft.getCharacter(realm, name, fields, cb)

Returns a character specified. The fields object is an array of data keys for the data you are requesting. If you want to get responses faster, only request the data you're going to use.

For example:

```js
  var fields = ['feed', 'guild'];
  client.warcraft.getCharacter('Maelstrom', 'Chaosity', fields, function(err, response) {
    if (err) {
      throw err;
    }
  });
```

Here's a list of all the available fields

```js
/**
 * All possible character fields for documentation purposes
 * @type {Array}
 */
var characterFields = [
  'achievements',
  'appearance',
  'feed',
  'guild',
  'hunterPets',
  'items',
  'mounts',
  'pets',
  'petSlots',
  'professions',
  'progression',
  'pvp',
  'quests',
  'reputation',
  'statistics',
  'stats',
  'talents',
  'titles',
  'audit'
];
```

### client.warcraft.getGuild(realm, name, fields, cb)

Get a guild on a given realm with a given name. Names will be normalized, so feel free to use spaces and all of that. Fields works the same way on guild as it does on character. Request the data you want by putting it in array (e.g. `['feed']`).

```js
/**
 * All possible guild fields for documentation purposes
 * @type {Array}
 */
var guildFields = [
  'achievements',
  'challenge',
  'news'
];
```

### client.warcraft.getItem(id, cb)

Gets an item by its ID.

### client.warcraft.getItemSet(id, cb)

Gets a set of items by its set ID. Judgment anyone?

### client.warcraft.getMounts(cb)

Gets a list of existing mounts.

### client.warcraft.getPets(cb)

Gets a list of existing pets

### client.warcraft.getPetAbility(id, cb)

Gets a pet ability by its ID

### client.warcraft.getPetSpecies(id, cb)

Gets a pet species by its ID

### client.warcraft.getPetStats(speciesID, cb)

Gets pet stats based on their species ID

### client.warcraft.getPvpLeaderboard(bracket, cb)

Gets leaderboards by bracket. E.g.

```js
client.warcraft.getPvpLeaderboard('3v3', function(err, response) {

});
```

### client.warcraft.getQuest(id, cb)

Gets quest information by ID

### client.warcraft.getRealmStatus(cb)

Gets a list of realms and their realm status.

### client.warcraft.getRecipe(id, cb)

Gets a recipe by its ID

### client.warcraft.getSpell(id, cb)

Gets a spell by its ID

### client.warcraft.getZones(cb)

Gets a list of zones.

### client.warcraft.getZone(id, cb)

Gets a zone by its ID

### client.warcraft.getBattlegroups(cb)

Gets a list of battlegroups.

### client.warcraft.getCharacterRaces(cb)

Gets a list of character races.

### client.warcraft.getCharacterClasses(cb)

Gets a list of character classes.

### client.warcraft.getCharacterAchievements(cb)

Gets a list of character achievements.

### client.warcraft.getGuildRewards(cb)

Gets a list of guild rewards.

### client.warcraft.getGuildPerks(cb)

Gets a list of guild perks.

### client.warcraft.getGuildAchievements(cb)

Gets a list of guild achievements.

### client.warcraft.getItemClasses(cb)

Gets a list of item classes.

### client.warcraft.getTalents(cb)

Gets a list of talents.

### client.warcraft.getPetTypes(cb)

Gets a list of pet types.

### client.warcraft.getUserCharacters(token, cb)

Gets a list of all characters of the user associated with the specified access token.

# Other Stuff

If you like my code, star it! If you use it, tell me about it! I'd love to hear how you can make use of this code in your application.


## How to Contribute
- open a pull request and then wait for feedback (if
  [webmakersteve](http://github.com/webmakersteve) doesn't get back to you, Reav is right and he is a baddy.

## Contributors
No one yet, but always welcoming people to help!


## LICENSE - "MIT License"

Copyright (c) 2010 Matthew Ranney, http://ranney.com/

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

![spacer](http://ranney.com/1px.gif)
