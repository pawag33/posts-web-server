const jwt = require('jsonwebtoken');
const tokensRepository = require('../repository/tokens.repository');

const generateAuthToken = async function (user) {
    try{
        const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET,  { expiresIn: "1h" });
        await tokensRepository.saveToken(user,token);
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


const findToken = async (token,userId) => {
    try{
        const foundToken = await tokensRepository.findToken(token,userId);
        return foundToken;
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
};



module.exports = {
    generateAuthToken,
    deleteToken,
    findToken
}

