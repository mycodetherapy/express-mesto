const Card = require("../models/card");
const { NotFoundError, BadRequestError, ForbiddenError } = require("../errors");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const idCard = req.params.cardId;
  const userId = req.user._id;
  Card.findById(idCard)
    .then((cardData) => {
      if (cardData) {
        if (String(cardData.owner).includes(userId)) {
          return Card.findByIdAndRemove(idCard)
            .then(() => {
              res.send({ message: "Карточка удалена." });
            })
            .catch(next);
        } else {
          next(new ForbiddenError("Вы не можете удалять чужие карточки."));
        }
      } else {
        next(new NotFoundError("Карточка не найдена."));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена."))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена."))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
