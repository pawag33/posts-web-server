const bcrypt = require('bcryptjs');
const usersRepository = require('../repository/users.repository');

const findUserByCredentials = async (email,password) => {
    const user = await usersRepository.findUser(email);
    if(!user){
        // log error
        const error = new Error("User not found")
        console.log(error);
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        // log error
        const error = new Error("Password mismatch")
        console.log(error);
        throw error;
    }
    return user;
}

const addUser = async (user) =>{
    try {
        const existUser = await usersRepository.findUser(user.email);
        if(existUser){
            throw Error(`user with email ${user.email} already exist`);
        }
        user.password = await bcrypt.hash(user.password, 8);
        const userDbModel = await usersRepository.addUser(user);
        return userDbModel;
    }
    catch(error){
        console.log(error);
        // log err
        throw error;
    }
}

const deleteUser = async (email) => {
    try{
       await usersRepository.deleteUser(email);
    }
    catch(error){
        console.log(error);
         // log error
         throw error;
    }
}

const findUser = async (email) =>{
    try{
        const user = await usersRepository.findUser(email);
        return user;
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
};
 
module.exports = {
    findUserByCredentials,
    findUser,
    deleteUser,
    addUser
}