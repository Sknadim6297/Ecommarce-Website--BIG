const uploadPermission = require('../../helpers/Permission');
const ProductModel= require('../../models/ProductModel');

const uploadProduct = async (req, res) => {
    try{
        const sessionUserId = req.userId

        if(!uploadPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
    
        const uploadProduct = new ProductModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        
    }
};

module.exports = uploadProduct;