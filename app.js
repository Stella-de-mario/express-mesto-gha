const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { NOT_FOUND_ERROR } = require('./constants/errors');

const { PORT = 3000 } = process.env;
const app = express();

async function main() {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
main();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  req.user = {
    _id: '630f6001b82377c1328b7d78',
  };
  next();
});
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая страница не найдена' });
});
