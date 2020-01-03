const UserDbModel = require('../db-models/user.db-model');

const createUser = async (user) => {
    const userDbModel = new UserDbModel(user);
    await userDbModel.save();
    return userDbModel;
};

const getUser = async (email) => {
    const foundUser = await UserDbModel.findOne({ email });
    return foundUser;
};

const deleteUser = async (email) => {
    await UserDbModel.deleteOne({ email });
};

module.exports = {
    createUser,
    getUser,
    deleteUser,

};