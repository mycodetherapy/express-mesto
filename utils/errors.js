const express = require('express');
const BAD_REQEST = 400;
const NOT_FOUND = 404;
const DEFOULT_ERR = 500;

module.exports.errorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(BAD_REQEST).send({ message: "Переданы некорректные данные." });
  } else if (err.name === "CastError") {
    //console.log(JSON.stringify(err));
    res.status(NOT_FOUND).send({ message: "Карточка или пользователь не найден." });
  } else {
    res.status(DEFOULT_ERR).send({ message: err.message });
  }
};
