'use strict';

var Bluebird = require('bluebird');

function OAuthUtil(Client) {

  this._client = Client;

};

OAuthUtil.prototype.createRedirectUrl = function (redirectTo, scope) {

  var url = this._client.generateApiUrl(['oauth', 'authorize'], {
    redirect_uri: redirectTo,
    client_id: this._client._token,
    scope: scope.join(","),
    //state: "asdasds",
    response_type: 'code',
    apikey: false
  });

  // We need to remove api. from the url

  return url.replace('api.', '');

};

module.exports = OAuthUtil;
