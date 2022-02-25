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
    email: Joi.string().required().email()
      .message({
        'any.required': 'Поле обязательно для заполнения.',
        'string.email': 'Поле должно содержать электронную почту.',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
             return value;
           }
           return helpers.message('Поле должно содержать ссылку.');
         })
    // email: Joi.string().required().custom((value, helpers) => {
    //   if (validator.isEmail(value)) {
    //     return value;
    //   }
    //   return helpers.message('Невалидный email.');
    // }).messages({
    //   'any.required': 'Поле обязательно для заполнения.',
    // }),
  },
});

module.exports = validateRegisterBody;
