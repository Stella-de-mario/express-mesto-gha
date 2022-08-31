const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { NOT_FOUND_ERROR } = require('./constants/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/*', (req, res, next) => {
  req.user = {
    _id: '630fa5da7cd16aadf8016607',
  };
  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('/*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая страница не найдена' }));

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
