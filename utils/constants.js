const { celebrate, Joi } = require('celebrate');

const regexUrl = /^https*:\/\/(www.)*[a-zа-я0-9.\-._~:/?#[\]@!$&'()*+,;=]{2,}(#*$)/i;

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
});

const validateGetCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

module.exports = {
  regexUrl,
  validateLogin,
  validateCreateUser,
  validateGetUserId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetCardId,
  validateCreateCard,
};
