import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import MenuItems from './components/MenuItems';
import Orders from './components/Orders';
import Cart from './components/Cart'; 

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu-items" element={<MenuItems />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/cart" element={<Cart />} />  {/* Add this route */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
