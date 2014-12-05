var Errors = {};

Errors.createFromResponse = function (response) {
  //console.log(response);
  //we probably want to log this error
  var body = response.body || false;

  if (!body) {
    return new Error('Unknown error');
  }

  if (body.status) {
    if (body.status == 'nok') {
      return new Error(body.reason);
    }
  }

  var err = new Error(body.detail);
  err.code = body.code;
  err.type = body.type;

  return err;
}

module.exports = Errors;
