const express = require('express');
const postsService = require('../services/posts.service');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/post',auth, async (req, res) => {
    try {
        const post = await postsService.createPost(req.body,req.user._id);
        res.status(201).send({ title: post.title,content:post.content});
    } catch (e) {
        console.log(e);
        // log e
        res.status(400).send();
    }
});


router.delete('/post:id', auth, async (req, res) => {
    try {
       await postsService.deleteUserPost(req.params.id,req.user._id)
       res.status(200).send();
    } catch (e) {
        console.log(e);
        // log e
        res.status(500).send();
    }
});

router.update('/post:id', auth, async (req, res) => {
    try {
       await postsService.updateUserPost(req.body,req.params.id,req.user._id)
       res.status(200).send();
    } catch (e) {
        console.log(e);
        // log e
        res.status(500).send();
    }
});

router.get('/post:id', async (req, res) => {
    try {
       const post =  await postsService.getUserPost(req.params.id)
       res.status(200).send(post);
    } catch (e) {
        console.log(e);
        // log e
        res.status(500).send();
    }
});

router.get('/post', async (req, res) => {
    try {
       const posts =  await postsService.getUsersPosts();
       res.status(200).send(posts);
    } catch (e) {
        console.log(e);
        // log e
        res.status(500).send();
    }
});


module.exports = router;