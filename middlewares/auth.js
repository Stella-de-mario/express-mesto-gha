const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new UnauthorizedError('Пожалуйста, авторизуйтесь'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
