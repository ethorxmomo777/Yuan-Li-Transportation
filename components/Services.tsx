import React from 'react';
import { Truck, Package, Anchor, AlertTriangle, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'domestic',
    title: '國內陸運',
    desc: '全台灣陸路運輸服務，高雄據點出發服務全台。彈性調度、即時回應，並提供 GPS 追蹤。',
    icon: <Truck className="w-8 h-8" />,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'delivery',
    title: '配送服務',
    desc: '最後一哩路配送，準時送達並提供簽收回條。適合電商、零售業，可指定時段配送。',
    icon: <Package className="w-8 h-8" />,
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 'port',
    title: '進出口碼頭配送',
    desc: '專精高雄港進出口貨物配送、機場報關及貨物運送，提供專業報關協助與完整物流鏈。',
    icon: <Anchor className="w-8 h-8" />,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    id: 'special',
    title: '特殊貨物運送',
    desc: '精密儀器（氣墊車）、大型設備（歐翼車）運送。提供客製化運輸方案與全程保險保障。',
    icon: <AlertTriangle className="w-8 h-8" />,
    color: 'bg-orange-50 text-orange-600',
  },
];

const Services: React.FC = () => {
  return (
    <div className="py-24 bg-white fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">專業物流服務 一站式解決方案</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            我們提供從倉儲、運輸到配送的完整解決方案，讓您無後顧之憂
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-brand/30 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm flex-grow">
                {service.desc}
              </p>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
                <div className="w-0 h-full bg-brand group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-sm text-slate-500">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            所有服務皆提供 GPS 即時追蹤、24小時客服支援
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;