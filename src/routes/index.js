var express = require('express');
var router = express.Router();

const {admin, index} = require('../controllers/indexControllers')


router
    .get('/', index)
    .get('/admin', admin);
module.exports = router;
