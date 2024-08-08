
const ProductModel = require('../../models/ProductModel');


const getProduct = async (req, res) => {
    try {
        const AllProduct= await ProductModel.find().sort({createdAt: -1});

        res.status(200).json({Success:true,data: AllProduct});
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = getProduct;