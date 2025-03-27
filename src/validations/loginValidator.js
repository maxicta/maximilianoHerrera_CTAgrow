const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../database/models");
const { where } = require("sequelize");

async function comparePass(pass, hash) {
    //console.log("hash:", hash);
    //console.log("pass:", pass);
    return await bcrypt.compare(pass, hash);
}

module.exports = [
    body("email")
        .notEmpty()
        .withMessage("El campo no puede estar vacio")
        .bail()
        .isEmail()
        .withMessage("El campo debe ser un email")
        .bail()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ where: { email: value } });

                if (!user) {
                    throw new Error("Las credenciales no son validas");
                }
                //console.log("email validado");
                return true;
            } catch {
                throw new Error("Las credenciales no son validas");
            }
        })
        .bail(),

    body("password")
        .notEmpty()
        .withMessage("El campo no puede estar vacio")
        .bail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: req.body.email }})
            //console.log('pass desde custom', user.password);
            //console.log('user desde custom', user);
            
            
            const result = await comparePass(value, user.password);
            //console.log("user.pass", user.password);
            //console.log("value desde compare", value);

            if (!result) {
                throw new Error(
                    "Las credenciales no son validas desde loginValidator"
                );
            }

            //console.log("password validado");
            //console.log("resultado de la comparación", result);

            return true;
        })
        .bail(),
];
