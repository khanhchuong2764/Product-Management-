const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductCategorySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        parentID: String,
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


const ProductCategory = mongoose.model("ProductCategory",ProductCategorySchema,"products-category");

module.exports =ProductCategory;