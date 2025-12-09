import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import ChatWidget from './components/ChatWidget';
import { Package, Menu, Phone, Mail, Truck } from 'lucide-react';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#87CEEB] rounded-lg flex items-center justify-center text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">源利運輸</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Yuan Li Transportation</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-[#87CEEB] transition-colors">首頁</a>
            <a href="#" className="hover:text-[#87CEEB] transition-colors">關於我們</a>
            <a href="#" className="hover:text-[#87CEEB] transition-colors">服務項目</a>
            <a href="#" className="hover:text-[#87CEEB] transition-colors">最新消息</a>
            <a href="#" className="px-5 py-2.5 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">聯絡我們</a>
          </nav>

          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Hero onStartChat={() => setIsChatOpen(true)} />
        <Services />
        <Fleet />
        
        {/* Simple CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">準備好運送您的貨物了嗎？</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              立即使用我們的 AI 智慧詢價系統，只要幾分鐘，輕鬆獲取專業報價。
            </p>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-3 bg-[#87CEEB] hover:bg-sky-400 text-white font-bold rounded-full shadow-lg transition-all hover:-translate-y-1"
            >
              立即詢價
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <Truck className="w-6 h-6 text-[#87CEEB]" />
              <span className="font-bold text-lg">源利運輸</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              您的台灣企業運輸夥伴，提供專業專車、回頭車及倉儲服務。
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">服務項目</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#87CEEB]">專車直達配送</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">南北回頭車</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">倉儲理貨</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">企業長租</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">公司資訊</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#87CEEB]">關於源利</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">最新消息</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">司機招募</a></li>
              <li><a href="#" className="hover:text-[#87CEEB]">隱私權政策</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">聯絡我們</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#87CEEB]" />
                <span>+886 2 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#87CEEB]" />
                <span>service@yuanli-trans.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Yuan Li Transportation. All rights reserved.
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Floating Action Button (Visible when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[#87CEEB] hover:bg-sky-400 text-white rounded-full shadow-2xl z-40 transition-transform hover:scale-110 animate-bounce"
        >
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      )}
    </div>
  );
};

export default App;