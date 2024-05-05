const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },

})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product
