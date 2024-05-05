const rootRouter = require('express').Router();
const productRoute = require('./product.route');
const userRoute = require('./user.route');

rootRouter.use("/product",productRoute);
rootRouter.use("/user",userRoute);

module.exports = rootRouter