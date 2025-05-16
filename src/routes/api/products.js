const express = require('express');
const router = express.Router();
const { list, orders, items } = require('../../controllers/api/products')
// /shopcar

router
    .get('/', list)
    .get('/orders', orders)
    .get('/items', items);

module.exports = router;