import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`/api/products?q=${query}&category=${category}`)
      .then(res => setProducts(res.data));
  }, [query, category]);

  const addToCart = (productId) => {
    const token = localStorage.getItem('token');
    axios.post('/api/cart/add', { productId, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => alert('Added to cart'));
  };

  return (
    <div>
      <h2>Products</h2>
      <input type="text" placeholder="Search products" onChange={e => setQuery(e.target.value)} />
      <select onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;