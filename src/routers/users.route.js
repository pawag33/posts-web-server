const express = require('express');
const auth = require('../middleware/auth');
const usersController = require('../controllers/users.controller');

const router = new express.Router();

router.post('/users', usersController.createUser);

router.delete('/users', auth, usersController.deleteUser);

router.post('/users/login', usersController.loginUser);

router.post('/users/logout', auth, usersController.logoutUser);

module.exports = router;