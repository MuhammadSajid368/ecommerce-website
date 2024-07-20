const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    brandName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    productImage: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one product image is required'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
