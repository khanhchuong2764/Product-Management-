const express = require('express')
const router = express.Router();

const controller =require("../../controllers/admin/restore.controller");

router.get('/',controller.index);


router.patch('/changeMulti',controller.ChangeMulti);

router.delete('/delete/:id',controller.deleteItem);

router.patch('/:id',controller.Restore);

module.exports = router;