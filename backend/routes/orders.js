const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, async (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const order = new Order({
    user: req.user.id,
    items: cart,
    total,
    paymentMethod: 'COD', // Add COD as payment method
    status: 'Pending' // Initial status for COD
  });
  await order.save();
  req.session.cart = []; // Clear cart after order
  res.json({ message: 'Order placed successfully', orderId: order._id });
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
});

module.exports = router;