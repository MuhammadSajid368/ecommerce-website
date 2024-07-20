const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const Cart = mongoose.model('addToCart', cartSchema);

module.exports = Cart;
