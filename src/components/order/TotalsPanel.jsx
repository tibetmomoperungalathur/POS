export default function TotalsPanel({
    currentOrder,
    totals,
    updateCharge,
    holdOrder,
    placeOrder,
    cancelOrder
  }) {
    if (!currentOrder) {
      return (
        <div className="w-[35%] bg-white border-l p-4 text-slate-400">
          No active order
        </div>
      );
    }
  
    return (
      <div className="w-[35%] bg-white border-l p-4 space-y-4">
        <h3 className="text-lg font-semibold">Charges</h3>
  
        {[
          ['containerCharge', 'Container'],
          ['deliveryCharge', 'Delivery'],
          ['serviceCharge', 'Service'],
          ['additionalCharge', 'Additional'],
          ['discountAmount', 'Discount']
        ].map(([key, label]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm">{label}</span>
            <input
              type="number"
              value={currentOrder.charges[key]}
              onChange={e => updateCharge(key, e.target.value)}
              className="w-24 px-2 py-1 border rounded text-right"
            />
          </div>
        ))}
  
        <hr />
  
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totals.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>CGST</span>
            <span>₹{totals.cgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>SGST</span>
            <span>₹{totals.sgstAmount.toFixed(2)}</span>
          </div>
        </div>
  
        <hr />
  
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
  
        <div className="space-y-2 pt-4">
          <button
            onClick={holdOrder}
            disabled={currentOrder.items.length === 0}
            className="w-full py-2 rounded-lg bg-yellow-500 text-white disabled:opacity-50"
          >
            Hold Order
          </button>
  
          <button
            onClick={placeOrder}
            disabled={currentOrder.items.length === 0}
            className="w-full py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
          >
            Place Order
          </button>
  
          <button
            onClick={cancelOrder}
            disabled={currentOrder.items.length === 0}
            className="w-full py-2 rounded-lg bg-red-500 text-white disabled:opacity-50"
          >
            Cancel Order
          </button>
        </div>
      </div>
    );
  }
  