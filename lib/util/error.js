'use strict';

var util = require('util');

function AppError(body) {
  //we probably want to log this error

  if (!body) {
    this.message = 'Unknown error';
    return;
  }

  if (body.status) {
    if (body.status == 'nok') {
      this.message = body.reason;
    }
  } else {
    this.message = body.detail;
  }

  this.code = body.code;
  this.type = body.type;

}

util.inherits(AppError, Error);

AppError.create = function (response) {
  return new AppError(response);
};

AppError.createFromResponse = AppError.create;

module.exports = AppError;
