const { body } = require("express-validator");
const { compareSync } = require("bcrypt");
const { User } = require("../database/models");

module.exports = [
    body("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("Debe ser un email válido"),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .bail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: req.body.email } });

            if (!user || !compareSync(value, user.password)) {
                throw new Error("Credenciales inválidas");
            }

            // Guarda el usuario en la request
            req.userLogged = user;

            return true;
        })
];
