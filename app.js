const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const NotFoundError = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('/*', (req, res) => res.status(NotFoundError).send({ message: 'Запрашиваемая страница не найдена' }));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Произошла ошибка на сервере' : message });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
