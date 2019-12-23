const bcrypt = require('bcryptjs');
const usersRepository = require('../repository/users.repository');

const getUserByCredentials = async (email, password) => {
    const user = await usersRepository.getUser(email);
    if (!user) {
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

const createUser = async (user) => {
    const existUser = await usersRepository.getUser(user.email);
    if (existUser) {
        throw Error(`user with email ${user.email} already exist`);
    }
    user.password = await bcrypt.hash(user.password, 8);
    const userDbModel = await usersRepository.createUser(user);
    return userDbModel;
}

const deleteUser = async (email) => {
    try {
        await usersRepository.deleteUser(email);
    }
    catch (error) {
        console.log(error);
        // log error
        throw error;
    }
}

const getUser = async (email) => {
    try {
        const user = await usersRepository.getUser(email);
        return user;
    }
    catch (err) {
        console.log(err);
        // log error
        throw err;
    }
};

module.exports = {
    getUserByCredentials,
    getUser,
    deleteUser,
    createUser
}