const { body } = require("express-validator");
const {compareSync} = require("bcrypt");
const { User } = require("../database/models");

async function comparePass(pass, hash) {
    //console.log("hash:", hash);
    //console.log("pass:", pass);
    return await bcrypt.compare(pass, hash);
}

module.exports = [
    body("password")
        .custom((value, { req }) => {
            if (!value || !req.body.email) {
                return false;
            }
            return true;
        })
        .withMessage("Todos los campos son obligatorios")
        .bail()
        .custom(async (value, { req }) => {
            return User.findOne({
                where: {
                    email: req.body.email,
                },
            })
                .then((user) => {
                    if (!user || !compareSync(value, user.password)) {
                        return Promise.reject();
                    }
                })
                .catch(() => Promise.reject("Credenciales inválidas"));
        })
];
