const ProductCategory = require("../../model/product-category.model");
const Systemconfig = require("../../config/system");
const FillterStatusHelper = require("../../helper/fillterstatus");
const SearchHelper =  require("../../helper/search");
//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    const find = {
        delete:false
    }

    // FillterStatus
    const FillterStatus = FillterStatusHelper(req.query);
    if (req.query.status){
        find.status = req.query.status;
    }
    // End FillterStatus

    // Search
    const ObjectSearch = SearchHelper(req.query);
    let keyword =ObjectSearch.keyword;
    if (req.query.keyword) {
        find.title = ObjectSearch.regex;
    }
    //End Search



    const records = await ProductCategory.find(find);
    res.render("admin/pages/product-category/index",{
        pageTitle:"Danh Mục Sản Phẩm",
        records:records,
        FillterStatus:FillterStatus,
        keyword:ObjectSearch.keyword
    })
}
//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    const find = {
        delete:false
    }
    const records = await ProductCategory.find(find);
    const createTree = (records,parentId = "") => {
        const arr = [];
        records.forEach(item => {
            if (item.parentID == parentId ) {
                const newitem = item;
                const chilrend = createTree(records,item.id);
                if (chilrend.length > 0) {
                    newitem.chilrend = chilrend;
                }
                arr.push(newitem);
            }
         });
         return arr;
    }
    const newrecords = createTree(records);
    res.render("admin/pages/product-category/create",{
        pageTitle:"Tạo Mới Danh Mục",
        records:newrecords
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


// [PATCH] /admin/product-category/change-status/:status/:id
module.exports.ChangeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        
        await ProductCategory.updateOne({_id:id}, {status:status});
        req.flash('success', 'Thay Đổi Trạng Thái Sản Phẩm Thành Công');
        res.redirect("back");
    } catch (error) {
        res.redirect(`${Systemconfig.prefixAdmin}/product-category`);
    }
}

// [PATCH] /admin/product-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await ProductCategory.updateOne({_id : id}, 
    {
        delete:true,
        DeleteDat:new Date()
    });
    req.flash('success', `Xóa Danh Mục Sản Phẩm Thành Công`);
    res.redirect("back");
}