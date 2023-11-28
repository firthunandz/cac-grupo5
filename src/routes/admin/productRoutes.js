const express = require('express');
const router = express.Router();

const productController = require("../../controllers/admin/productController");

// CRUD = Create, Read, Update, Delete

router.get("/", productController.admin);
router.get("/create", productController.create);
router.post("/create", productController.create);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.edit);
router.delete("/delete/:id", productController.destroy);

module.exports = router;