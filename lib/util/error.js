var Errors = {};

Errors.createFromResponse = function (response) {
  //console.log(response);
  //we probably want to log this error
  var body = response.body || false;

  if (!body) {
    return new Error('Unknown error');
  }

  return new Error('Error ' + body.code + ': ' + body.type + ' (' + body.detail + ')');
}

module.exports = Errors;
