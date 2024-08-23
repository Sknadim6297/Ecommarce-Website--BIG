const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    price: Number,
    productImage: [],
    description: String,
    sellingPrice: Number,
}, {
    timestamps: true
});

// Check if the model already exists before defining it
const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = ProductModel;
