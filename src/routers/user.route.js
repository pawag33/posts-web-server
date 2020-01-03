const express = require('express');
const usersService = require('../services/users.service');
const tokensService = require('../services/tokens.service');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/user', async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);
        const token = await tokensService.generateAuthToken(user);
        res.status(201).send({ token, user: { email: user.email, name: user.name } });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});


router.delete('/user', auth, async (req, res) => {
    try {
        await usersService.deleteUser(req.user.email);
        await tokensService.deleteAllUserTokens(req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await usersService.getUserByCredentials(req.body.email, req.body.password);
        const token = await tokensService.generateAuthToken(user);
        res.send({ token });
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        await tokensService.deleteToken(req.token);
        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});


module.exports = router;