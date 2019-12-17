const {User} = require('../entities/user');
const bcrypt = require('bcryptjs');

// mock 
const mockUsers = [new User("test@test.com","$2a$08$UZvpPUHfKnQEO9IwgkLMmOyoATWmMItKj.YxtLNIbo4wc0UE9We2K","test-username")];

const findUserByCredentials = async (email,password) => {
    const user = mockUsers.find(u => u.email === email);
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

    // change to this !!!
    // const user = await User.findOne({ email })

    // if (!user) {
    //     throw new Error('Unable to login')
    // }

    // const isMatch = await bcrypt.compare(password, user.password)

    // if (!isMatch) {
    //     throw new Error('Unable to login')
    // }

    // return user

}

const addUser = async (email,password,userName) =>{
    try{
        const foundUser = mockUsers.find(u => u.email === email);
        if(foundUser){
            throw new Error("User alerady exist");
        }
        const user = new User(email,password,userName);
        user.password = await bcrypt.hash(user.password, 8)
        mockUsers.push(user);
        return Object.assign(user);
    }
    catch(error){
        console.log(error);
        // log err
        throw error;
    }
}

const deleteUser = async (email) => {
    try{
        // delete user from repo
    }
    catch(error){
        console.log(error);
         // log error
         throw error;
    }
}

const findUser = async (email) =>{
    const user = mockUsers.find(u => u.email === email);
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