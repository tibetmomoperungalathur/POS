export default function CurrentOrderPanel({
    currentOrder,
    updateQty,
    formatStyle,
    goToMenuPage
  }) {
    return (
      <div className="w-[45%] p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow p-4 h-full">
          <h3 className="text-xl font-semibold mb-4">
            {currentOrder
              ? `${currentOrder.orderNumber} (${currentOrder.type})`
              : 'No Active Order'}
          </h3>
  
          {!currentOrder && (
            <div className="text-slate-400 text-sm">
              Select a held order or go to menu
            </div>
          )}
  
          {currentOrder?.items.length === 0 && (
            <div className="text-slate-400 text-sm">
              Order is empty
            </div>
          )}
  
          <div className="space-y-3">
            {currentOrder?.items.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-slate-500">
                    {formatStyle(item.style)} × {quantity}
                  </div>
                </div>
  
                <div className="flex gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          <button
            onClick={goToMenuPage}
            className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }
  