/**
* @fileoverview Expose db client.
*/

var Client;
module.exports = Client = require('./lib/client')

var x = new Client(123);

console.log(x);
