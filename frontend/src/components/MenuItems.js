import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuItems.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem } from '../store/cartSlice';

function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/menu-items');
            if (!response.ok) throw new Error('Something went wrong');
            const data = await response.json();
            setMenuItems(data.map(item => ({
                ...item,
                price: parseFloat(item.price)
            })));
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getImageFileName = (itemName) => {
        return `${itemName.split(' ')[0]}.jpeg`; // Takes the first word of the item's name and appends '.jpeg'
    };

    const handleAddToCart = (item) => {
        dispatch(addItem({
            id: item._id,
            title: item.name,
            price: parseFloat(item.price),
            quantity: 1
        }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(deleteItem(id));
    };

    const proceedToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="menu-items-container">
            <h1>Menu Items</h1>
            <div className="button-group">
                <button onClick={proceedToCart} className="proceed-to-cart-btn">Proceed to Cart</button>
            </div>
            {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
                <div className="menu-items-grid">
                    {menuItems.map(item => (
                        <div key={item._id} className="menu-item-card">
                            <h3>{item.name} - ${item.price.toFixed(2)}</h3>
                            <p>{item.description}</p>
                            <img src={`/Images/${encodeURIComponent(getImageFileName(item.name))}`} alt={item.name} />
                            <div className="button-group">
                                {cartItems.some(ci => ci.id === item._id) ? (
                                    <button onClick={() => handleRemoveFromCart(item._id)}>Remove from Cart</button>
                                ) : (
                                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuItems;
