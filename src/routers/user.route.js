const express = require('express');
const usersService = require('../services/users.service');
const tokensService = require('../services/tokens.service');
const auth = require('../middleware/auth');
// const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const router = new express.Router();

router.post('/user', async (req, res) => {
    try {
        // validate req.body !!!
        const user = await usersService.addUser(req.body);
        // sendWelcomeEmail(user.email, user.name)
        const token = await tokensService.generateAuthToken(user);
        delete user.password;
        delete user._id;
        res.status(201).send({token:token, user:user});
    } catch (e) {
        console.log(e);
        // log e
        res.status(400).send();
    }
});


router.delete('/user', auth, async (req, res) => {
    try {
        await usersService.deleteUser(req.user.email);
        await tokensService.deleteToken(req.token);
        // sendCancelationEmail(req.user.email, req.user.name);
        res.status(200);
    } catch (e) {
        console.log(e);
         // log e
        res.status(500).send();
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await usersService.findUserByCredentials(req.body.email, req.body.password);
        const token = await tokensService.generateAuthToken(user);
        res.send({token:token});
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