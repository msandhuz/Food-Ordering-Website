const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Define your schema fields here
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',  // assuming you have a MenuItem model
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        enum: ['confirmed', 'being prepared', 'order is ready', 'order is out for delivery', 'order delivered'],
        default: 'confirmed'
    },
    order_time: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
