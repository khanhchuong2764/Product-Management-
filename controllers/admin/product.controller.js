const Product = require("../../model/product.model");
const FillterStatusHelper = require("../../helper/fillterstatus");
const ObjectSearchHelper = require("../../helper/search");
const PaginationHelper =require("../../helper/pagination");
const Systemconfig = require("../../config/system");
// [GET] /admin/product/
module.exports.index = async (req, res) => {
    const find = {
        delete:false
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
    const record =await Product.find(find).sort({posittion:"desc"}).limit(ObjectPagination.limititem).skip(ObjectPagination.skip);
    res.render("admin/pages/product/index",{
        pageTitle:"Trang Danh Sach San Pham",
        record:record,
        FillterStatus:FillterStatus,
        keyword:keyword,
        ObjectPagination:ObjectPagination
    })
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.ChangeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        
        await Product.updateOne({_id:id}, {status:status});
        req.flash('success', 'Thay Đổi Trạng Thái Sản Phẩm Thành Công');
        res.redirect("back");
    } catch (error) {
        res.redirect(`${Systemconfig.prefixAdmin}/product`);
    }
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
            await Product.updateMany({_id: {$in : ids}}, {delete:"true"})
            req.flash('success', `Đã Xóa Thành Công ${ids.length} Sản Phẩm `);
            break;
        case "change-position":
            for(let item of ids) {
                let [id,position] = item.split("-");
                console.log(id);
                position=parseInt(position);
                await Product.updateOne({_id:id}, {posittion:position});
            }
            req.flash('success', `Thay Đổi Vị Trí ${ids.length} Sản Phẩm Thành Công`);
            break;
        default:
            break;
    }
    res.redirect("back");
}

// [PATCH] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({_id : id}, 
    {
        delete:true,
        DeleteDat:new Date()
    });
    req.flash('success', `Xóa Sản Phẩm Thành Công`);
    res.redirect("back");
}
// [GET] /admin/product/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product/create",{
        pageTitle:"Trang Them Moi San Pham"
    })
}
// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.posittion == "") {
        const countProduct = await Product.countDocuments();
        req.body.posittion = countProduct + 1;
    }else {
        req.body.posittion = parseInt(req.body.posittion);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const product =new Product(req.body);
    product.save();
    req.flash('success', `Thêm Mới Sản Phẩm Thành Công`);
    res.redirect(`${Systemconfig.prefixAdmin}/product`);
}
// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            delete:false,
            _id: req.params.id
        }
        const record = await Product.findOne(find);
        res.render("admin/pages/product/edit",{
            pageTitle:"Chỉnh Sửa Sản Phẩm",
            record:record
        })
    } catch (error) {
        req.flash('error', `Không Tìm Thấy Sản Phẩm`);
        res.redirect(`${Systemconfig.prefixAdmin}/product`);
    }
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id=req.params.id;
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        if (req.body.posittion == "") {
            const countProduct = await Product.countDocuments();
            req.body.posittion = countProduct + 1;
        }else {
            req.body.posittion = parseInt(req.body.posittion);
        }
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        await Product.updateOne({_id: id},req.body);
        req.flash('success', `Cập Nhật Sản Phẩm Thành Công`);
        res.redirect(`back`);
    } catch (error) {
        req.flash('error', `Cập Nhật Sản Phẩm Thất Bại`);
        res.redirect(`back`);
    }
}

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            delete:false,
            _id: req.params.id
        }
        const record = await Product.findOne(find);
        res.render("admin/pages/product/detail",{
            pageTitle:record.title,
            product:record
        })
    } catch (error) {
        req.flash('error', `Không Tìm Thấy Sản Phẩm`);
        res.redirect(`${Systemconfig.prefixAdmin}/product`);
    }
}