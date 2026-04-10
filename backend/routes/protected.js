const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route GET /api/protected/profile
// @desc Get user profile (requires authentication)
// @access Private
router.get('/profile', protect, (req, res) => {
  // req.user is available here due to the 'protect' middleware
  res.status(200).json({
    message: 'Welcome to your protected profile!',
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;