const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const productController = require('../controllers/product.controller')

const router = express.Router();

router.post('/createProduct', authMiddleware , productController.createProduct  )
router.get('/', productController.getProduct  )
router.get('/:id', productController.getProductById)

module.exports = router