const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    audio_type: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    product_cat: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
