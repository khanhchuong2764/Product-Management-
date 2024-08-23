const express = require('express')

const router = express.Router();

const multer  = require('multer');

const cloudinary = require('cloudinary').v2

const streamifier = require('streamifier')

const fileUpload  = multer();

cloudinary.config({ 
    cloud_name: 'dewvzrqlt', 
    api_key: '547491939699499', 
    api_secret: '7S1klq8kOXuLFpUnW9R-RW0mnF4'
});

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