const {body} = require('express-validator');
const {readFile, parseFile} = require('../data/fileSync.js');
const path = require("path");
const {log} = require('console');
const directory = path.join(__dirname, "../data/users.json");
const users = parseFile(readFile(directory));

module.exports = [
    
    body('name').notEmpty().withMessage('El campo no puede estar vacio').bail().trim()
    .isLength({min: 5}).withMessage('El campo debe tener al menos 5 caracteres').bail(),
    
    body('password').notEmpty().withMessage('El campo no puede estar vacio').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/).withMessage("No cumple con los requisitos, debe contener una mayuscula, minuscula, un valor numerico y un caracter especial. La longitud debe ser entre 8 y 20 caracteres").bail(),
    
    body('email').notEmpty().withMessage('El campo no puede estar vacio').bail().trim()
    .isEmail().withMessage('El campo debe ser un email').bail()
    .custom(value => {
        console.log("value:",value);
        const user = users.find(user => user.email == value);
        console.log('paso por register validator','user',user,'value',value)
        
        if (user) {
            console.log('El email ya está registrado');
            throw new Error('El email ya está registrado');
        }
        return false;
    }).bail(),
]