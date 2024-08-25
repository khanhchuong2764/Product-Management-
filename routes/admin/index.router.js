
const dashboardRouter = require("./dashboard.router");
const ProductRouter = require("./product.router");
const RestoreRouter = require("./restore.router");
const Systemconfig = require("../../config/system");
const ProductCategory = require("./product-category.router");

module.exports = (app) => {
    const Path_Admin = Systemconfig.prefixAdmin;
    app.use(`${Path_Admin}/dashboard`, dashboardRouter )
    app.use(`${Path_Admin}/product`, ProductRouter )
    app.use(`${Path_Admin}/restore`, RestoreRouter )
    app.use(`${Path_Admin}/product-category`, ProductCategory )
}