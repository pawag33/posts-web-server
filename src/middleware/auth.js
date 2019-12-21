const jwt = require('jsonwebtoken');
const {User} = require('../entities/user');
const usersService = require('../services/users').default;


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usersService.findUser(decoded.email);

        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send();
    }
}

module.exports = auth;