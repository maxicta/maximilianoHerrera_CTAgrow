const { log } = require('console');
const fs = require('fs')

const usersController = {

    login: (req,res) => {
        res.render('./users/login', { title: 'CTAgrowshop' });
    },
    register: (req,res) => {
        res.render('./users/register', { title: 'CTAgrowshop' });
    }
}

module.exports = usersController;