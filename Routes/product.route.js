const router = require('express').Router();
const productController = require('../Controllers/product.controller');

//GET ALL PRODUCT
router.get("/", productController.getAllProduct);

module.exports = router;
