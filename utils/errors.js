const express = require('express');

module.exports.errorHandler = (err, res) => {
  if (err.name === "ValidationError") {
    res.send({ message: "400 - Переданы некорректные данные." });
  } else if (err.name === "CastError") {
    //console.log(JSON.stringify(err));
    res.send({ message: "404 - Карточка или пользователь не найден." });
  } else {
    res.status(500).send({ message: err.message });
  }
};
