import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <h4>Order #{order._id}</h4>
          <p>Status: {order.status}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;