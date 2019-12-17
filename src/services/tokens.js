const jwt = require('jsonwebtoken');

const generateAuthToken = async function (user) {
    try{
        const token = jwt.sign({ email: user.email, userName: user.userName }, process.env.JWT_SECRET);
        //TODO : save token in DB
        return token;
    }
    catch(err){
        console.log(err);
        // log error
    }
}

const deleteToken = async function (token) {
    try {
        //TODO : delete token from DB
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    generateAuthToken,
    deleteToken
}

