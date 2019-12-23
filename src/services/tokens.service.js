const jwt = require('jsonwebtoken');
const tokensRepository = require('../repository/tokens.repository');

const generateAuthToken = async function (user) {
    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET,  { expiresIn: "1h" });
    await tokensRepository.saveToken(user,token);
    return token;
};


const getToken = async (token,userId) => {
    const foundToken = await tokensRepository.getToken(token,userId);
    return foundToken;

};

const getUserTokens = async (userId) => {
    const tokens = await tokensRepository.getUserTokens(userId);
    return tokens;
 };
 

const deleteAllTokens = async () => {
    await tokensRepository.deleteAllTokens();
};

const deleteAllUserTokens = async (userId) => {
    await tokensRepository.deleteAllTokens(userId);
};



module.exports = {
    generateAuthToken,
    getToken,
    deleteAllUserTokens,
    deleteAllTokens,
    getUserTokens
}

