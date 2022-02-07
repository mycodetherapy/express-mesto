const express = require('express');
const router = require('express').Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUsersId);
router.post('/users', createUsers);

//module.exports = router;
exports.routes = router;