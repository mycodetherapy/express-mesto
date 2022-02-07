const path = require('path');
const express = require('express');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/parro ', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
}); 