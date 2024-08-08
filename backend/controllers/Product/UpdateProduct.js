const uploadPermission = require("../../helpers/Permission");
const ProductModel = require("../../models/ProductModel");


const updateProduct = async (req, res) => {
    try {
        if(!uploadPermission(req.userId)){
            throw new Error("Permission denied");
        }
        const {_id,...resBody}=req.body;
        
        const updateProduct = await ProductModel.findByIdAndUpdate(_id,resBody)
        if(!updateProduct){
            throw new Error("Product not found");
        }
        res.status(201).json({
            message: "Product updated successfully",
            error: false,
            success: true,
            data: updateProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

module.exports = updateProduct;