export default function HeldOrdersPanel({ heldOrders, onResume }) {
    return (
      <div className="w-[20%] bg-white border-r p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Held Orders</h3>
  
        {heldOrders.length === 0 && (
          <div className="text-slate-400 text-sm">No held orders</div>
        )}
  
        {heldOrders.map(o => (
          <div
            key={o.id}
            onClick={() => onResume(o)}
            className="mb-2 p-3 rounded-lg border cursor-pointer hover:bg-slate-100 transition"
          >
            <div className="font-medium">#{o.orderNumber}</div>
            <div className="text-sm text-slate-500">
              {o.items.length} items
            </div>
          </div>
        ))}
      </div>
    );
  }
  