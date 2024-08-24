const productModel = require("../../models/ProductModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req.query.category ? req.query.category.split(',') : [];

    const products = await productModel.find({
      category: {
        "$in": categoryList
      }
    });

    res.json({
      data: products,
      message: "Products fetched successfully",
      error: false,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = filterProductController;
