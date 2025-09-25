import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeFromCart = (productId) => {
    const token = localStorage.getItem('token');
    axios.delete(`/api/cart/remove/${productId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  };

  const checkout = () => {
    const token = localStorage.getItem('token');
    axios.post('/api/orders/create', {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setMessage(`Order #${res.data.orderId} placed successfully with Cash on Delivery!`);
        setCart([]); // Clear cart on frontend
      })
      .catch(err => setMessage('Failed to place order: ' + err.response?.data?.error || 'Unknown error'));
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      <table className="table">
        <thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.product._id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>${item.product.price}</td>
              <td>${item.product.price * item.quantity}</td>
              <td><button onClick={() => removeFromCart(item.product._id)}>Remove</button></td>
            </tr>
          ))}
          <tr><td colSpan="3">Total</td><td>${total}</td></tr>
        </tbody>
      </table>
      <button onClick={checkout} disabled={cart.length === 0}>Checkout with COD</button>
    </div>
  );
}

export default Cart;