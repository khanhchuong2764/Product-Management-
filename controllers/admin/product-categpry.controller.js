const ProductCategory = require("../../model/product-category.model");
const Systemconfig = require("../../config/system");


//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    const find = {
        delete:false
    }
    const records = await ProductCategory.find(find);
    res.render("admin/pages/product-category/index",{
        pageTitle:"Danh Mục Sản Phẩm",
        records:records
    })
}
//[GET] /admin/product-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/product-category/create",{
        pageTitle:"Tạo Mới Danh Mục"
    })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.posittion == "") {
        const count = await ProductCategory.countDocuments();
        req.body.posittion = count + 1;
    }else {
        req.body.posittion = parseInt(req.body.posittion);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    req.flash('success', `Thêm Mới Danh Mục Sản Phẩm Thành Công`);
    res.redirect(`${Systemconfig.prefixAdmin}/product-category`);
}