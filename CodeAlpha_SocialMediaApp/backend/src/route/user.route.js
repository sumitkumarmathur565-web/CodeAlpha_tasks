const express = require('express');
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/:id', authMiddleware, userController.getProfile);
router.post('/:id/follow', authMiddleware, userController.followUser);
router.post('/:id/unfollow', authMiddleware, userController.unfollowUser);

module.exports = router;