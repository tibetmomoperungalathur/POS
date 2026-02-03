import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loadCurrentOrder,
  saveCurrentOrder,
  clearCurrentOrder,
  loadHeldOrders,
  saveHeldOrders
} from '../db/orderStorage';
import { v4 as uuidv4 } from 'uuid';
import { saveCompletedOrder } from '../db/orderLedger';
import HeldOrdersPanel from  '../components/order/HeldOrdersPanel';
import CurrentOrderPanel from  '../components/order/CurrentOrderPanel';
import TotalsPanel from  '../components/order/TotalsPanel';
import PaymentModal from  '../components/order/PaymentModal';
import CashInputModal from  '../components/order/CashInputModal';

// -------------------- utils --------------------
const EMPTY_CHARGES = {
  containerCharge: 0,
  deliveryCharge: 0,
  serviceCharge: 0,
  additionalCharge: 0,
  discountAmount: 0
};

function normalizeOrder(order) {
  if (!order) return null;

  return {
    ...order,
    id: order.id || uuidv4(),
    items: order.items || [],
    charges: { ...EMPTY_CHARGES, ...(order.charges || {}) },
    updatedAt: order.updatedAt || Date.now()
  };
}

// -------------------- constants --------------------
const GST_RATE = 5; 

// If in future you need IGST, you can add TAX_RATE_IGST

// -------------------- calculate totals --------------------
export function calculateTotals(order) {
  if (!order) return null;

  // 1️⃣ Subtotal from items
  const subTotal = order.items.reduce(
    (sum, i) => sum + Number(i.item.price) * i.quantity,
    0
  );

  // 2️⃣ Total of extra charges
  const chargesTotal =
    Number(order.charges.containerCharge || 0) +
    Number(order.charges.deliveryCharge || 0) +
    Number(order.charges.serviceCharge || 0) +
    Number(order.charges.additionalCharge || 0);

  // 3️⃣ Taxable value = items + charges - discount
  const discount = Number(order.charges.discountAmount || 0);
  const taxableValue = subTotal + chargesTotal - discount;

  // 4️⃣ Compute taxes
  const totalGST = (taxableValue * GST_RATE) / 100;
  const cgstAmount = totalGST/2;
  const sgstAmount = totalGST/2;

  // 5️⃣ Total = taxable value + taxes
  const total = taxableValue + cgstAmount + sgstAmount;

  // 6️⃣ Return all breakdowns
  return {
    subTotal,
    chargesTotal,
    discount,
    taxableValue,
    cgstAmount,
    sgstAmount,
    total
  };
}


function formatStyle(style = '') {
    return style
      .replace(/_/g, ' ')                 // replace underscores
      .replace(/\b(momos|saucy)\b/gi, '')  // remove unwanted words
      .replace(/\s+/g, ' ')               // clean extra spaces
      .trim();
  }
  
// -------------------- component --------------------
export default function OrdersPage() {
  const navigate = useNavigate();

  const [currentOrder, setCurrentOrder] = useState(null);
  const [heldOrders, setHeldOrders] = useState([]);
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const [cashInputModal, setCashInputModal] = useState(false);
const [cashReceived, setCashReceived] = useState('');
const [selectedPaymentType, setSelectedPaymentType] = useState(null);


  
    
  
    const selectPaymentType = (paymentType) => {

        if (!currentOrder) return;

        if (paymentType === 'Cash') {
          setSelectedPaymentType('Cash');
          setCashInputModal(true);  // open cash entry modal
          setShowPaymentTypeModal(false);
          return;
        }
      
        // Non-cash: directly place order
        finalizeOrder(paymentType, null);
      };
      
  

  const finalizeOrder = async (paymentType, cashGiven) => {
    if (!currentOrder || !totals) return;
  
    const paidOrder = {
      ...currentOrder,
      paymentType,
      cashGiven: cashGiven ? Number(cashGiven) : null,
      change: cashGiven ? Number(cashGiven) - totals.total : 0,
      ...totals,
      status: 'PAID',
      paidAt: Date.now()
    };
  
    await saveCompletedOrder(paidOrder);
    clearCurrentOrder();
    setCurrentOrder(null);
    setCashInputModal(false);
    setCashReceived('');
    setSelectedPaymentType(null);
    navigate('/');
  };
  
  
  // Cancel modal
  const cancelPaymentType = () => {
    setShowPaymentTypeModal(false);
  };


  // ---------- load on mount ----------
  useEffect(() => {
    setCurrentOrder(normalizeOrder(loadCurrentOrder()));
    setHeldOrders(loadHeldOrders());
  }, []);

  // ---------- totals ----------
  const totals = useMemo(() => {
    if (!currentOrder) return null;
    return calculateTotals(currentOrder);
  }, [currentOrder?.items, currentOrder?.charges]);

  // ---------- helpers ----------
  const persistOrder = (order) => {
    const updated = { ...order, updatedAt: Date.now() };
    saveCurrentOrder(updated);
    setCurrentOrder(updated);
  };

  // ---------- item qty ----------
  const updateQty = (itemId, delta) => {
    if (!currentOrder) return;

    const items = currentOrder.items
      .map(i =>
        i.item.id === itemId
          ? { ...i, quantity: i.quantity + delta }
          : i
      )
      .filter(i => i.quantity > 0);

    persistOrder({ ...currentOrder, items });
  };

  // ---------- charges ----------
  const updateCharge = (key, value) => {
    if (!currentOrder) return;

    persistOrder({
      ...currentOrder,
      charges: {
        ...currentOrder.charges,
        [key]: Number(value) || 0
      }
    });
  };

  // ---------- hold ----------
  const holdOrder = () => {
    if (!currentOrder || currentOrder.items.length === 0) return;

    const held = {
      ...currentOrder,
      status: 'HELD',
      ...totals,
      heldAt: Date.now()
    };

    const updatedHeld = [...heldOrders, held];
    saveHeldOrders(updatedHeld);
    setHeldOrders(updatedHeld);

    clearCurrentOrder();
    setCurrentOrder(null);
  };

  // ---------- resume ----------
  const resumeOrder = (order) => {
    let updatedHeld = heldOrders;

    if (currentOrder && currentOrder.items.length > 0) {
      updatedHeld = [...updatedHeld, { ...currentOrder, status: 'HELD' }];
    }

    updatedHeld = updatedHeld.filter(o => o.id !== order.id);
    saveHeldOrders(updatedHeld);
    setHeldOrders(updatedHeld);

    const resumed = normalizeOrder({
      ...order,
      status: 'OPEN'
    });

    saveCurrentOrder(resumed);
    setCurrentOrder(resumed);
  };

  // ---------- place ----------
 
  const placeOrder = () => {
    if (!currentOrder || currentOrder.items.length === 0) return;
  
    setShowPaymentTypeModal(true); // just open modal
  };


  // ---------- cancel ----------
  const cancelOrder = () => {
    if (!currentOrder) return;
    if (!window.confirm('Cancel this order?')) return;

    clearCurrentOrder();
    setCurrentOrder(null);
  };

  const goToMenuPage = () => navigate('/');

  // -------------------- UI --------------------
  return (
    <div className="flex h-screen bg-slate-100">
  <HeldOrdersPanel
    heldOrders={heldOrders}
    onResume={resumeOrder}
  />

  <CurrentOrderPanel
    currentOrder={currentOrder}
    updateQty={updateQty}
    formatStyle={formatStyle}
    goToMenuPage={goToMenuPage}
  />

  <TotalsPanel
    currentOrder={currentOrder}
    totals={totals}
    updateCharge={updateCharge}
    holdOrder={holdOrder}
    placeOrder={placeOrder}
    cancelOrder={cancelOrder}
  />

  {showPaymentTypeModal && (
    <PaymentModal
      onSelect={selectPaymentType}
      onCancel={cancelPaymentType}
    />
  )}

{cashInputModal && totals && (
  <CashInputModal
    total={totals.total}
    onConfirm={(cash) => finalizeOrder('Cash', cash)}
    onCancel={() => setCashInputModal(false)}
  />
)}

</div>

  );
  
}

