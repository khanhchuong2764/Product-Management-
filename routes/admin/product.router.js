const express = require('express')
const router = express.Router();
const multer  = require('multer');
const StorageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: StorageMulter() });
const controller =require("../../controllers/admin/product.controller");
const ValidateProduct = require("../../validate/admin/product.validate");

router.get('/',controller.index);

router.patch('/change-status/:status/:id',controller.ChangeStatus);

router.patch('/changeMulti',controller.ChangeMulti);

router.delete('/delete/:id',controller.deleteItem);

router.get('/create',controller.create);

router.post('/create',upload.single('thumbnail'),ValidateProduct.createPost,controller.createPost);

router.get('/edit/:id',controller.edit);

router.patch('/edit/:id',upload.single('thumbnail'),ValidateProduct.createPost,controller.editPatch);

router.get('/detail/:id',controller.detail);

module.exports = router;