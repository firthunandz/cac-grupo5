// Requerir express
const express = require('express');

// Requerir router
const router = express.Router();

// Requerir multer
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

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
    body('precio')
        .not()
        .isEmpty()
        .withMessage('El precio es obligatorio'),
];

// Requerir controlador de productos
const productController = require("../../controllers/admin/productController");

// CRUD = Create, Read, Update, Delete
router.get("/", productController.admin);
router.get("/create", productController.create);
//         ruta        multer              validator         controlador
router.post("/", upload.single("imagen"), validations, productController.store);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.edit);
router.delete("/delete/:id", productController.destroy);

// Exportar modulo router
module.exports = router;