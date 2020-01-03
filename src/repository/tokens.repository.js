const TokenDbModel = require('../db-models/token.db-model');

const saveToken = async (user, tokenStr) => {
    const token = new TokenDbModel({ token: tokenStr, user: user._id });
    await token.save();
};

const getToken = async (tokenStr, userId) => {
    const token = await TokenDbModel.findOne({ token: tokenStr, user: userId });
    return token;
};

const getUserTokens = async (userId) => {
    const tokens = await TokenDbModel.find({ user: userId });
    return tokens;
};

const deleteAllTokens = async () => {
    await TokenDbModel.deleteMany({});
};

const deleteAllUserTokens = async (userId) => {
    await TokenDbModel.deleteMany({ user: userId });
};

module.exports = {
    saveToken,
    getToken,
    deleteAllTokens,
    deleteAllUserTokens,
    getUserTokens,
};