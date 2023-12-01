// Requerir bcryptjs
const bcryptjs = require('bcryptjs');

// Requerir validacion de reglas
const {validationResult} = require('express-validator');

// Requerir modelo
const model = require('../../models/User');

// Controladores de autenticacion
const authController = {
    login: (req, res) => res.render("login"),
    postLogin: async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render('login', {
                values: req.body,
                errors: errors.array(),
            });
        }
        try {
            const user = await model.findOne({
                where: {
                    email: req.body.email,
                }
            });
            // Saber si no existe el usuario
            if (!user){
                res.render('login', {
                    values: req.body,
                    errors: [{msg: 'El correo y/o contraseña son incorrectos'}]
                })
            } else if (!(await bcryptjs.compare(req.body.password, user.password))) {
                res.render('login', {
                    values: req.body,
                    errors: [{msg: 'El correo y/o contraseña son incorrectos'}]
                })
            } else {
                res.send('login');
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        };
    },
    register: (req, res) => res.render("register"),
    postRegister: async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render('register', {
                values: req.body,
                errors: errors.array(),
            });
        }

        try {
            const user = await model.create(req.body);
            console.log(req.body, user);
            res.send("registrado");
        } catch (error) {
            console.log(error);
            res.send(error);
        }

    },
    logout: (req, res) => res.render("register"),
};

// Exportar modulo
module.exports = authController;