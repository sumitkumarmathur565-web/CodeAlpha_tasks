const cartModel = require('../models/cart.model')

async function addproduct(req, res) {
    const { productId, quantity } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Invalid request" })
    }

    try {
        let cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            cart = await cartModel.create({
                user: req.user._id,
                items: [{ product: productId, quantity: quantity || 1 }]
            })
        } else {
            const existingProduct = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += quantity || 1;
            } else {
                cart.items.push({ product: productId, quantity: quantity || 1 });
            }

            await cart.save();
        }

        await cart.populate('items.product');   // <-- add this before responding

        return res.status(200).json({ message: "Cart updated", cart })

    } catch (error) {
        console.log("Add to cart error:", error);
        return res.status(500).json({ message: "Cart updation failed" })
    }
}

async function getCart(req, res) {
    try {
        const cart = await cartModel.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            return res.status(200).json({ message: "Cart is empty", cart: { items: [] } });
        }

        return res.status(200).json({ message: "Cart fetched", cart });
    } catch (error) {
        console.log("Get cart error:", error);  
        return res.status(500).json({ message: "Failed to fetch cart" });
    }
}

module.exports = { addproduct, getCart }   // add getCart to existing exports

