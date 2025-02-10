var express = require('express');
var router = express.Router();
const {login, register, storeUser, profile, editProfile, updateProfile, deleteProfile } = require('../controllers/usersController');
/* GET users listing. */

router.get('/login', login);

router.get('/register', register);
router.post('/register', storeUser);

router.get('/profile/:id', profile);
router.get('/editprofile/:id', editProfile);
router.put('/profile/:id', updateProfile);
router.delete('/profile/:id', deleteProfile);



module.exports = router;
