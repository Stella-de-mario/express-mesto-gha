const Card = require('../models/card');
const {
  OK_REQUEST,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../constants/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = { _id: req.user._id };
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Карточка с указанным id не найдена' });
      }
      return res.status(OK_REQUEST).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(OK_REQUEST).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
      return res.status(OK_REQUEST).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};
