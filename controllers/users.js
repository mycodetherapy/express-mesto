const  User  = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  console.log(req);

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
  const { _id } = req.body;

  User.create({ _id })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// exports.getUsers = (req, res) => {
//   res.status(200).send(User);
// };

// exports.getUserById = (req, res) => {
//   const {id} = req.params;
//   res.status(200).send(User.find((item) => item._id === id));
// }