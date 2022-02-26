const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validationUpdateAvatar = celebrate({
  body: {
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле должно содержать ссылку.');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения.',
      }),
  },
});

module.exports = validationUpdateAvatar;
