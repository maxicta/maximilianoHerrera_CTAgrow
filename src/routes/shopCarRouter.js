const express = require('express');
const router = express.Router();
const {getCart, addToCart, updateQuantity, removeFromCart, clearCart} = require('../controllers/shopCarControllers')
// /shopcar




const isLoggedIn = (req, res, next) => {
  console.log('req.session:', req.session); // Depuración
  if (!req.session.user || !req.session.user.id) { // Cambio aquí
    return res.status(401).json({ error: 'Debes estar logueado' });
  }
  next();
};


router.get('/', isLoggedIn, getCart);
router.post('/add', isLoggedIn, addToCart);
router.put('/update/:productId', isLoggedIn, updateQuantity);
router.delete('/remove/:productId', isLoggedIn, removeFromCart);
router.delete('/clear', isLoggedIn, clearCart);

module.exports = router;