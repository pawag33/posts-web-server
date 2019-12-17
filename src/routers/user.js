const express = require('express');
const usersService = require('../services/users');
const tokensService = require('../services/tokens');
const auth = require('../middleware/auth');
// const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const router = new express.Router()


router.post('/users', async (req, res) => {
    try {
        const user = await usersService.addUser(req.body.email, req.body.password,req.body.userName);
        // sendWelcomeEmail(user.email, user.name)
        const token = await tokensService.generateAuthToken(user);
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send(e)
    }
});


router.delete('/users', auth, async (req, res) => {
    try {
        await usersService.deleteUser(req.user.email);
        await tokensService.deleteToken(req.token);
        // sendCancelationEmail(req.user.email, req.user.name);
        res.status(200);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await usersService.findUserByCredentials(req.body.email, req.body.password);
        const token = await tokensService.generateAuthToken(user);
        res.send(token);
    } catch (e) {
        res.status(401).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
       await tokensService.deleteToken(req.token);
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});





module.exports = router;