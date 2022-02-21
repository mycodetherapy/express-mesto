const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NOT_FOUND, errorHandler } = require("../utils/errors");
const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUserInfo = (req, res) => {
  //console.log(req.user._id);
  User.findById(req.user._id)
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      //console.log(req.user);
      errorHandler(err, res);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден." });
      } else {
        errorHandler(err, res);
      }
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден." });
      } else {
        errorHandler(err, res);
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден." });
      } else {
        errorHandler(err, res);
      }
    });
};
