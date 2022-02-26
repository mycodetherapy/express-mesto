const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateCreateCard = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Минимальная длина поля 2 символа.",
      "string.max": "Максимальная длина поля 30 символов.",
      "any.required": "Поле обязательно для заполнения.",
    }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message("Поле должно содержать ссылку.");
      })
      .messages({
        "any.required": "Поле обязательно для заполнения.",
      }),
  },
});

module.exports = validateCreateCard;
