const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('./admin/productAdd');
  });


module.exports = router;
