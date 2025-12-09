import React from 'react';
import { Truck, ChevronRight, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartChat }) => {
  return (
    <section className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
          alt="Truck Logistics Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-start max-w-6xl">
        <div className="inline-flex items-center gap-2 bg-[#87CEEB]/10 border border-[#87CEEB]/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <Truck className="w-4 h-4 text-[#87CEEB]" />
          <span className="text-[#87CEEB] text-sm font-medium tracking-wide">台灣企業運輸的可靠夥伴</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          讓貨物<span className="text-[#87CEEB]">準時到達</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
          台灣企業運輸首選｜北中南全區域配送｜多元車型
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={onStartChat}
            className="group relative px-8 py-4 bg-[#87CEEB] hover:bg-sky-400 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(135,206,235,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">AI 智慧詢價</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
          </button>
          
          <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-full font-medium text-lg transition-all">
            了解服務
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 w-full">
            <div>
              <div className="flex items-center gap-2 text-[#87CEEB] mb-1">
                <MapPin className="w-5 h-5" />
                <span className="font-bold text-2xl">100%</span>
              </div>
              <p className="text-slate-400 text-sm">全台配送覆蓋</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#87CEEB] mb-1">
                <Clock className="w-5 h-5" />
                <span className="font-bold text-2xl">24h</span>
              </div>
              <p className="text-slate-400 text-sm">快速調度回應</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#87CEEB] mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-2xl">99%</span>
              </div>
              <p className="text-slate-400 text-sm">準時送達率</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#87CEEB] mb-1">
                <Truck className="w-5 h-5" />
                <span className="font-bold text-2xl">50+</span>
              </div>
              <p className="text-slate-400 text-sm">專業車隊</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;