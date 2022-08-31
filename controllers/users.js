const User = require('../models/user');
const {
  OK_REQUEST,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../constants/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: `Произошла ошибка на сервере: ${err}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка на сервере: ${err}` });
      }
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR)
          .send({
            message: `Пользователь с id: ${req.params.userId} не найден`,
          });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка на сервере: ${err}` });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR)
          .send({
            message: `Пользователь с id: ${req.params.userId} не существует`,
          });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка на сервере: ${err}` });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      }
      res.status(OK_REQUEST).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка на сервере: ${err}` });
      }
    });
};
