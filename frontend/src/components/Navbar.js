import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav>
            <div className="logo-and-title">
                <img src="/Images/logo.jpg" alt="Restaurant Logo" style={{ cursor: 'pointer', width: '40px', height: 'auto' }} />
                <h1 className="navbar-title">AP Foods</h1> {/* Ensure correct business name and adjust className if necessary */}
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu-items">Menu Items</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
