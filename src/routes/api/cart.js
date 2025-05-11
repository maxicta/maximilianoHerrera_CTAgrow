const express = require('express');
const router = express.Router();
const {addToCart} = require('../../controllers/api/cart')
// /shopcar

router.post('/add', addToCart);

module.exports = router;