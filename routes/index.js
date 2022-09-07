const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const {
  validateLogin,
  validateCreateUser,
} = require('../utils/constants');

const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);
router.use(userRouter);
router.use(cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
