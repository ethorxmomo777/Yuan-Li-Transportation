import React from 'react';
import { Target, Heart, TrendingUp, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Office" />
         </div>
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">關於源利交通</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
               深耕高雄超過 50 年的專業物流公司，我們秉持「永續發展」的經營理念，為客戶提供穩定、可靠的運輸服務。
            </p>
         </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-12">發展里程碑</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 space-y-12">
              {[
                { year: '1972', title: '公司成立', desc: '源利交通成立於高雄，開始提供基礎貨運服務。' },
                { year: '1990', title: '擴展網絡', desc: '建立全台運輸網絡，服務範圍擴及台北、台中。' },
                { year: '2010', title: '科技導入', desc: '全面導入 GPS 車隊管理系統，提升運輸透明度。' },
                { year: '2020', title: '車隊擴充', desc: '專業車隊擴充至 80+ 輛，包含氣墊車與歐翼車。' },
                { year: '2025', title: '智慧升級', desc: '導入 AI 智慧詢價系統，提供更即時的客戶服務。' },
              ].map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center group">
                  <div className="absolute -left-[9px] top-0 md:top-auto md:left-auto md:right-1/2 md:mr-8 w-4 h-4 rounded-full bg-white border-4 border-brand group-hover:scale-125 transition-transform z-10"></div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <span className="inline-block px-3 py-1 bg-brand/10 text-brand font-bold rounded-full mb-2 text-sm">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">核心經營理念</h3>
            <p className="text-slate-600">我們堅信，只有優質的服務與快樂的員工，才能創造永續的價值</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">永續發展</h4>
              <p className="text-slate-600">穩健經營、持續成長、創造長期價值，不追求短期利益，專注於長遠的信任關係。</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">客戶滿意</h4>
              <p className="text-slate-600">準時送達、透明溝通、專業服務。將客戶的貨物視為己出，確保每一次託付都完美達成。</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">員工福祉</h4>
              <p className="text-slate-600">提供優質的工作環境、完善的福利制度與成長空間，因為我們相信快樂的司機才有安全的運輸。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
           <div className="bg-brand rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-1/2">
               <h3 className="text-3xl font-bold mb-6">為什麼選擇源利？</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> 53 年物流經驗
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> 80+ 專業司機團隊
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> 多樣化車型選擇
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> GPS 即時追蹤
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> 24 小時客服回應
                 </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle className="w-5 h-5 text-blue-200" /> 完善貨物保險
                 </div>
               </div>
             </div>
             <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-sm">
                   <div className="text-3xl font-bold mb-1">53年</div>
                   <div className="text-blue-200 text-sm">服務經驗</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-sm">
                   <div className="text-3xl font-bold mb-1">80+</div>
                   <div className="text-blue-200 text-sm">專業團隊</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-sm">
                   <div className="text-3xl font-bold mb-1">2800萬</div>
                   <div className="text-blue-200 text-sm">資本額</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-sm">
                   <div className="text-3xl font-bold mb-1">98%</div>
                   <div className="text-blue-200 text-sm">準時率</div>
                </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;