const PostDbModel = require('../db-models/post.db-model');

const createPost = async (post, userId) => {
    const postDbModel = new PostDbModel({
        title: post.title,
        content: post.content,
        creator: userId,
    });
    await postDbModel.save();
    return postDbModel;
};

const getUserPost = async (id) => {
    const foundUserPost = await PostDbModel.findById(id).populate('creator');
    return foundUserPost;
};

const getUsersPosts = async () => {
    const foundUsersPosts = await PostDbModel.find().populate('creator');
    return foundUsersPosts;
};

const deleteUserPost = async (postId, userId) => {
    await PostDbModel.deleteOne({ _id: postId, creator: userId });
};

const updateUserPost = async (post, postId, userId) => {
    await PostDbModel.updateOne({ _id: postId, creator: userId }, post);
};

module.exports = {
    createPost,
    getUserPost,
    getUsersPosts,
    deleteUserPost,
    updateUserPost,
};