// src/components/menu/StyleSidebar.jsx
import React from 'react';

export default function StyleSidebar({ styles, selectedStyle, onSelect }) {
  return (
    <div className="w-56 bg-white border-r p-3 overflow-y-auto">
      <h3 className="font-semibold mb-3 text-gray-700">Styles</h3>

      <div className="flex flex-col gap-2">
        {styles.map(style => (
          <button
            key={style}
            onClick={() => onSelect(style)}
            className={`text-left px-3 py-2 rounded-md transition
              ${selectedStyle === style
                ? 'bg-pos-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            {style.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
