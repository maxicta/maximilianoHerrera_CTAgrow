const { User } = require("../database/models");
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const { where } = require("sequelize");




const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'Iniciar sesion' });
    },

    processLogin: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            const email = req.body.email;
            //console.log("email", req.body);
            
    
            if (errors.array().length > 0) {
                console.log(errors.mapped());
                
                return res.render('./users/login', {
                    title: 'inicio de sesion',
                    errors: errors.mapped(),
                    email
                });
            }
            const user = User.findOne({ where: {email}});
            const {name, id, image} = user;
    
            if (!user) {
                console.log('Usuario no encontrado desde processLogin');
                
                return res.render('./users/login', {
                    title: 'Iniciar sesion',
                    error: 'Usuario no encontrado'
                });
            }
    
            // Guarda los datos en la sesión
            req.session.user = {
                email: user.email,
                name: user.name,
                id: user.id
            };
            console.log("usuario logueado desde processLogin");
            console.log(req.session.user);
            
    
            // Espera a que la sesión se guarde
            await new Promise(resolve => req.session.save(resolve));
    
            // Verifica la sesión después de guardar
            if (req.session.user) {
                return res.render('./users/profile', {
                    user,
                    isLoggedIn: true,
                    title: 'Perfil'
                });
            } else {
                return res.status(401).json({ 
                    error: 'No hay sesión iniciada' 
                });
            }
        } catch (error) {
            next(error);
        }
    }


    /* processLogin: (req, res, next) => {
        const { email } = req.body;
        const users = JSON.parse(readFile('users.json'));
        const user = users.find((user) => user.email === email);
        const {name, id } = user;

        req.session.user = { email, name, id };
        //console.log("body", req.body);
        //return res.send(user);
        
        res.redirect(`/users/profile/${id}`);
        
        } */
        
    ,
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/users/login");
    },


    register: (req,res) => {
        res.render('./users/register', { title: 'Registra tus datos' });

    },

    storeUser: (req,res, next) => {
        try{
            //const id = uuid.v4();
            const { name, email, password} = req.body;
            const errores = validationResult(req);
            //console.log(errores);
            

            if (errores.array().length > 0) {
                res.render("users/register",{
                    title:'registre sus datos',
                    errores: errores.mapped(),
                    name,
                    email,
                    password,
                });
            }else{
                    console.log('proces true desde store');
                    bcrypt.hash(password, 10, async (err, hash) => {
                        if (err) {
                            throw new Error('Error en el hash')
                        }
                        await User.create({
                            name,
                            email,
                            password: hash
                        })
                        res.render('users/login', { title: 'Iniciar sesion' });
                    })
                }
        }catch(error){
            console.error('Error al almacenar el usuario:', error);
        res.status(500).send('Error al almacenar el usuario');
        }
    },

    profile: (req, res) => {
        // Primero verifica si hay sesión
        if (!req.session.user) {
            return res.redirect('/users/login');
        }
    
        // Lee el archivo users.json
        const id = req.params.id;
        // Busca el usuario
        const user = User.findByPk(id)
        
        // Si no encuentra el usuario, redirige a login
        if (!user) {
            return res.redirect('/users/login');
        }
    
        // Renderiza la vista con el usuario y la sesión
        res.render('users/profile', {
            user: user,
            sessionUser: req.session.user,
            title: "Perfil"
        });
    },

    editProfile: (req,res) => {
        const users = JSON.parse(readFile('users.json'));
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        res.render('./users/profileEdit', {...user, title: "Editar perfil"});

    },

    updateProfile: (req,res) => {
        const users = JSON.parse(readFile('users.json'));
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
    
        res.render('./users/profile', {user, title: "Perfil"});
    },

    deleteProfile: (req,res) => {
        const users = parseFile(readFile('users.json'));
        const id = req.params.id;
        const userModify = users.filter(user => user.id.toString() !== id);
        console.log(userModify);
        

        writeFile('users.json', userModify);
        res.redirect('/users/register');

    }
}

module.exports = usersController;