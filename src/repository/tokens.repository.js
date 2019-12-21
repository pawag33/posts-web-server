const TokenDbModel = require('../db-models/token.db-model');

const saveToken = async (user,tokenStr) => {
    try{
        const token = new TokenDbModel({token:tokenStr,user:user._id});
        await token.save();
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
};

const findToken = async (tokenStr,userId) => {
    try{
        const token = await TokenDbModel.findOne({token:tokenStr,user:userId });
        return token;
    }
    catch(err){
        console.log(err);
       // log error
        throw err;
    }
};

module.exports = {
    saveToken,
    findToken
}