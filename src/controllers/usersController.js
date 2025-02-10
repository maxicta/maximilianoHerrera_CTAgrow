const { log, profile } = require('console');
const fs = require('fs');
const { store, edit } = require('./productsControllers');
const { readFile, writeFile } = require('../data/fileSync');
const uuid = require('uuid');

const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'CTAgrowshop' });
    },
    register: (req,res) => {
        res.render('./users/register', { title: 'CTAgrowshop' });
    },

    storeUser: (req,res) => {
        const id = uuid.v4();
        const users = readFile('users.json');
        const {firtsName,
            lastName,
            email,
            password} = req.body;
        users.push({
            firtsName,
            lastName,
            email,
            password,
            id});
        writeFile('users.json', users);
        res.render('users/login');
    },

    profile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id === id);
        
        res.render('./users/profile', {...user} );
    },

    editProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id === id);
        res.render('./users/profileEdit', {...user});

    },

    updateProfile: (req,res) => {
        const users = readFile('users.json');
        const id = req.params.id;
        const user = users.find(user => user.id === id);
        const {firtsName,
            lastName,
            email,
            password} = req.body;
        user.firtsName = firtsName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        writeFile('users.json', users);
        console.log(req.body);
        
        res.render('./users/profile', {...user});
    },

    deleteProfile: (req,res) => {

    }
}

module.exports = usersController;