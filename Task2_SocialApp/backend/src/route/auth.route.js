const express = require('express')
const authControlller = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router();

router.post("/register" , authControlller.register)
router.post("/login" , authControlller.login)
router.get("/me" , authMiddleware , authControlller.getMe )
router.post('/logout', authMiddleware, authControlller.logout);


module.exports = router