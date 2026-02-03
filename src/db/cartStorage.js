// src/cartStorage.js

const CART_KEY = 'current_order';

// Save cart to localStorage
export function saveCart(cartItems) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

// Load cart from localStorage
export function loadCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// Clear current cart
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
