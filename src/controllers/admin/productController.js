const fs = require('fs');

// Requerir Path
const path = require('path');

// Requerir Sharp
const sharp = require('sharp');

// Requerir express-validator
const {validationResult} = require('express-validator');

// Requerir modelo Producto
const model = require('../../models/Product');

const productController = {
    //admin: (req, res) => res.render("admin", { layout: 'layouts/adminLayout'}),
    admin: async (req, res) => {
        try {
            const productos = await model.findAll();
            console.log(productos);
            res.render('admin', {productos});
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    create: (req, res) => res.render("create"),
    store: async (req, res) => {
        console.log(req.body, req.file);

        // Validar las reglas
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('create', {
                values: req.body,
                errors: errors.array(),
            });
        }

        try {
            const producto = await model.create(req.body);
            console.log(producto);

            // Subir la imagen solo si el producto esta creado.
            if(producto && req.file){
                sharp(req.file.buffer)
                    .resize()
                    .toFile(path.resolve(
                        __dirname,
                        `../../../public/uploads/productos/producto_${producto.id}.jpg`
                        )
                    );
            }

            //redireccionar a la lista de productos
            res.redirect('/admin/productos')

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    edit: async (req, res) => {
        // try {
        //     const producto = await model.findByPk(req.params.id);

        //     if(producto){
        //         res.render("edit", {values: producto});
        //     } else {
        //         res.status(404).send('El producto no existe');
        //     }

        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send(error);
        // }
        res.render('edit');
    },
    update: async (req, res) => {
        console.log(req.params, req.body);

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('edit', {
                values: req.body,
                errors: errors.array()
            });
        }

        try {
            const affected = await model.update(req.body, {
                where: {
                    id: req.params.id
                }
            });

            if (affected[0] == 1){
                if(producto && req.file){
                    sharp(req.file.buffer)
                        .resize()
                        .toFile(path.resolve(
                            __dirname,
                            `../../../public/uploads/productos/producto_${req.params.id}.jpg`
                            )
                        );
                }

            res.redirect('admin');

            } else {
                res.status(500).send('Error al actualizar el producto');
            }

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    destroy: async (req, res) => {
        try {
            const result = await model.destroy({
                where: {
                    id: req.params.id,
                }
            });
            console.log(result);

            if(result == 1){
                fs.unlink(path.resolve(
                    __dirname,
                    `../../../public/uploads/productos/producto_${req.params.id}.jpg`)
                ),
                (error) => {
                    if(error){
                        console.log(error);
                    }
                }
            }
            res.redirect('admin');
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};
// Exportar modulo controlador de productos
module.exports = productController;