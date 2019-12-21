const bcrypt = require('bcryptjs');
const userRepository = require('../repository/users.repository');

const findUserByCredentials = async (email,password) => {
    const user = await userRepository.findUser(email);
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
        const existUser = await userRepository.findUser(user.email);
        if(existUser){
            throw Error(`user with email ${user.email} already exist`);
        }
        user.password = await bcrypt.hash(user.password, 8);
        const userDbModel = await userRepository.addUser(user);
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
       await userRepository.deleteUser(email);
    }
    catch(error){
        console.log(error);
         // log error
         throw error;
    }
}

const findUser = async (email) =>{
    const user = await userRepository.findUser(email);
    if(!user){
        // log error
        console.log(error);
        throw new Error("User not found");
    }

    return user;
};
 
module.exports = {
    findUserByCredentials,
    findUser,
    deleteUser,
    addUser
}