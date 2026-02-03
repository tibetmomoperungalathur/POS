// src/components/menu/MenuGrid.jsx
import React from 'react';
import { Plus, Leaf, Drumstick, Fish } from 'lucide-react';

const CATEGORY_STYLES = {
  Veg: {
    ring: 'ring-green-500',
    badge: 'bg-green-100 text-green-700'
  },
  'Non-Veg': {
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-700'
  }
};

const ICON_MAP = {
  leaf: Leaf,
  chicken: Drumstick,
  seafood: Fish
};


export default function MenuGrid({ groupedItems, onAdd }) {
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        {Object.keys(groupedItems).map(group => (
          <div key={group} className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              {group.replace(/_/g, ' ')}
            </h4>
  
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groupedItems[group].map(item => {
                const categoryStyle = CATEGORY_STYLES[item.category] || {};
                const Icon = ICON_MAP[item.icon];
  
                return (
                  <div
                    key={item.id}
                    className={`relative bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer ring-1 ${categoryStyle.ring}`}
                  >
                    {/* Category dot (classic POS cue) */}
                    <span
                      className={`absolute top-2 right-2 h-3 w-3 rounded-full ${
                        item.category === 'Veg'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    />
  
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-full object-cover rounded-t-lg"
                    />
  
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">
                          {item.name}
                        </div>
  
                        {/* Icon badge */}
                        {Icon && (
                          <span
                            className={`p-1 rounded-full ${categoryStyle.badge}`}
                          >
                            <Icon size={20} />
                          </span>
                        )}
                      </div>
  
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-pos-primary">
                          ₹{item.price}
                        </span>
  
                        <button
                          onClick={() => onAdd(item)}
                          className="bg-pos-accent text-white p-2 rounded-full hover:scale-105 active:scale-95 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
  