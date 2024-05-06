import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Orders.css';

function Orders() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [orderStatus, setOrderStatus] = useState(0);
    const [showHomeButton, setShowHomeButton] = useState(false);

    const statusSteps = [
        'Order is Confirmed', 
        'Order is Being Prepared', 
        'Order is Ready', 
        'Order is Out for Delivery', 
        'Order is Delivered'
    ];

    useEffect(() => {
        if (state && state.cartItems) {
            const intervalId = setInterval(() => {
                setOrderStatus((currentStatus) => {
                    const nextStatus = currentStatus + 1;
                    if (nextStatus >= statusSteps.length) {
                        clearInterval(intervalId);
                        setShowHomeButton(true);
                        return currentStatus;
                    }
                    return nextStatus;
                });
            }, 2000);  // Update status every 2 seconds

            return () => clearInterval(intervalId);
        }
    }, [state, statusSteps.length]); // Adding statusSteps.length as a dependency

    if (!state || !state.cartItems) {
        return (
            <div className="orders-container">
                <h1>No Recent Orders</h1>
                <button className="orders-back-home-btn" onClick={() => navigate('/menu-items')}>Back to Menu</button>
            </div>
        );
    }

    const { cartItems, totalAmount } = state;

    const formatPrice = (price) => parseFloat(price).toFixed(2);

    return (
        <div className="orders-container">
            <h1>Your Order</h1>
            <div><h1>Status: {statusSteps[orderStatus]}</h1></div>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>${formatPrice(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>${formatPrice(item.price * item.quantity)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3">Grand Total</td>
                        <td>${formatPrice(totalAmount)}</td>
                    </tr>
                </tbody>
            </table>
            {showHomeButton && (
                <button className="orders-back-home-btn" onClick={() => navigate('/')}>Back to Home</button>
            )}
        </div>
    );
}

export default Orders;
