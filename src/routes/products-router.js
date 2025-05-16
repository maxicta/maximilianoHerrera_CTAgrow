const express = require('express');
const fs = require('fs');
const router = express.Router();
const {home,detail,add,store,edit,update,remove} = require('../controllers/productsControllers');

const upload = require('../middlewares/uploadProduct.js');
const addProductValidator = require('../validations/addProductValidator.js');


router.get('/', home);

router.get('/detail/:id', detail);

router.get('/add', add);

router.post('/add', upload.single('image-product'),addProductValidator, store);

router.get('/edit/:id', edit);

router.put('/edit/:id',upload.single('image-product'), addProductValidator, update);

router.delete('/delete/:id', remove);




module.exports = router;
