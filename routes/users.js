const express = require('express');
const { getUsers, getUserById, createUser, updateUser, updateAvatar } = require('../controllers/users');
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
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

// userRoutes.post('/', (req, res, next) => {
//   res.send(req.body)
// })

module.exports = router;
//exports.userRoutes = userRoutes;