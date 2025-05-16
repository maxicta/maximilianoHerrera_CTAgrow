const express = require('express');
const router = express.Router();
const {addToCart, update, removeElementCar, clearShopCart} = require('../../controllers/api/cart');
// /api/shopcar

router.post('/add', addToCart);
router.put('/update/:id' , update);
router.delete('/remove/:id', removeElementCar);
router.delete('/clearShopCar' , clearShopCart);


module.exports = router;