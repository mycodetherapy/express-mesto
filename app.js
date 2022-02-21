const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();
const auth = require('./middlewares/auth')
const { login, createUser } = require('./controllers/users');

const {
  NOT_FOUND,
} = require('./utils/errors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useUnifiedTopology: true
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '620214792a32735103d168c1',
//   };

//   next();
// });

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден.' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
