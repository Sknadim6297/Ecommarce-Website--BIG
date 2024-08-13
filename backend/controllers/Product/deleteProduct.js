const ProductModel = require("../../models/ProductModel");

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ Success: false, message: 'Product ID is required' });
        }
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ Success: false, message: 'Product not found' });
        }

        await ProductModel.findByIdAndDelete(id); 
        res.json({ Success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ Success: false, message: 'Failed to delete product' });
    }
};

module.exports = deleteProduct;
