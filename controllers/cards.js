const { NOT_FOUND, errorHandler } = require("../utils/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

// const getCardById = (req) => {
//   Card.findById(req.params.cardId)
//     .then((card) => {
//       console.log(card.owner);
//       //res.send({ data: card })
//       return card.owner;
//     })
//     .catch((err) => {
//       errorHandler(err, res);
//     });
// };

module.exports.deleteCard = (req, res) => {
  console.log(req.user._id);
  const idCard = req.params.cardId;
  const userId = req.user._id;
  Card.findById(idCard).then((cardData) => {
    console.log(cardData.owner);
    console.log(userId);
    if (String(cardData.owner).includes(userId)) {
      Card.findByIdAndRemove(idCard)
        .orFail(new Error("NotFound"))
        .then((card) => res.send({ data: card }))
        .catch((err) => {
          if (err.message === "NotFound") {
            res.status(NOT_FOUND).send({ message: "Карточка не найдена." });
          } else {
            errorHandler(err, res);
          }
        });
    } else { res.send({ message: "Вы не можете удалять чужие карточки." })}
  });

  // Card.findByIdAndRemove(req.params.cardId)
  //   .orFail(new Error("NotFound"))
  //   .then((card) => res.send({ data: card }))
  //   .catch((err) => {
  //     if (err.message === "NotFound") {
  //       res.status(NOT_FOUND).send({ message: "Карточка не найдена." });
  //     } else {
  //       errorHandler(err, res);
  //     }
  //   });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === "NotFound") {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена." });
      } else {
        errorHandler(err, res);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === "NotFound") {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена." });
      } else {
        errorHandler(err, res);
      }
    });
};
