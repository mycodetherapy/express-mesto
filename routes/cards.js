const express = require('express');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
 //getCardById,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCard);

//router.get('/:cardId', getCardById);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
