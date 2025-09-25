import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

function NavBar() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setCart(res.data));
      setUser(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart([]);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/cart">Cart ({cart.length})</Nav.Link>
        {user ? (
          <>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;