var express = require('express');
var router = express.Router();
const {login, register, storeUser} = require('../controllers/usersController');
/* GET users listing. */

router.get('/login', login);

router.get('/register', register);
router.post('/register', storeUser);


module.exports = router;
