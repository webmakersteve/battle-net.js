var Errors = {};

Errors.createFromResponse = function (response) {
  //console.log(response);
  //we probably want to log this error
  var body = response.body;

  return new Error('Error ' + body.code + ': ' + body.type + ' (' + body.detail + ')');
}

module.exports = Errors;
