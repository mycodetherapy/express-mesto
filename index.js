//const path = require('path');
const express = require('express');
//const { path } = require('express/lib/application');
const path = require('path');
const  mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

//const { routes } = require('./routes');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

 app.use('/users', require('./routes/users'));

 app.use((req, res, next) => {
  req.user = {
    _id: '620214792a32735103d168c1' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

