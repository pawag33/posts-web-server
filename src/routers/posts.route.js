const express = require('express');
const auth = require('../middleware/auth');
const postsController = require('../controllers/posts.controller');

const router = new express.Router();

router.post('/post', auth, postsController.createPost);

router.delete('/post/:id', auth, postsController.deleteUserPost);

router.put('/post/:id', auth, postsController.updateUserPost);

router.get('/post/:id', postsController.getUserPost);

router.get('/post', postsController.getUsersPosts);

module.exports = router;