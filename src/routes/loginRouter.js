var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('./users/login', { title: 'CTAgrowshop' });
});

module.exports = router;
