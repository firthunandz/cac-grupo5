// Requerir express
const express = require('express');

// Requerir router
const router = express.Router();

// Requerir express-validator
const {body} = require('express-validator');

// Reglas express-validator
const validations = [
    body('nombre')
        .not()
        .isEmpty()
        .withMessage('El nombre es obligatorio')
        .bail()
        .isLength({min: 3})
        .withMessage('Tiene que tener 3 caracteres'),
];

// Requerir controlador de productos
const productController = require("../../controllers/admin/categoryController");

// CRUD = Create, Read, Update, Delete
router.get("/", productController.admin);
router.get("/create", productController.create);
//         ruta        multer              validator         controlador
router.post("/", validations, productController.store);
router.get("/edit", productController.edit);
router.put("/edit/:id", validations, productController.update);
router.delete("/delete/:id", productController.destroy);

// Exportar modulo router
module.exports = router;