const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId , ref: "User" , required: true},
    items: [{
        product : {type : mongoose.Schema.Types.ObjectId , ref: "product"},
        quantity: {type: Number  , required :true , default: 0}
    }
    ]
})

const cartModel = mongoose.model("cart" , cartSchema);

module.exports = cartModel
