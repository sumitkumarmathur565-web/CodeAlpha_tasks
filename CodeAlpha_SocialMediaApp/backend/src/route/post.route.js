const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const postController = require('../controller/post.controller')

const router = express.Router();


router.post("/createPost" , authMiddleware , postController.createPost )
router.get("/feed" , authMiddleware , postController.getPost )
router.delete("/delete/:id" , authMiddleware , postController.deletePost)
router.post("/like/:id" , authMiddleware , postController.likePost)


module.exports = router