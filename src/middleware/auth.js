const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');
const tokensService = require('../services/tokens.service');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await usersService.getUser(decoded.email);
        if (!foundUser) {
            throw Error('User not found');
        }
        const foundToken = await tokensService.getToken(token, foundUser._id);
        if (!foundToken) {
            throw Error('Token not found');
        }

        req.token = token;
        req.user = foundUser;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
};

module.exports = auth;