const UserDbModel = require('../db-models/user.db-model');

const addUser = async (user) => {
    const userDbModel = new UserDbModel(user);
    try{
        await userDbModel.save();
        return userDbModel;
    }
    catch(err){
       // log error
        throw err;
    }
}

const findUser = async (email) => {
    const foundUser = await UserDbModel.findOne({email:email });
    return foundUser;
};

const deleteUser = async (email) => {
    await UserDbModel.deleteOne({email:email });
}

module.exports = {
    addUser,
    findUser,
    deleteUser

}