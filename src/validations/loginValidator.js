const { body } = require('express-validator');
const { readFile, parseFile } = require('../data/fileSync.js');
const path = require("path");
const directory = path.join(__dirname, "../data/users.json");
const users = parseFile(readFile(directory));
const bcrypt = require("bcrypt");

async function comparePass(pass, hash) {
    console.log('hash:', hash);
    console.log('pass:', pass);
    return await bcrypt.compare(pass, hash);
    
    
}

module.exports = [
    body('email').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isEmail().withMessage('El campo debe ser un email').bail()
        .custom(value => {
            const user = users.find(user => user.email === value);
            
            if (!user) {
                
                throw new Error('Las credenciales no son validas');
            }
            console.log("email validado");
            return true;
        }).bail(),
        
    body('password').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/).withMessage("No cumple con los requisitos, debe contener una mayuscula, minuscula, un valor numerico y un caracter especial. La longitud debe ser entre 8 y 20 caracteres").bail()
        .custom(async (value, { req }) => {
            const user = users.find(user => user.email === req.body.email);
            
            const result = await comparePass(value, user.password);
            console.log('user.pass',user.password);
            console.log('value desde compare', value);
            

            if (!result) {
                throw new Error('Las credenciales no son validas desde loginValidator');
            }
            
            console.log("password validado");
            console.log("resultado de la comparación", result);

    
            return true;
        }).bail()
]