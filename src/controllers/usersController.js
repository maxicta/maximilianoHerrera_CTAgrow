const { User } = require("../database/models");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { where } = require("sequelize");
const { name } = require("ejs");

const usersController = {
    login: (req, res) => {
        res.render("./users/login", { title: "Iniciar sesion" });
    },

    processLogin: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            const email = req.body.email;
            //console.log("email desde processLogin", req.body);

            if (!errors.isEmpty()) {
                console.log(errors.mapped());

                return res.render("./users/login", {
                    title: "inicio de sesion",
                    errors: errors.mapped(),
                    email,
                });
            }
            const user = await User.findOne({ where: { email } });
            console.log(user);
            
            const { name,surname, id, image } = user;
            //console.log(user);

            if (!user) {
                console.log("Usuario no encontrado desde processLogin");

                return res.render("./users/login", {
                    title: "Iniciar sesion",
                    error: "Usuario no encontrado",
                });
            }

            // Guarda los datos en la sesión
            req.session.user = {
                email: user.email,
                name: user.name,
                id: user.id,
            };
            console.log("usuario logueado desde processLogin");
            //console.log(name);

            // Espera a que la sesión se guarde
            await new Promise((resolve) => req.session.save(resolve));

            // Verifica la sesión después de guardar
            if (req.session.user) {
                //console.log(req.session.user);

                return res.render("./users/profile", {
                    user,
                    image,
                    isLoggedIn: true,
                    title: "Perfil",
                });
            } else {
                return res.status(401).json({
                    error: "No hay sesión iniciada",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/users/login");
    },

    register: (req, res) => {
        res.render("./users/register", { title: "Registra tus datos" });
    },

    storeUser: (req, res, next) => {
        try {
            //const id = uuid.v4();
            const { name, email, surname, password } = req.body;
            const errores = validationResult(req);
            //console.log(errores);

            if (errores.array().length > 0) {
                res.render("users/register", {
                    title: "registre sus datos",
                    errores: errores.mapped(),
                    name,
                    surname,
                    email,
                    password,
                });
            } else {
                console.log("proces true desde store");
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) {
                        throw new Error("Error en el hash");
                    }
                    await User.create({
                        name,
                        surname,
                        email,
                        password: hash,
                        image: 'imageDefault.png'
                    });
                    res.render("users/login", { title: "Iniciar sesion" });
                });
            }
        } catch (error) {
            console.error("Error al almacenar el usuario:", error);
            res.status(500).send("Error al almacenar el usuario");
        }
    },

    profile: (req, res) => {
        // Primero verifica si hay sesión
        if (!req.session.user) {
            return res.redirect("/users/login");
        }

        // Lee el archivo users.json
        const id = req.params.id;
        // Busca el usuario
        const user = User.findByPk(id);

        // Si no encuentra el usuario, redirige a login
        if (!user) {
            return res.redirect("/users/login");
        }

        // Renderiza la vista con el usuario y la sesión
        res.render("users/profile", {
            user: user,
            sessionUser: req.session.user,
            title: "Perfil",
        });
    },

    editProfile: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);

            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const { name, surname, email } = user;
            res.render("./users/profileEdit", {
                id,
                name,
                surname,
                email,
                title: "Editar perfil",
            });
        } catch (error) {
            console.error("Error:", error);
            throw new Error(error.message);
        }
    },

    updateProfile: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
    
            const { name, surname, email } = req.body;
    
            await user.update({
                name,
                surname,
                email
            })
            ;
    
            res.render("./users/profile", { user, title: "Perfil" });
            
        } catch (error) {
            console.error("Error:", error);
            throw new Error(error.message);
        }
    },

    deleteProfile: async (req, res) => {
        try {
            const id = req.params.id;
            await User.destroy({
                where: {
                    id:id
                }
            })
            console.log("desde deleteProfile" , id);
    
            
            res.redirect("/users/register");
            
        } catch (error) {
            console.error("Error:", error);
            throw new Error(error.message);            
        }
    },
};

module.exports = usersController;
