const { log, profile } = require('console');
const fs = require('fs');

const { readFile, writeFile } = require('../data/fileSync');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'public/images/users' });
const { validationResult } = require("express-validator");
const { name } = require('ejs');
const { title } = require('process');
const express = require('express');



const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'Iniciar sesion' });
    },

    processLogin: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            const email = req.body.email;
    
            if (errors.array().length > 0) {
                return res.render('./users/login', {
                    title: 'inicio de sesion',
                    errors: errors.mapped(),
                    email
                });
            }
    
            const users = JSON.parse(readFile('users.json'));
            const user = users.find(user => user.email === email);
    
            if (!user) {
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
    
            // Espera a que la sesión se guarde
            await new Promise(resolve => req.session.save(resolve));
    
            // Verifica la sesión después de guardar
            if (req.session.user) {
                return res.render('./users/profile', {
                    ...user,
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
        const users = JSON.parse(readFile('users.json'));
        const id = req.params.id;
        const user = users.find(user => user.id == id);
        console.log(req.session.user);

        res.render('users/profile', {...user, title: "Perfil"} );
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
    
        res.render('./users/profile', {...user, title: "Perfil"});
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