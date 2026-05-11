const express = require('express');
const router = express.Router();
const { signup, login, getMe, googleLogin, updateProfile, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/reset-password', resetPassword);

module.exports = router;
