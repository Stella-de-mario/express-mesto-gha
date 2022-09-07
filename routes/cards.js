const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateGetCardId,
  validateCreateCard,
} = require('../utils/constants');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateGetCardId, deleteCard);
router.put('/:cardId/likes', validateGetCardId, likeCard);
router.delete('/:cardId/likes', validateGetCardId, dislikeCard);

module.exports = router;
