const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type:String
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", CartSchema);
module.exports = cartModel;
