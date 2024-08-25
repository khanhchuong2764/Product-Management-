module.exports.createPost = (req, res,next) => {
    if (!req.body.title) {
        req.flash('error', `Vui lòng nhập tiêu đề danh mục sản phẩm`);
        res.redirect("back");
        return;
    }
    if (req.body.title.length < 4) {
        req.flash('error', `Vui lòng nhập tiêu đề danh mục ít nhất 4 ký tự`);
        res.redirect("back");
        return;
    }
    next();
}