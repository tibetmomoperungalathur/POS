// src/db/orderStorage.js
import { v4 as uuidv4 } from 'uuid'; // npm i uuid

const CURRENT_ORDER_KEY = 'pos_current_order';
const HELD_ORDERS_KEY = 'pos_held_orders';

const generateOrderNumber = () => {
    const lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '0', 10);
    const nextNumber = lastOrderNumber + 1;
    localStorage.setItem('lastOrderNumber', nextNumber.toString());
    return `MOMO-${String(nextNumber).padStart(3, '0')}`;
  };

// ---------- Current Order ----------
export function loadCurrentOrder() {
  try {
    const raw = localStorage.getItem(CURRENT_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCurrentOrder(order) {
  localStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(order));
}

export function clearCurrentOrder() {
  localStorage.removeItem(CURRENT_ORDER_KEY);
}

/**
 * Get the current order, or create a new one if none exists.
 * Ensures we always have one active order.
 */
export function getOrCreateCurrentOrder() {
  let order = loadCurrentOrder();
  if (!order) {
    order = {
      id: uuidv4(), // simple unique ID
      items: [],
      status: 'OPEN',
      orderNumber : generateOrderNumber(),
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      businessDate: new Date().toISOString().slice(0, 10)
    };
    saveCurrentOrder(order);
  }
  return order;
}

// ---------- Held Orders ----------
export function loadHeldOrders() {
  try {
    return JSON.parse(localStorage.getItem(HELD_ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveHeldOrders(orders) {
  localStorage.setItem(HELD_ORDERS_KEY, JSON.stringify(orders));
}
