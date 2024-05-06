// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0
  },
  reducers: {
    addItem(state, action) {
      const { price, quantity } = action.payload;
      const newAmount = parseFloat(price) * quantity;
      state.totalAmount += newAmount;
      state.cartItems.push(action.payload);
    },
    deleteItem(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        state.totalAmount -= parseFloat(item.price) * item.quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    incrementItem(state, action) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalAmount += parseFloat(item.price);
      }
    },
    decrementItem(state, action) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalAmount -= parseFloat(item.price);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
    }
  },
});

export const { addItem, deleteItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
