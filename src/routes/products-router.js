const express = require('express');
const fs = require('fs');
const router = express.Router();
const {home,detail,add,store,edit,update,remove} = require('../controllers/productsControllers');

router.get('/', home);

router.get('/detail/:id', detail);

router.get('/add', add);

router.post('/add', store);

router.get('/edit', edit);

router.put('/edit', update);

router.delete('/delete', remove);




module.exports = router;
