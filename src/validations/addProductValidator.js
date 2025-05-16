const { body } = require("express-validator");
//console.log("*********hasta aca llego");

module.exports = [
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio")
        .bail()
        .trim()
        .isLength({ min: 5 })
        .withMessage("El campo debe tener al menos 5 caracteres."),

    body("description")
        .notEmpty()
        .withMessage("La descripcion es obligatoria")
        .bail()
        .trim()
        .isLength({ min: 20 })
        .withMessage("El campo debe tener al menos 20 caracteres."),
];
