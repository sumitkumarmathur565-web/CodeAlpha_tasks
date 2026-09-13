const productModel = require('../models/product.model')

async function createProduct(req , res) {
    const {name , description , price  , stock , category} = req.body;

    if(!name || !description || !price || !category){
        return res.status(400).json({
            message: "All field required"
        })
    }

    try {
        const product = await productModel.create({
            name: name,
            description: description,
            price: price,
            stock: stock,
            category: category
        })

        return res.status(201).json({
            message: "Product added",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:" Product creation failed"
        })
    }
    
}

async function getProduct(req, res) {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message : "Product fetched",
            products
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch products" })
    }
    
}


async function getProductById(req, res) {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        return res.status(200).json({
            message: "Product fetched",
            product
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch product" })
    }
}


module.exports = {createProduct , getProduct , getProductById}