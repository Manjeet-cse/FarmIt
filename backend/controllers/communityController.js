const CommunityPost = require('../models/CommunityPost');

// @desc    Get all posts
// @route   GET /api/community/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const posts = await CommunityPost.find(query)
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('author', 'name profileImage location')
      .populate('comments.user', 'name profileImage');

    const total = await CommunityPost.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      data: posts,
    });
  } catch (error) {
    console.error('getPosts error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Create post
// @route   POST /api/community/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, image, category } = req.body;

    const post = await CommunityPost.create({
      author: req.user.id,
      content,
      image: image || '',
      category: category || 'Discussion',
    });

    const populatedPost = await post.populate('author', 'name profileImage location');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populatedPost,
    });
  } catch (error) {
    console.error('createPost error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Like / Unlike a post
// @route   PUT /api/community/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const userId = req.user.id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error('likePost error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Add comment to post
// @route   POST /api/community/posts/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();

    // Populate the newly added comment
    const updatedPost = await CommunityPost.findById(req.params.id)
      .populate('author', 'name profileImage')
      .populate('comments.user', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'Comment added',
      data: updatedPost,
    });
  } catch (error) {
    console.error('addComment error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

module.exports = { getPosts, createPost, likePost, addComment };
