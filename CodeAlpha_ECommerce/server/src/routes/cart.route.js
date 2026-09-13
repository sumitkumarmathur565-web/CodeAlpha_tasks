const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const cartController = require('../controllers/cart.controller')
const router = express.Router();


router.post('/add' , authMiddleware , cartController.addproduct)
router.get('/', authMiddleware, cartController.getCart)

module.exports = router