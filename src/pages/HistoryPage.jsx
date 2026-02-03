// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { getOrdersByDate } from '../db/orderLedger';
import OrdersListPanel from '../components/history/OrdersListPanel';
import OrderDetailsPanel from '../components/history/OrderDetailsPanel';


function formatStyle(style = '') {
    return style
      .replace(/_/g, ' ')                 // replace underscores
      .replace(/\b(momos|saucy)\b/gi, '')  // remove unwanted words
      .replace(/\s+/g, ' ')               // clean extra spaces
      .trim();
  }
export default function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0)).getTime();
        const end = new Date(today.setHours(23, 59, 59, 999)).getTime();

        const result = await getOrdersByDate(start, end);

        // Sort by paidAt descending
        setOrders(result.sort((a, b) => b.paidAt - a.paidAt));
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading orders...</div>;

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
  
      <OrdersListPanel
        orders={orders}
        selectedOrder={selectedOrder}
        onSelect={setSelectedOrder}
      />
  
      <OrderDetailsPanel
        selectedOrder={selectedOrder}
        formatStyle={formatStyle}
      />
  
    </div>
  );
  
}
