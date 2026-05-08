const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, addComment } = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.route('/posts')
  .get(getPosts)
  .post(protect, createPost);

router.put('/posts/:id/like', protect, likePost);
router.post('/posts/:id/comment', protect, addComment);

module.exports = router;
