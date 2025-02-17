var express = require('express');
var router = express.Router();
const {login, register, storeUser, profile, processLogin, editProfile, updateProfile, deleteProfile } = require('../controllers/usersController');

const upload = require('../middlewares/uploadUser.js')

/* GET users listing. */
// /users
router.get('/login', login);
router.post('/login',processLogin);

router.get('/register', register);
router.post('/register', storeUser);

router.get('/profile/:id', profile);
router.get('/editprofile/:id', editProfile);
router.put('/profile/:id',upload.single('avatar'), updateProfile);
router.delete('/remove/:id', deleteProfile);



module.exports = router;
