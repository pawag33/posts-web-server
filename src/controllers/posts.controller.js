const postsService = require('../services/posts.service');


const createPost = async (req, res) => {
    try {
        const post = await postsService.createPost(req.body, req.user._id);
        res.status(201).send({
            title: post.title, content: post.content, id: post._id, creator: req.user.name,
        });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
};

const deleteUserPost = async (req, res) => {
    try {
        await postsService.deleteUserPost(req.params.id, req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

const updateUserPost = async (req, res) => {
    try {
        await postsService.updateUserPost(req.body, req.params.id, req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

const getUserPost = async (req, res) => {
    try {
        const post = await postsService.getUserPost(req.params.id);
        res.status(200).send({
            title: post.title, content: post.content, id: post._id, creator: post.creator.name,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

const getUsersPosts = async (req, res) => {
    try {
        const posts = await postsService.getUsersPosts();
        const postsRes = posts.map((p) => ({
            title: p.title, id: p._id, content: p.content, creator: p.creator.name,
        }));
        res.status(200).send(postsRes);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {
    createPost,
    deleteUserPost,
    updateUserPost,
    getUserPost,
    getUsersPosts,
};