import React from 'react';
import { Truck, Box, Warehouse, ArrowRight, Map } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'charter',
    title: '專車配送服務',
    description: '提供 1.75噸 至 35噸 各式貨車專車直送，包含鷗翼車、平板車與溫控車，全台點對點快速直達。',
    icon: <Truck className="w-8 h-8 text-white" />,
  },
  {
    id: 'ltl',
    title: '回頭車與併車',
    description: '針對小量貨物提供經濟實惠的併車方案，以及每日南北往返的回頭車資源，有效降低運輸成本。',
    icon: <Box className="w-8 h-8 text-white" />,
  },
  {
    id: 'warehouse',
    title: '倉儲物流中心',
    description: '位於交通樞紐的現代化物流中心，提供長短期貨物暫存、理貨加工、庫存管理及最後一哩配送服務。',
    icon: <Warehouse className="w-8 h-8 text-white" />,
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">全方位陸運解決方案</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            無論是大型機台、棧板貨物還是急件配送，我們都有合適的車輛為您服務
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#87CEEB]/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-[#87CEEB] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center text-[#87CEEB] font-semibold group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;