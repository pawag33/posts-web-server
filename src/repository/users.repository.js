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
    try{
        const foundUser = await UserDbModel.findOne({email:email });
        return foundUser;
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
}

const deleteUser = async (email) => {
    try{
       await UserDbModel.deleteOne({email:email });
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
}

module.exports = {
    addUser,
    findUser,
    deleteUser

}