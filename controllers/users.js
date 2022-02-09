const  User  = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  //console.log(req);

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {

console.log(req.body);
console.log(req.user._id);

  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
        new: true, // обработчик then получит на вход обновлённую запись
       // runValidators: true, // данные будут валидированы перед изменением
        upsert: true // если пользователь не найден, он будет создан
    }
)
  .then(user => res.send({ data: user }))
  .catch(user => res.send({ message: "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое" })) ;
}

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
        new: true,
        runValidators: true,
        upsert: true
    }
)
  .then(user => res.send({ data: user }))
  .catch(user => res.send({ message: "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое" })) ;
}