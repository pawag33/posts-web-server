const express = require('express');
const postsService = require('../services/posts.service');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/post', auth, async (req, res) => {
    try {
        const post = await postsService.createPost(req.body, req.user._id);
        res.status(201).send({
            title: post.title, content: post.content, id: post._id, creator: req.user.name,
        });
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

router.delete('/post/:id', auth, async (req, res) => {
    try {
        await postsService.deleteUserPost(req.params.id, req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.put('/post/:id', auth, async (req, res) => {
    try {
        await postsService.updateUserPost(req.body, req.params.id, req.user._id);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await postsService.getUserPost(req.params.id);
        res.status(200).send({
            title: post.title, content: post.content, id: post._id, creator: post.creator.name,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/post', async (req, res) => {
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
});


module.exports = router;