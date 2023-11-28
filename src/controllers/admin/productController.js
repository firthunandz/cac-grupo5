// Requerir Path
const path = require('path');

// Requerir Sharp
const sharp = require('sharp');

// Requerir express-validator
const {validationResult} = require('express-validator');


const productController = {
    admin: (req, res) => res.render("admin", { layout: 'layouts/adminLayout'}),
    create: (req, res) => res.render("create"),
    store: (req, res) => {
        console.log(req.body, req.file);

        // Validar las reglas
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('create', {
                values: req.body,
                errors: errors.array(),
            });
        }

        if(req.file){
            sharp(req.file.buffer)
                .resize()
                .toFile(path.resolve(__dirname, '../../../public/uploads/image.jpg'))
        }
        res.send('Crear producto');
    },
    edit: (req, res) => res.render("edit"),
    destroy: (req, res) => res.send("Producto borrado")
};

// Exportar modulo controlador de productos
module.exports = productController;