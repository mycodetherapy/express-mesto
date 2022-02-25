const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const ForbiddenError = require('./ForbiddenError');
const DuplicateEmailError = require('./DuplicateEmailError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  DuplicateEmailError,
  UnauthorizedError,
};
