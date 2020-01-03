const TokenDbModel = require('../db-models/token.db-model');

const saveToken = async (user, tokenStr) => {
    const token = new TokenDbModel({ token: tokenStr, user: user._id });
    await token.save();
};

const getToken = async (tokenStr, userId) => TokenDbModel.findOne(
    { token: tokenStr, user: userId },
);

const getUserTokens = async (userId) => TokenDbModel.find({ user: userId });

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