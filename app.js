const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require('celebrate');
const validateRegisterBody = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const errorsHandler = require('./middlewares/error-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useUnifiedTopology: true
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.post('/signin', login);
app.post('/signup', validateRegisterBody, createUser);
// app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

// app.use((req, res) => {
//   res.status(NOT_FOUND).send({ message: 'Ресурс не найден.' });
// });

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
