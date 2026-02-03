// src/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrCreateCurrentOrder, saveCurrentOrder, clearCurrentOrder } from '../db/orderStorage';
import { v4 as uuidv4 } from 'uuid';
import StyleSidebar from '../components/menu/StyleSidebar';
import MenuGrid from '../components/menu/MenuGrid';
import CartPanel from '../components/menu/CartPanel';
import OrderTypeModal from '../components/menu/OrderTypeModal';
import { defaultMenuItems } from '../data/defaultMenuItems';






const getStyles = (items) => [...new Set(items.map(i => i.style))];

const generateOrderNumber = () => {
  const lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '0', 10);
  const nextNumber = lastOrderNumber + 1;
  localStorage.setItem('lastOrderNumber', nextNumber.toString());
  return `MOMO-${String(nextNumber).padStart(3, '0')}`;
};

function formatStyle(style = '') {
    return style
      .replace(/_/g, ' ')                 // replace underscores
      .replace(/\b(momos|saucy)\b/gi, '')  // remove unwanted words
      .replace(/\s+/g, ' ')               // clean extra spaces
      .trim();
  }
export default function MenuPage() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [selectedStyle, setSelectedStyle] = useState(defaultMenuItems[0]?.style || '');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);

  // Initialize order
  useEffect(() => {
    let order = getOrCreateCurrentOrder();
    if (!order.orderNumber) order.orderNumber = generateOrderNumber();
    setCurrentOrder(order);

    // if (!order.type) setShowOrderTypeModal(true);
  }, []);

  // Persist order on every change
  useEffect(() => {
    if (currentOrder) saveCurrentOrder(currentOrder);
  }, [currentOrder]);

  // Add item to cart
  const handleAddToCart = (item) => {
    if (!currentOrder.type) {
      // Show modal if type not selected
      setShowOrderTypeModal(true);
      return;
    }

    const existingIndex = currentOrder.items.findIndex(
        i => i.item.id === item.id  
      );

    const updatedItems = [...currentOrder.items];

    if (existingIndex >= 0) {
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1
      };
    } else {
      updatedItems.push({
        item: {
          ...item,
          price: Number(item.price)
        },
        quantity: 1
      });
    }

    setCurrentOrder({ ...currentOrder, items: updatedItems, updatedAt: Date.now() });
  };

  // Update quantity
  const updateQty = (itemId, delta) => {
    const updatedItems = currentOrder.items
    .map(i => i.item.id === itemId? { ...i, quantity: i.quantity + delta }: i)
    .filter(i => i.quantity > 0);

    setCurrentOrder({ ...currentOrder, items: updatedItems, updatedAt: Date.now() });
  };

  // Clear cart
  const clearCart = () => {
    setCurrentOrder({ ...currentOrder, items: [], type: null, updatedAt: Date.now() });
    // setShowOrderTypeModal(true);
  };

  // Select order type
  const selectOrderType = (type) => {
    setCurrentOrder(prev => ({ ...prev, type, updatedAt: Date.now() }));
    setShowOrderTypeModal(false);
  };

  // Cancel modal
  const cancelOrderType = () => {
    setShowOrderTypeModal(false);
  };

  const goToOrderPage = () => navigate('/orders');

  // Filter and group menu
  const filteredItems = menuItems.filter(i => i.style === selectedStyle);
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <div className="flex h-full">
  
      <StyleSidebar
        styles={getStyles(menuItems)}
        selectedStyle={selectedStyle}
        onSelect={setSelectedStyle}
      />
  
      <MenuGrid
        groupedItems={groupedItems}
        onAdd={handleAddToCart}
      />
  
      <CartPanel
        currentOrder={currentOrder}
        onUpdateQty={updateQty}
        onClear={clearCart}
        onGoToOrder={goToOrderPage}
        formatStyle={formatStyle}
      />
  
  {showOrderTypeModal && (
  <OrderTypeModal
    onSelect={selectOrderType}
    onCancel={cancelOrderType}
  />
)}

     
  
    </div>
  );
  
}