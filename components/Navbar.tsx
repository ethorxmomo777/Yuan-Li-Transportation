import React, { useState } from 'react';
import { Truck, Menu, X, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenChat }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: '首頁' },
    { id: 'fleet', label: '車型介紹' },
    { id: 'services', label: '服務項目' },
    { id: 'about', label: '關於我們' },
    { id: 'contact', label: '聯絡我們' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">源利交通</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-1">Yuan Li Transportation</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-brand transition-colors relative py-2 ${
                currentPage === link.id ? 'text-brand font-bold' : ''
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand rounded-full"></span>
              )}
            </button>
          ))}
          <button 
            onClick={onOpenChat}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-full hover:bg-brand-dark transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            AI 智慧詢價
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-brand"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-fade-in-down">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left py-3 border-b border-slate-50 last:border-none ${
                currentPage === link.id ? 'text-brand font-bold' : 'text-slate-600'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => {
              onOpenChat();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-brand text-white rounded-lg font-bold mt-2 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            AI 智慧詢價
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;