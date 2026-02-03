// src/components/menu/CartPanel.jsx
import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartPanel({
  currentOrder,
  onUpdateQty,
  onClear,
  onGoToOrder,
  formatStyle
}) {
  return (
    <div className="w-80 bg-white border-l p-4 flex flex-col">
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        <ShoppingCart size={18} />
        {currentOrder?.orderNumber}
        {currentOrder?.type && ` (${currentOrder.type})`}
      </h3>

      <div className="flex-1 overflow-y-auto">
        {!currentOrder?.items?.length && (
          <div className="text-gray-500 mt-10 text-center">
            Cart is empty
          </div>
        )}

        {currentOrder?.items?.map(({ item, quantity }) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-3"
          >
            <div className="text-sm">
              <div className="font-medium">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">
                {formatStyle(item.style)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQty(item.id, -1)}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Minus size={14} />
              </button>

              <span className="w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={() => onUpdateQty(item.id, 1)}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentOrder?.items?.length > 0 && (
        <>
          <div className="border-t pt-3 font-semibold">
            Total ₹
            {currentOrder.items.reduce(
              (sum, i) => sum + i.item.price * i.quantity,
              0
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={onClear}
              className="bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
              Clear Cart
            </button>

            <button
              onClick={onGoToOrder}
              className="bg-pos-primary text-white py-2 rounded hover:bg-blue-700"
            >
              Go to Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
