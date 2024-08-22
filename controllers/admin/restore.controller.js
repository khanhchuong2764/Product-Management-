const Product = require("../../model/product.model");
const FillterStatusHelper = require("../../helper/fillterstatus");
const ObjectSearchHelper = require("../../helper/search");
const PaginationHelper =require("../../helper/pagination");

module.exports.index = async (req, res) => {
    const find = {
        delete:true
    }

    // Fillter Status
    const FillterStatus = FillterStatusHelper(req.query);
    if (req.query.status){
        find.status = req.query.status;
    }
    //  End Fillter Status

    //Search
    const ObjectSearch = ObjectSearchHelper(req.query);
    let keyword =ObjectSearch.keyword;
    if (req.query.keyword) {
        find.title = ObjectSearch.regex;
    }
    //End Search

    // Pagination
    const countRecord = await Product.countDocuments(find);
    const ObjectPagination=PaginationHelper({
        limititem : 4,  
        currentPage:1
    },
        req.query,
        countRecord
    )
    // End Pagination
    const record =await Product.find(find).limit(ObjectPagination.limititem).skip(ObjectPagination.skip);
    res.render("admin/pages/restore/index",{
        pageTitle:"Trang Khôi Phục Sản Phẩm",
        record:record,
        FillterStatus:FillterStatus,
        keyword:keyword,
        ObjectPagination:ObjectPagination
    })
}

// [PATCH] /admin/product/changeMulti
module.exports.ChangeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in : ids}}, {status:"active"})
            req.flash('success', `Cập Nhật Trạng Thái ${ids.length} Sản Phẩm Thành Công`);
            break;
        case "inactive":
            await Product.updateMany({_id: {$in : ids}}, {status:"inactive"})
            req.flash('success', `Cập Nhật Trạng Thái ${ids.length} Sản Phẩm Thành Công`);
            break;
        case "delete":
            await Product.deleteMany({_id: {$in : ids}})
            req.flash('success', `Xóa Vĩnh Viễn ${ids.length} Sản Phẩm Thành Công`);
            break;
        case "restore":
            await Product.updateMany({_id: {$in : ids}}, {delete:false})
            req.flash('success', `Khôi Phục ${ids.length} Sản Phẩm Thành Công`);
            break;
        default:
            break;
    }
    res.redirect("back");
}

// [PATCH] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.deleteOne({_id : id});
    req.flash('success', `Đã Xóa Vĩnh Viễn Sản Phẩm Thành Công`);
    res.redirect("back");
}

module.exports.Restore = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({_id : id}, {delete:false});
    req.flash('success', `Khôi Phục Sản Phẩm Thành Công`);
    res.redirect("back");
}