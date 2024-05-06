import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Add Link import here
import { deleteItem, incrementItem, decrementItem, clearCart } from "../store/cartSlice";
import { getMemoizedCartItems, getMemoizedTotalAmount } from '../selectors/cartSelectors';
import "../styles/Cart.css";

const Cart = () => {
    const { cartItems, totalAmount } = useSelector(state => ({
        cartItems: getMemoizedCartItems(state),
        totalAmount: getMemoizedTotalAmount(state)
    }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteItem = (id) => dispatch(deleteItem(id));
    const handleIncrementItem = (id) => dispatch(incrementItem(id));
    const handleDecrementItem = (id) => dispatch(decrementItem(id));

    const placeOrder = () => {
        navigate('/orders', { state: { cartItems, totalAmount } });  // Pass cart data via state
        dispatch(clearCart());  // Optional: clear cart after placing order
    };


    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <h1>Your Cart</h1>
                <p>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>${parseFloat(item.price).toFixed(2)}</td>
                            <td>
                                <div className="button-group">
                                    <button className="decrement-btn" onClick={() => handleDecrementItem(item.id)}>-</button>
                                    {item.quantity}
                                    <button className="increment-btn" onClick={() => handleIncrementItem(item.id)}>+</button>
                                </div>
                            </td>
                            <td>
                                <button className="remove-btn" onClick={() => handleDeleteItem(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart-actions">
                <Link to="/menu-items" className="addToCartBtn">Continue Shopping</Link>
                <button onClick={placeOrder} className="addToCartBtn">Place Order</button>
            </div>
            <div className="subtotal-display">
                Subtotal: ${parseFloat(totalAmount).toFixed(2)}
            </div>
        </div>
    );
};

export default Cart;
