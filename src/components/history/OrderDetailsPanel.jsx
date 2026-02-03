export default function OrderDetailsPanel({
    selectedOrder,
    formatStyle
  }) {
    if (!selectedOrder) {
      return (
        <div className="flex-1 p-6 text-slate-400">
          Select an order to see details
        </div>
      );
    }
  
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
  
          <h3 className="text-xl font-semibold">
            Order {selectedOrder.orderNumber}
          </h3>
  
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>Status:</strong> {selectedOrder.status}</div>
            <div><strong>Payment:</strong> {selectedOrder.paymentType}</div>
            <div><strong>Type:</strong> {selectedOrder.type}</div>
            <div>
              <strong>Paid At:</strong>{' '}
              {selectedOrder.paidAt
                ? new Date(selectedOrder.paidAt).toLocaleString()
                : '-'}
            </div>
            <div>
              <strong>Business Date:</strong>{' '}
              {new Date(selectedOrder.businessDate).toLocaleDateString()}
            </div>
          </div>
  
          <hr />
  
          {/* ITEMS */}
          <div>
            <h4 className="font-semibold mb-2">Items</h4>
  
            <div className="space-y-2">
              {selectedOrder.items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <div>
                    {item.name}
                    <span className="text-slate-500 text-xs">
                      {' '}({formatStyle(item.style)}) × {quantity}
                    </span>
                  </div>
                  <div className="font-medium">
                    ₹{(item.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <hr />
  
          {/* CHARGES */}
          <div>
            <h4 className="font-semibold mb-2">Charges</h4>
            <div className="space-y-1 text-sm">
              {selectedOrder.charges &&
                Object.entries(selectedOrder.charges).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}</span>
                    <span>₹{v.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
  
          <hr />
  
          {/* TAXES */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{selectedOrder.subTotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>CGST</span>
              <span>₹{selectedOrder.cgstAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SGST</span>
              <span>₹{selectedOrder.sgstAmount?.toFixed(2)}</span>
            </div>
          </div>
  
          <hr />
  
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{selectedOrder.total?.toFixed(2)}</span>
          </div>
  
        </div>
      </div>
    );
  }
  