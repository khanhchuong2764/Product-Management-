const Product = require("../../model/product.model");


module.exports.index = async (req, res) => {
    const find = {
        delete:false,
        status:"active"
    }
    const record = await Product.find(find).sort({
        posittion:"desc"
    });

    const newrecord = record.map(item => {
        item.newprice = Math.ceil((item.price*(100 - item.discountPercentage)/100));
        return item;
    })
    res.render("client/pages/product/index",{
        pageTitle:"Danh Sach San Pham",
        record:record
    });
}

// [GET] /admin/product/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            delete:false,
            slug: req.params.slug,
            status:"active"
        }
        const record = await Product.findOne(find);
        res.render("client/pages/product/detail",{
            pageTitle:record.title,
            product:record
        })
    } catch (error) {
        req.flash('error', `Không Tìm Thấy Sản Phẩm`);
        res.redirect(`/product`);
    }
}