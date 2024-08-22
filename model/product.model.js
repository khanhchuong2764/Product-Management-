const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        status: String,
        posittion: Number,
        thumbnail: String,
        slug: { type: String, slug: "title" ,unique: true },
        delete: {
            type:Boolean,
            default:false
        },
        DeleteDat: Date
    }, {
        timestamps:true
    }
)


const Product = mongoose.model("product",ProductSchema,"products");

module.exports =Product;