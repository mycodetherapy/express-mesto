const BAD_REQEST = 400;
const NOT_FOUND = 404;
const DEFOULT_ERR = 500;

const errorHandler = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQEST).send({ message: 'Переданы некорректные данные.' });
  } else {
    res.status(DEFOULT_ERR).send({ message: err.message });
  }
};

module.exports = {
  BAD_REQEST,
  NOT_FOUND,
  DEFOULT_ERR,
  errorHandler,
};
