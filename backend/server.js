const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import route handlers
const cart = require('./routes/cart'); // Ensure you have a cart.js in your routes directory
const orderRoutes = require('./routes/orders');
const menuItems = require('./routes/menuItems'); // Ensure you have a menuItems.js in your routes directory

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://zainab350mushtaq:zainab@cluster0.duzmoyt.mongodb.net/restaurant?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Use routes
app.use('/api/cart', cart); // Route for all cart-related endpoints
app.use('/api/orders', orderRoutes);
app.use('/api/menu-items', menuItems); // Route for all menu item-related endpoints

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
