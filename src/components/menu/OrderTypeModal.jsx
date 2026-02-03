export default function OrderTypeModal({
    onSelect,
    onCancel
  }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-80 p-6 text-center">
  
          <h3 className="text-lg font-semibold mb-4">
            Select Order Type
          </h3>
  
          <div className="flex flex-col gap-3">
            {['Dine_in', 'Takeaway', 'Delivery'].map(type => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                {type.replace('_', ' ')}
              </button>
            ))}
  
            <button
              onClick={onCancel}
              className="py-2 rounded-lg bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </div>
  
        </div>
      </div>
    );
  }
  