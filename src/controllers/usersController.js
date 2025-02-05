const { log } = require('console');
const fs = require('fs');
const { store } = require('./productsControllers');

const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'CTAgrowshop' });
    },
    register: (req,res) => {
        res.render('./users/register', { title: 'CTAgrowshop' });
    },

    storeUser: (req,res) => {
        const users = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));
        const newUser = req.body;
        users.push(newUser);
        fs.writeFileSync('./data/users.json',JSON.stringify(users,null,2),'utf-8');
        res.render('users/login');
    }
}

module.exports = usersController;