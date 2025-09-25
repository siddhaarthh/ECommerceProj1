const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: Number,
  paymentMethod: { type: String, default: 'COD' }, // New field for payment method
  status: { type: String, default: 'Pending' },
  stripeId: { type: String, default: '' }, // Keep for compatibility, but unused
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);