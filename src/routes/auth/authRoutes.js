// Requerir express
const express = require("express");
// Requerir Router
const router = express.Router();

// Requerir modelo-usuario
const model = require('../../models/User');
// Requerir express-validator
const {body} = require('express-validator');

// Reglas register
const registerValidations = [
    body("email")
        .isEmail()
        .withMessage("Ingrese una dirección de correo electrónico válida")
        .bail()
        .custom((value, { req }) => {
            return new Promise(async (resolve, reject) => {
            try {
                const user = await model.findOne({
                    where: {
                        email: value,
                    },
                });
    
                if (user) {
                    console.log(user);
                    return reject();
                } else {
                    return resolve();
                }
            } catch (error) {
                console.log(error);
            }
            });
        })
        .withMessage("Dirección de correo electrónico duplicada"),
    body("password")
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("La contraseña debe tener ...")
        .bail()
        .custom((value, { req }) => value === req.body.password_confirmation)
        .withMessage("Las contraseñas no coinciden"),
];

// Reglas login
const loginValidations = [
    body("email")
        .isEmail()
        .withMessage("Ingrese una dirección de correo electrónico válida"),
    body("password")
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("La contraseña debe tener ...")
        .bail()
        .custom((value, { req }) => value === req.body.password_confirmation)
        .withMessage("Las contraseñas no coinciden"),
];

// Requerir controlador
const authController = require("../../controllers/auth/authController");

// Rutas
router.get('/login', authController.login);
router.post('/login', loginValidations, authController.postLogin);
router.get('/register', authController.register);
router.post('/register', registerValidations, authController.postRegister);
router.get('/logout', authController.logout);

// Exportar modulo
module.exports = router;