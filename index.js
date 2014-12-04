/**
* @fileoverview Expose db client.
*/

var Client;
module.exports = Client = require('./lib/client')

var x = new Client(123);
x.setLocale('en_US');
var url = x.generateApiUrl(['wow', 'achievement', '2144']);
console.log(url);
