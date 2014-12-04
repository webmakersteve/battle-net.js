var Errors = {};

Errors.createFromResponse = function (body) {
  console.log(body);
  return new Error('This is an error');
}

module.exports = Errors;
