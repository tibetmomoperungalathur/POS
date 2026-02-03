export default function OrdersListPanel({
    orders,
    selectedOrder,
    onSelect
  }) {
    return (
      <div className="w-[30%] bg-white border-r p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          Today’s Orders ({orders.length})
        </h3>
  
        {orders.length === 0 && (
          <div className="text-slate-400 text-sm">
            No orders placed today.
          </div>
        )}
  
        <div className="space-y-2">
          {orders.map(o => {
            const isSelected = selectedOrder?.id === o.id;
  
            return (
              <div
                key={o.id}
                onClick={() => onSelect(o)}
                className={`
                  p-3 rounded-lg cursor-pointer border transition
                  ${isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-300 bg-white hover:bg-slate-100'}
                `}
              >
                <div className="font-medium">
                  {o.orderNumber || o.id.slice(0, 6)}
                  <span className="text-sm text-slate-500 ml-1">
                    ({o.type})
                  </span>
                </div>
  
                <div className="text-sm text-slate-600">
                  {o.items.length} items
                </div>
  
                <div className="text-sm font-semibold">
                  ₹{o.total?.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  