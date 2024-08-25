const express = require('express')

const router = express.Router();

const multer  = require('multer');

const fileUpload  = multer();

const UploadCloud = require("../../middleware/admin/uploadCloud.middleware");

const controller =require("../../controllers/admin/product-categpry.controller");

const ValidateProductCategory = require("../../validate/admin/product-category.validate");

router.get('/',controller.index);

router.get('/create',controller.create);

router.post('/create',fileUpload.single('thumbnail'),UploadCloud.upload,ValidateProductCategory.createPost,controller.createPost);

router.patch('/change-status/:status/:id',controller.ChangeStatus);


router.delete('/delete/:id',controller.deleteItem);

module.exports = router;

    