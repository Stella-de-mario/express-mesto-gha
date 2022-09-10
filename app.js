const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./utils/constants');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
