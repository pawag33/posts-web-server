const usersService = require('../services/users.service');
const tokensService = require('../services/tokens.service');

const createUser = async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);
        const token = await tokensService.generateAuthToken(user);
        res.status(201).send({ token, user: { email: user.email, name: user.name } });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
};


const deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.user.email);
        await tokensService.deleteAllUserTokens(req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await usersService.getUserByCredentials(req.body.email, req.body.password);
        const token = await tokensService.generateAuthToken(user);
        res.send({ token });
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
};

const logoutUser = async (req, res) => {
    try {
        await tokensService.deleteToken(req.token);
        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {
    createUser,
    deleteUser,
    logoutUser,
    loginUser,
};