const mongoose = require('mongoose');
const ProductModel = require("../../models/ProductModel");

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Product ID' });
        }

        // Find the product by ID
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the user is authenticated and authorized
        const user = req.userId; // User ID from authToken middleware

        // Optionally, fetch the user from the database to check roles/permissions
        // const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Check if the user has permission to delete this product
        // For example, you might check user roles or ownership of the product
        // This is an example check; modify as per your authorization logic
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Permission denied' });
        }

        // Delete the product
        await ProductModel.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete product' });
    }
};

module.exports = deleteProduct;
