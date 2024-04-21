const Product = require("../models/productModel");

const productController = {
  //GET ALL PRODUCT
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
