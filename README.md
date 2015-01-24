battle-net.js [![Build Status](https://travis-ci.org/webmakersteve/battle-net.js.svg?branch=master)](https://travis-ci.org/webmakersteve/battle-net.js)
=============

This package allows you to integrate Blizzard's Battle.net API's into your website. It is pretty easy to use, and still a work in progress.

Feel free to help by tracking issues or forking the repository.

Install with:

    npm install --save battlenet.js

Once you install it you can require it on any of your pages.

    var BlizzardClient = require('battlenet.js');


## Usage

Samples coming soon! If the samples directory is in the project, it means they're here already and I'm bad at updating my readme.

```js
    var BlizzardAPI = require("battlenet.js"),
    var BlizzardClient = new Client('validAPIKey');
```

You must put your API key in when you instantiate the client. Otherwise, it's going to throw an exception. Don't say I didn't warn you.

From there, there are abstracted methods to allow you to access Battle.net data without having to deal with knowing the API endpoints and so on.

I'll list them below

## Performance

The API does not implement any type of caching. I may introduce a cached implementation of the API later down the line, but it works as designed - it makes a request for every method you call.

## Promises

The API uses kew to expose a promise-based API on the Client. If you are unfamiliar with promises, you should get familiar with them. They are great tools. Here is an example from the testing suite. Yes... Chaosity is my character.

```js
    Blizzard.Games.Warcraft.Characters.get('Maelstrom', 'Chaosity')
      .then(function (data) {
        // Thanks for the data
      })
      .fail(function (err) {
        // Something went wrong
      });
```

After calling the API method, you retrieve the data asynchronously through a promise callback. Just make sure your code is within the `then` block and you'll have access to the data fetched from the API.

# API

## Warcraft

Here's the part everyone came to see. Just how do we get that data from the API? The API is organized by game. Currently, only World of Warcraft is supported. `client` will refer to an instantiated object of the BattleNetAPI Class.

### client.Games.Warcraft.Achievements.getById(id)

Fetches achievement data for a given achievement ID.

### client.Games.Warcraft.Auctions.getByRealm(realm)

Fetches the auctions for a given realm

### client.Games.Warcraft.Challenge.getRealmLeaderboard(realm)

Returns realm leaderboards for a given realm.

### client.Games.Warcraft.Characters.get(realm, name, fields)

Returns a character specified. The fields object is an array of data keys for the data you are requesting. If you want to get responses faster, only request the data you're going to use.

For example:

```js
  var fields = ['feed', 'guild'];
  client.Characters.get('Maelstrom', 'Chaosity', fields);
```

### client.Games.Warcraft.Data.getBattlegroups()

Get a list of the battlegroups.

### client.Games.Warcraft.Data.getRaces()

Gets a list of races and their corresponding IDs.

### client.Games.Warcraft.Data.getClasses()

Gets a list of classes and their corresponding IDs.

### client.Games.Warcraft.Data.getAchievements()

Gets a list of achievements and their IDs.

### client.Games.Warcraft.Data.getGuildRewards()

Gets a list of guild rewards.

### client.Games.Warcraft.Data.getGuildPerks()

Gets a list of guild parks (*RIP* Have Group, Will Travel)

### client.Games.Warcraft.Data.getGuildAchievements()

Gets a list of guild achievements.

### client.Games.Warcraft.Data.getItemClasses()

### client.Games.Warcraft.Data.getTalents()

Gets a list of talents

### client.Data.getPetTypes()

For Pokémon masters. Gets a list of the pet types.

### client.Guild.get(realm, name, fields)

Get a guild on a given realm with a given name. Names will be normalized, so feel free to use spaces and all of that. Fields works the same way on guild as it does on character. Request the data you want by putting it in array (e.g. `['feed']`).

### client.Games.Warcraft.Item.getItemByID(ID)

Gets an item by its ID.

### client.Games.Warcraft.Item.getSetByID(ID)

Gets a set of items by its set ID. Judgment anyone?

### client.Games.Warcraft.Pets.getAbilityByID(ID)

Gets a pet ability by its ID

### client.Games.Warcraft.Pets.getSpeciesByID(ID)

Gets a pet species by its ID

### client.Games.Warcraft.Pets.getStatsBySpecies(speciesID)

Gets pet stats based on their species ID

### client.Games.Warcraft.Pvp.getByBracket(bracket)

Gets leaderboards by bracket. E.g. `client.Pvp.getByBracket('3v3');`

### client.Games.Warcraft.Quests.getByID(ID)

Gets quest information by ID

### client.Games.Warcraft.Realms.getStatusList()

Gets a list of realms and their realm status.

### client.Games.Warcraft.Recipes.getByID(ID)

Gets a recipe by its ID

### client.Games.Warcraft.Spells.getByID(ID)

Gets a spell by its ID

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
