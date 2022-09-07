const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    res.status(UnauthorizedError).send({ message: 'Пожалуйста, авторизуйтесь' });
  }
  req.user = payload;
  next();
};
