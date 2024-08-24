const express = require('express')

const router = express.Router();

const multer  = require('multer');

const fileUpload  = multer();


const UploadCloud = require("../../middleware/admin/uploadCloud.middleware");

const controller =require("../../controllers/admin/product.controller");

const ValidateProduct = require("../../validate/admin/product.validate");

router.get('/',controller.index);

router.patch('/change-status/:status/:id',controller.ChangeStatus);

router.patch('/changeMulti',controller.ChangeMulti);

router.delete('/delete/:id',controller.deleteItem);

router.get('/create',controller.create);

router.post('/create',fileUpload.single('thumbnail'),UploadCloud.upload,ValidateProduct.createPost,controller.createPost);

router.get('/edit/:id',controller.edit);

router.patch('/edit/:id',fileUpload.single('thumbnail'),UploadCloud.upload,ValidateProduct.createPost,controller.editPatch);

router.get('/detail/:id',controller.detail);

module.exports = router;

    