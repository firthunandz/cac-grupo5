// Requerir express-validator
const {validationResult} = require('express-validator');

// Requerir modelo categoria
const model = require('../../models/Category');

const categoryController = {
    admin: async (req, res) => {
        try {
            const categorias = await model.findAll();
            console.log(categorias);
            res.render('admin', {categorias});
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
            const categoria = await model.create(req.body);
            console.log(categoria);

            //redireccionar a la lista de productos
            res.redirect('/admin/productos')

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    edit: async (req, res) => {
        try {
            const categoria = await model.findByPk(req.params.id);

            if(categoria){
                res.render("edit", {values: categoria});
            } else {
                res.status(404).send('El categoria no existe');
            }

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    update: async (req, res) => {
        console.log(req.params, req.body);

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('edit', {
                values: {...req.params, ...req.body},
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
                res.redirect('admin');
            } else {
                res.status(500).send('Error al actualizar el categoria');
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
            res.redirect('admin');
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};
// Exportar modulo controlador de productos
module.exports = categoryController;