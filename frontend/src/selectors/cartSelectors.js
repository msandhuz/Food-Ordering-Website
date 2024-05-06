import { createSelector } from 'reselect';

// Only memoize and transform data if necessary
export const getMemoizedCartItems = createSelector(
  [state => state.cart.cartItems],
  (cartItems) => cartItems.map(item => ({
    ...item,
    price: parseFloat(item.price).toFixed(2) // Transforming data: Ensuring price is a string formatted to two decimals
  }))
);

export const getMemoizedTotalAmount = createSelector(
  [state => state.cart.totalAmount],
  (totalAmount) => totalAmount ? totalAmount.toFixed(2) : '0.00' // Ensure the total amount is returned as a string with two decimal places
);
