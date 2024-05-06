import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1); // Track the next image
    const images = [
        'Margherita Pizza.jpeg',
        'Caesar Salad.jpeg',
        'Chicken Parmesan.jpeg',
        'Grilled Salmon.jpeg',
        'Lobster Bisque.jpeg',
        'Mushroom Risotto.jpeg',
        'Ribeye Steak.jpeg',
        'Spaghetti Carbonara.jpeg',
        'Vegetable Stir Fry.jpeg'
    ];

    // Function to map the descriptive item name to its corresponding image filename
    const getImageFileName = (itemName) => {
        // Split the string by space and take the first part, then append .jpeg
        return `${itemName.split(' ')[0]}.jpeg`;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(nextImageIndex);
            setNextImageIndex((nextImageIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [nextImageIndex, images.length]);

    return (
        <div className="home">
            <div className="content">
                <div className="text-section">
                    <h1>Delicious food delivered at your doorstep</h1>
                    <p>Yes, we have the best food in town</p>
                    <button><Link to="/menu-items">Order now</Link></button>
                </div>
                <div className="image-section">
                    <img
                        src={`/Images/${encodeURIComponent(getImageFileName(images[currentImageIndex]))}`}
                        alt={images[currentImageIndex].split(' ')[0]} // Using split to match the image file name for the alt text
                        style={{ opacity: 1, zIndex: 2 }} // Ensure this image is visible and on top
                    />
                    <img
                        src={`/Images/${encodeURIComponent(getImageFileName(images[nextImageIndex]))}`}
                        alt={images[nextImageIndex].split(' ')[0]} // Same as above for consistency
                        style={{ opacity: 0 }} // This will fade in
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
