const { body } = require('express-validator');
const { User } = require("../database/models");

module.exports = [

    body('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .trim()
        .isLength({ min: 4 }).withMessage('El campo nombre debe tener al menos 4 caracteres'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/)
        .withMessage("La contraseña no cumple con los requisitos, debe contener una mayúscula, minúscula, un número y un carácter especial. La longitud debe ser entre 8 y 20 caracteres"),

    body('password2')
        .notEmpty().withMessage('La confirmación de contraseña es obligatoria').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('El email debe ser válido').bail()
        .custom(value => {
            return User.findOne({ where: { email: value } })
                .then(user => {
                    if (user) {
                        return Promise.reject();
                    }
                });
        }).withMessage("El email ya se encuentra registrado")
];
