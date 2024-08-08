const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    price: Number,
    productImage: [],
    description: String,
    sellingPrice: Number,
},
{
    timestamps:true
});

const ProductModel= mongoose.model('Product', productSchema);
module.exports = ProductModel;