export default function PaymentModal({
    onSelect,
    onCancel
  }) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-[300px] text-center">
          <h3 className="text-lg font-semibold mb-4">
            Select Payment Type
          </h3>
  
          <div className="space-y-3">
            {['Cash', 'UPI', 'CreditCard'].map(type => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="w-full py-2 rounded bg-slate-200 hover:bg-slate-300"
              >
                {type}
              </button>
            ))}
  
            <button
              onClick={onCancel}
              className="w-full py-2 rounded bg-slate-400 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  