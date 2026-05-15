import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TransactionHistory } from './pages/TransactionHistory';
import { Reports } from './pages/Reports';
import { AddTransaction } from './pages/AddTransaction';
import { LayoutDashboard, Receipt, PieChart, PlusCircle, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Panel de Control', icon: LayoutDashboard },
  { path: '/history', label: 'Historial', icon: Receipt },
  { path: '/reports', label: 'Reportes', icon: PieChart },
  { path: '/add', label: 'Añadir', icon: PlusCircle },
];

function Navigation({ onClose }) {
  const location = useLocation();
  return (
    <>
      <div className="text-[18px] font-bold text-primary mb-8 px-4 pt-4 hidden md:block">
        Salud Financiera
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              isActive
                ? 'bg-primary-container text-on-primary-container font-medium'
                : 'text-on-surface hover:bg-surface-dim'
            }`}
          >
            <Icon size={20} />
            <span className="text-[14px] leading-[20px]">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant flex md:hidden z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] leading-none">{item.label.split(' ')[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-64 bg-surface h-screen border-r border-outline-variant p-4 flex-col gap-2 shrink-0 sticky top-0">
        <Navigation onClose={() => {}} />
      </nav>

      {/* Mobile hamburger header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant flex items-center px-4 h-14">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-md text-on-surface hover:bg-surface-dim transition-colors"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
        <span className="ml-3 text-[17px] font-bold text-primary">Salud Financiera</span>
      </div>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <nav
        className={`fixed top-0 left-0 h-full w-72 bg-surface z-50 flex flex-col p-4 gap-2 shadow-2xl transition-transform duration-300 md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6 pt-2">
          <span className="text-[18px] font-bold text-primary">Salud Financiera</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-md text-on-surface hover:bg-surface-dim"
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>
        <Navigation onClose={() => setDrawerOpen(false)} />
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 pt-[72px] md:pt-0 md:p-8 pb-20 md:pb-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add" element={<AddTransaction />} />
        </Routes>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
