import React, {  useState } from 'react';

export default function CashInputModal({ total, onConfirm, onCancel }) {
    const [cash, setCash] = useState('');
  
    const remaining = cash ? Math.max(Number(cash) - total, 0) : 0;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-[300px] text-center">
          <h3 className="text-lg font-semibold mb-4">Enter Cash Received</h3>
  
          <div className="mb-4">
            <div>Total: ₹{total.toFixed(2)}</div>
            <input
              type="number"
              value={cash}
              onChange={e => setCash(e.target.value)}
              className="border rounded px-2 py-1 w-full mt-2"
              placeholder="Enter cash received"
            />
            {cash && (
              <div className="mt-2 text-sm text-gray-600">
                Change: ₹{remaining.toFixed(2)}
              </div>
            )}
          </div>
  
          <div className="flex gap-2">
            <button
              onClick={() => onConfirm(cash)}
              disabled={Number(cash) < total}
              className="flex-1 bg-pos-primary text-white py-2 rounded disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  