// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Utensils, Receipt, History } from 'lucide-react';

import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import HistoryPage from './pages/HistoryPage';

const Tab = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition
       ${isActive
        ? 'bg-pos-primary text-white'
        : 'text-gray-600 hover:bg-gray-100'}`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">

        {/* POS Top Bar */}
        {/* POS Top Bar */}
<header className="bg-white border-b shadow-sm">
  <div className="h-14 px-6 flex items-center">

    {/* Left – Brand */}
    <div className="flex items-center gap-2 min-w-[180px]">
      <span className="text-xl">🥟</span>
      <span className="text-lg font-bold tracking-wide">
        MOMO POS
      </span>
    </div>

    {/* Center – Navigation */}
    <nav className="flex-1 flex justify-center gap-3">
      <Tab to="/" icon={Utensils} label="Menu" />
      <Tab to="/orders" icon={Receipt} label="Orders" />
      <Tab to="/history" icon={History} label="Today" />
    </nav>

    {/* Right – spacer / future actions */}
    <div className="min-w-[180px]" />

  </div>
</header>


        {/* Pages */}
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}
