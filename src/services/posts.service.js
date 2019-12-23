const postsRepository = require('../repository/posts.repository');

const createPost = async (post,userId) => {
    return await postsRepository.createPost(post,userId);
};

const getUserPost = async (id) => {
    return await postsRepository.getUserPost(id);
};

const getUsersPosts = async () => {
   return await postsRepository.getUsersPosts();
};

const deleteUserPost = async (postId,userId) => {
    await postsRepository.deleteUserPost(postId,userId);
};

const updateUserPost = async (post,postId,userId) => {
    await postsRepository.updateUserPost(post,postId,userId);
};

module.exports = {
    createPost,
    getUserPost,
    getUsersPosts,
    deleteUserPost,
    updateUserPost
};