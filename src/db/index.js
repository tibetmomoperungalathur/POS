// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'CafePOS';
const DB_VERSION = 1;
const MENU_STORE = 'menu';
const CART_STORE = 'cart';

export async function initDB() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create menu store if it doesn't exist
      if (!db.objectStoreNames.contains(MENU_STORE)) {
        db.createObjectStore(MENU_STORE, { keyPath: 'id' });
      }
      // Create cart store if it doesn't exist
      if (!db.objectStoreNames.contains(CART_STORE)) {
        db.createObjectStore(CART_STORE, { keyPath: 'id' });
      }
    },
  });
}

// -------------------- Menu Functions --------------------

// Save an array of menu items
export async function saveMenuItems(items) {
  const db = await initDB();
  const tx = db.transaction(MENU_STORE, 'readwrite');
  for (const item of items) {
    tx.store.put(item);
  }
  await tx.done;
}

// Load all menu items
export async function loadMenuItems() {
  const db = await initDB();
  return await db.getAll(MENU_STORE);
}

// -------------------- Cart Functions --------------------

// Save current cart items (replace previous)
export async function saveCartItems(items) {
  const db = await initDB();
  const tx = db.transaction(CART_STORE, 'readwrite');

  // Clear previous cart items
  const allKeys = await tx.store.getAllKeys();
  for (const key of allKeys) {
    tx.store.delete(key);
  }

  // Save new cart items
  for (const item of items) {
    tx.store.put(item);
  }
  await tx.done;
}

// Load cart items
export async function loadCartItems() {
  const db = await initDB();
  return await db.getAll(CART_STORE);
}

// Optional: Clear cart completely
export async function clearCart() {
  const db = await initDB();
  const tx = db.transaction(CART_STORE, 'readwrite');
  await tx.store.clear();
  await tx.done;
}
