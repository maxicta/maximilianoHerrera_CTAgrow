var express = require('express');
var router = express.Router();
const {login, register, storeUser, profile, processLogin, logout, editProfile, updateProfile, deleteProfile } = require('../controllers/usersController');
const loginVerify = require('../middlewares/loginValidate.js');
const upload = require('../middlewares/uploadUser.js');
const loginValidator = require('../validations/loginValidator.js');
const registerValidator = require('../validations/registerValidator.js');

/* GET users listing. */
// /users
router.get('/login', loginVerify, login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);

router.get('/register', register);
router.post('/register', registerValidator, storeUser);


router.get('/profile/:id', profile);
router.get('/editprofile/:id', editProfile);
router.put('/profile/:id',upload.single('avatar'), updateProfile);
router.delete('/remove/:id', deleteProfile);



module.exports = router;
