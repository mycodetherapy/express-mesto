const express = require('express');
const { uswrRoutes } = require('./users');
//const router = require('express').Router();
const router = express.Router();

router.use('/users', uswrRoutes);

// router.get('/users', getUsers);
// router.get('/users/:userId', getUsersId);
// router.post('/users', createUsers);



module.exports = router;
//exports.router = router;