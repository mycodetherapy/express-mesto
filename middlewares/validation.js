const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegisterBody = celebrate({
  body: {
    password: Joi.string().min(4).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля 4 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email.');
    }).messages({
      'any.required': 'Поле обязательно для заполнения.',
    }),
  },
});

module.exports = validateRegisterBody;
