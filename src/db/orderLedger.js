import { openDB } from 'idb';

const DB_NAME = 'pos-ledger';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('orders')) {
      const store = db.createObjectStore('orders', { keyPath: 'id' });
      store.createIndex('orderNumber', 'orderNumber');
      store.createIndex('paidAt', 'paidAt');
      store.createIndex('orderType', 'type');
    }
  }
});

export async function saveCompletedOrder(order) {
  const db = await dbPromise;
  await db.put('orders', order);
}

export async function getAllOrders() {
  const db = await dbPromise;
  return db.getAll('orders');
}

export async function getOrdersByDate(start, end) {
  const db = await dbPromise;
  const all = await db.getAll('orders');
  return all.filter(o => o.paidAt >= start && o.paidAt <= end);
// return all;
}
