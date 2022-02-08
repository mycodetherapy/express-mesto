const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/users');
const router = require('express').Router();
//const userRoutes = express.Router();

// router.get('/users', getUsers);
// router.get('/users/:userId', getUsersId);
// router.post('/users', createUsers);

// userRoutes.get('/', getUsers);
// userRoutes.get('/:id', getUserById);
// userRoutes.post('/', express.json(), createUser);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', express.json(), createUser);

// userRoutes.post('/', (req, res, next) => {
//   res.send(req.body)
// })

module.exports = router;
//exports.userRoutes = userRoutes;