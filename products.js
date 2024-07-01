// models/products.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true, "Please provide a product_name"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image"],
    },
    reward: {
        type: {
            type: String,
            required: [true, "Please provide a reward"],
        },
        quntity: {
            type: Number,
            required: [true, "Please provide a quntity"],
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
