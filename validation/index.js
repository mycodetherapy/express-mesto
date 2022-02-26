const validateRegisterBody = require('./validateRegisterBody');
const validateCreateCard = require('./validateCreateCard');
const validationUpdateUser = require('./validationUpdateUser');
const validationUpdateAvatar = require('./validationUpdateAvatar');
const validationUserId = require('./validationUserId');
const validationCardId = require('./validationCardId');

module.exports = {
  validateRegisterBody,
  validateCreateCard,
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
  validationCardId,
};
