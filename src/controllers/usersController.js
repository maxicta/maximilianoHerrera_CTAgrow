const { log, profile } = require('console');
const fs = require('fs');
const { store, edit } = require('./productsControllers');
const { readFile, writeFile } = require('../data/fileSync');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'public/images/users' });

const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'Iniciar sesion' });
    },

    processLogin: (req,res) => {
        const users = readFile('users.json');
        const {email, password} = req.body;
        const user = users.find(user => user.email === email && user.password === password);
        if(user){
            res.render('./users/profile', {...user});
        }else{
            res.render('./users/login');
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
        console.log(user);
        
        
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
            email,
            password} = req.body;
            user.name = name;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            
            upload.single(user.image);


            
            writeFile('users.json', users);
        
        
        res.render('./users/profile', {...user});
    },

    deleteProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const userModify = users.filter(user => user.id !== id);
        console.log(userModify);
        

        writeFile('users.json', userModify);
        res.redirect('/users/login');

    }
}

module.exports = usersController;