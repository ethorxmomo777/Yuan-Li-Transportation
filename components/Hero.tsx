import React, { useState } from 'react';
import { 
  ChevronRight, MapPin, Clock, ShieldCheck, Users, Trophy, Truck, 
  ArrowRight, Phone, ClipboardList, Box, Wind, Factory, Store, 
  Cpu, HardHat, Palette, ShoppingBag, Plus, Minus, MessageCircle 
} from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
  onViewFleet: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartChat, onViewFleet }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "你們的服務範圍涵蓋哪些地區?",
      answer: "以高雄為據點，服務遍布全台灣。無論是北部的台北、桃園工業區，中部的台中科學園區，還是南部的港口與屏東地區，我們都能準時送達。"
    },
    {
      question: "報價需要多久時間?",
      answer: "使用我們的 AI 智慧詢價系統，最快 30 秒就能取得初步報價建議。若需要詳細正式報價單，我們的業務團隊會在 24 小時內與您聯繫提供。"
    },
    {
      question: "可以即時追蹤貨物位置嗎?",
      answer: "是的！我們全車隊皆配備先進的 GPS 衛星定位系統。您可以隨時透過客服查詢貨物即時動態，確保運輸過程透明化。"
    },
    {
      question: "有提供保險嗎?",
      answer: "有的，我們非常重視您的貨物安全。針對每一趟運送，我們都投保了足額的貨物運輸險，讓您託付更安心。"
    },
    {
      question: "需要提前多久預約?",
      answer: "一般建議提前 1-2 天預約以確保能安排最適合的車型。但若有緊急運送需求，也歡迎直接致電，我們將盡力為您調度車輛。"
    }
  ];

  return (
    <div className="w-full font-sans">
      {/* 1. Hero Section (保留) */}
      <section className="relative w-full h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://photo.518.com.tw/photo/2/926/1810115/1680354669448808775.jpeg" 
            alt="Yuan Li Logistics Fleet" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-start max-w-6xl pt-10">
          <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="text-brand text-sm font-medium tracking-wide">高雄出發・服務全台</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            53年穩健運輸<br />
            <span className="text-brand">值得信賴</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            從高雄出發，服務全台灣的專業物流夥伴。擁有 80+ 輛自有車隊，為您提供最安全、準時的運輸服務。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <button 
              onClick={onStartChat}
              className="group relative px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(74,144,226,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">AI 智慧詢價</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onViewFleet}
              className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-full font-medium text-lg transition-all"
            >
              查看車型
            </button>
          </div>

          {/* 2. Data Cards (保留) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-brand mb-1">
                  <Trophy className="w-6 h-6" />
                  <span className="font-bold text-3xl">53+</span>
                </div>
                <p className="text-slate-400 text-sm">年服務經驗</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-brand mb-1">
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-3xl">80+</span>
                </div>
                <p className="text-slate-400 text-sm">專業團隊</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-brand mb-1">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-bold text-3xl">98%</span>
                </div>
                <p className="text-slate-400 text-sm">準時送達率</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-brand mb-1">
                  <Clock className="w-6 h-6" />
                  <span className="font-bold text-3xl">24h</span>
                </div>
                <p className="text-slate-400 text-sm">快速報價</p>
              </div>
          </div>
        </div>
      </section>

      {/* 3. Core Advantages (保留) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand/10">
                <Truck className="w-10 h-10 text-slate-600 group-hover:text-brand" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">專業車隊</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                擁有歐翼車、氣墊車、尾門車等多種車型，滿足各類貨物運輸需求。
              </p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand/10">
                <MapPin className="w-10 h-10 text-slate-600 group-hover:text-brand" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">全台服務</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                以高雄為營運核心，運輸網絡覆蓋台灣全島，南北往返每日發車。
              </p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand/10">
                <Clock className="w-10 h-10 text-slate-600 group-hover:text-brand" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">即時追蹤</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                全車隊配備 GPS 衛星定位系統，透明化管理，隨時掌握貨物動態。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Service Area */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left: Map Visual */}
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-square max-w-md mx-auto bg-slate-50 rounded-[3rem] p-8 relative overflow-hidden group border border-slate-100">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -mr-20 -mt-20 z-0"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/30 rounded-full -ml-10 -mb-10 z-0"></div>
                  
                  {/* Taiwan Map Representation */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 400 600" className="w-full h-full text-slate-300 fill-current drop-shadow-sm">
                      <path d="M180,50 Q220,40 240,60 T260,100 Q280,150 250,200 T200,350 Q160,450 180,550 Q140,540 120,500 T100,300 Q90,200 130,100 T180,50 Z" />
                    </svg>
                    
                    {/* Location Markers */}
                    {/* Kaohsiung (Headquarters) */}
                    <div className="absolute bottom-[25%] left-[45%] flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
                      <div className="relative">
                        <span className="absolute -inset-1 rounded-full bg-brand/30 animate-ping"></span>
                        <div className="w-4 h-4 bg-brand rounded-full border-2 border-white shadow-lg relative z-10"></div>
                      </div>
                      <span className="mt-2 px-3 py-1 bg-white/90 backdrop-blur-sm shadow-md rounded-md text-xs font-bold text-brand whitespace-nowrap">高雄總部</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2">
               <div className="inline-block px-3 py-1 bg-brand/10 text-brand font-bold rounded-full mb-4 text-sm">
                  服務範圍
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                  高雄出發 <br/>
                  <span className="text-brand">服務全台灣</span>
               </h2>
               <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  以高雄為核心據點，運輸網絡遍布全台。無論是北部工業區、中部科學園區，還是南部港口配送，源利交通都能提供準時可靠的服務。
               </p>
               
               <div className="space-y-4">
                  <div className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                     </div>
                     <p className="text-slate-700">我們的車隊 <span className="font-bold text-slate-900">24 小時待命</span>，隨時響應您的運輸需求。</p>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-100 text-brand flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                     </div>
                     <p className="text-slate-700">專精科學園區、工業區、碼頭與機場報關配送。</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Fleet Preview */}
      <section className="py-24 bg-[#F5F5F5]">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">專業車隊 滿足各種需求</h2>
               <p className="text-slate-600 text-lg">擁有歐翼車、氣墊車、尾門車等多種車型</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               {/* 3.5T */}
               <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col group">
                  <div className="h-32 mb-4 bg-slate-100 rounded-lg overflow-hidden relative">
                     <img src="https://tsam.blob.core.windows.net/hinocms23/attachments/clw0kljc500z0tm6iz2i2su5l-clrivnc2sacujp2dyn0vx4tmn-hino-200-key-visual-new-final-electric-1.desktop.png" alt="3.5噸貨車" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">市區配送首選</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <Truck className="w-5 h-5 text-brand" />
                     <h3 className="font-bold text-slate-800 text-lg">3.5 噸貨車</h3>
                  </div>
                  <p className="text-sm text-slate-500">靈活機動，適合零星貨物。</p>
               </div>

               {/* 8T */}
               <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col group">
                  <div className="h-32 mb-4 bg-slate-100 rounded-lg overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" alt="8噸貨車" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">長途運輸專用</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <Truck className="w-5 h-5 text-brand" />
                     <h3 className="font-bold text-slate-800 text-lg">8 噸貨車</h3>
                  </div>
                  <p className="text-sm text-slate-500">大批貨物，經濟實惠。</p>
               </div>

               {/* Wing */}
               <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col group">
                  <div className="h-32 mb-4 bg-slate-100 rounded-lg overflow-hidden relative">
                     <img src="https://www.hino.com.tw//upload/carpage/bigpics//202403/2024030718285433241024.png" alt="歐翼車" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">快速裝卸</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <Box className="w-5 h-5 text-brand" />
                     <h3 className="font-bold text-slate-800 text-lg">歐翼車</h3>
                  </div>
                  <p className="text-sm text-slate-500">側開車廂，省時省力。</p>
               </div>

               {/* Air Cushion */}
               <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col group">
                  <div className="h-32 mb-4 bg-slate-100 rounded-lg overflow-hidden relative">
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4zgBN1nkW0m52ABvzRq96KS77xqCLWTFWsg&s" alt="氣墊車" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">精密運輸</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <Wind className="w-5 h-5 text-brand" />
                     <h3 className="font-bold text-slate-800 text-lg">氣墊車</h3>
                  </div>
                  <p className="text-sm text-slate-500">平穩安全，高價值貨物。</p>
               </div>
            </div>

            <div className="text-center">
               <button 
                  onClick={onViewFleet}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-dark transition-all shadow-md hover:shadow-lg active:scale-95"
               >
                  查看完整車型介紹 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </section>

      {/* 6. Service Process */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">簡單 4 步驟 輕鬆完成運送</h2>
               <p className="text-slate-600">標準化作業流程，讓每一次託付都安心</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-6xl mx-auto">
               {/* Steps */}
               {[
                 { 
                   id: 1, 
                   title: "聯繫詢價", 
                   desc: "24小時快速報價", 
                   icon: <Phone className="w-6 h-6" /> 
                 },
                 { 
                   id: 2, 
                   title: "專業評估", 
                   desc: "推薦最適合車型", 
                   icon: <Users className="w-6 h-6" /> 
                 },
                 { 
                   id: 3, 
                   title: "準時取貨", 
                   desc: "GPS即時追蹤", 
                   icon: <Truck className="w-6 h-6" /> 
                 },
                 { 
                   id: 4, 
                   title: "安全送達", 
                   desc: "簽收回條確認", 
                   icon: <ShieldCheck className="w-6 h-6" /> 
                 }
               ].map((step, idx) => (
                 <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                    {/* Arrow for desktop */}
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-8 -right-1/2 w-full flex justify-center pointer-events-none">
                        <ArrowRight className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                    
                    <div className="relative mb-6">
                       <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-2 group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                       </div>
                       <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold shadow-md border-2 border-white">
                          {step.id}
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">53年經驗 值得您信賴的 6 大理由</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">我們致力於提供超越客戶期待的優質服務</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Trophy className="w-8 h-8" />, title: "53年服務經驗", desc: "1972年成立，高雄在地深耕超過半世紀" },
              { icon: <Truck className="w-8 h-8" />, title: "80+專業車隊", desc: "歐翼車、氣墊車、尾門車，滿足各種運輸需求" },
              { icon: <Clock className="w-8 h-8" />, title: "98%準時送達率", desc: "嚴格時效管理，確保您的貨物準時送達" },
              { icon: <MapPin className="w-8 h-8" />, title: "GPS即時追蹤", desc: "透明化物流管理，隨時掌握貨物動態" },
              { icon: <MessageCircle className="w-8 h-8" />, title: "24小時客服支援", desc: "專業團隊隨時待命，快速回應您的需求" },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "全程保險保障", desc: "每次運送都投保，貨物安全有保障" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 text-brand rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Industries */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">服務超過 500+ 企業客戶</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">不論您是哪個產業，源利都能提供專業的運輸解決方案</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Factory />, title: "製造業", items: ["機械設備運送", "原料大批配送"] },
              { icon: <Store />, title: "零售業", items: ["商品多點配送", "庫存補貨運送"] },
              { icon: <Cpu />, title: "科技業", items: ["精密儀器運送", "無塵室設備配送"] },
              { icon: <HardHat />, title: "工程業", items: ["大型物件運送", "工地材料配送"] },
              { icon: <Palette />, title: "展覽業", items: ["展覽器材運送", "快速裝卸服務"] },
              { icon: <ShoppingBag />, title: "電商業", items: ["最後一哩路配送", "彈性配送時段"] },
            ].map((ind, i) => (
              <div key={i} className="group p-6 rounded-xl border border-slate-100 hover:border-brand/30 hover:shadow-md transition-all bg-white hover:bg-slate-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-brand group-hover:text-white transition-colors">
                    {ind.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{ind.title}</h3>
                </div>
                <ul className="space-y-2">
                  {ind.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">常見問題</h2>
            <p className="text-slate-600">這裡整理了客戶最常詢問的問題</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                  {openFaq === index ? 
                    <Minus className="w-5 h-5 text-brand shrink-0" /> : 
                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                  }
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
               onClick={onStartChat}
               className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-dark transition-colors"
            >
               還有其他問題？ 聯繫我們 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. CTA Section (保留) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">準備好開始運送了嗎？</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg">
            立即使用我們的 AI 智慧客服，只需簡單幾步，即刻取得專業運輸建議。
          </p>
          <button 
            onClick={onStartChat}
            className="px-10 py-5 bg-brand hover:bg-brand-dark text-white font-bold rounded-full text-xl shadow-xl transition-all hover:-translate-y-1"
          >
            立即取得報價
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;