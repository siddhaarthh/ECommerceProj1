import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [product, setProduct] = useState({ name: '', description: '', price: '', category: '', image: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Product added');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add Product</h3>
      <div onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
        <input type="text" placeholder="Description" value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} />
        <input type="number" placeholder="Price" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
        <input type="text" placeholder="Category" value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} />
        <input type="text" placeholder="Image URL" value={product.image} onChange={e => setProduct({ ...product, image: e.target.value })} />
        <button type="submit">Add Product</button>
      </div>
    </div>
  );
}

export default AdminDashboard;