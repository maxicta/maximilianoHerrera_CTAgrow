const { log, profile } = require('console');
const fs = require('fs');

const { readFile, writeFile } = require('../data/fileSync');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'public/images/users' });
const { validationResult } = require("express-validator");
const { name } = require('ejs');


const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'Iniciar sesion' });
    },

    /* processLogin: (req,res,next) => {
        const {email} = req.body;
        const users = readFile('users.json');
        const errors = validationResult(req);
        //const user = users.find(user => user.email == email);
        console.log(req.body)
        if (errors.array().length > 0) {
            res.render('./users/login', {
                title: 'inicio de sesion',
                errors: errors.mapped(),
                email,
            });
        }else{
            //email = req.body
            const users = readFile('users.json');
            const user = users.find(user => user.email === email);

            const { email, name , id } = user;
            console.log(name);
            req.session.user = { email, name, id };

            if(user){
                res.render('./users/profile', {...user});
            }else{
                res.render('./users/login', { title: 'Iniciar sesion' });
            }
        }
    }, */


    processLogin: (req, res, next) => {
        const { email } = req.body;
        const users = readFile('users.json');
        const errores = validationResult(req);
    
        if (errores.array().length > 0) {
            res.render("users/login", {
                errores: errores.mapped(),
                email,
            });
        } else {
            const user = users.find((user) => user.email === email);
    
            if (user) {
                const { email, lastName, id } = user; 
    
                req.session.user = { email, name, id };
                //console.log("body", req.body);
    
                if (req.body.recuerdame) {
                    res.cookie("user", { email, lastName, id }, { maxAge: 1000 * 60 * 30 });
                }
                res.redirect(`/users/profile/${id}`);
            } else {
                res.render("users/login", {
                    errores: { email: { msg: "Usuario no encontrado" } },
                    email,
                });
            }
        }
    },
    


    register: (req,res) => {
        res.render('./users/register', { title: 'Registra tus datos' });

    },

    storeUser: (req,res) => {
        try{
            //const id = uuid.v4();
            const users = readFile('users.json');
            const {name,
                lastName,
                email,
                password} = req.body;
            users.push({
                id : uuid.v4(),
                name,
                lastName,
                email,
                password : bcrypt.hashSync(password, 10),
                token : null,
                validate : false,
                lock : false,
                rol : 'user',
                image : 'imageDefault.png'
            });
            writeFile('users.json', users);
            res.render('users/login', { title: 'Iniciar sesion' });
        }catch(error){
            console.error('Error al almacenar el usuario:', error);
        res.status(500).send('Error al almacenar el usuario');
        }
    },

    profile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        //console.log(user);
        
        
        res.render('./users/profile', {...user, title: "Perfil"} );
    },

    editProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        res.render('./users/profileEdit', {...user, title: "Editar perfil"});

    },

    updateProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        
        const {name,
            lastName,
            email } = req.body;

            const usersModify = users.map(user => {
                if(user.id.toString() === id ){
                    user.name = name.trim();
                    user.lastName = lastName.trim();
                    user.email = email.trim();
                    user.image = req.file ? req.file.filename : user.image
                }
                return user
            })
            
            writeFile('users.json', usersModify);
    
        res.render('./users/profile', {...user});
    },

    deleteProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const userModify = users.filter(user => user.id.toString() !== id);
        console.log(userModify);
        

        writeFile('users.json', userModify);
        res.redirect('/users/register');

    }
}

module.exports = usersController;