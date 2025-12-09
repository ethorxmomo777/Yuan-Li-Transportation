import React from 'react';
import { Truck, Star, Info } from 'lucide-react';

const vehicles = [
  {
    id: 1,
    name: '3.5 噸小貨車',
    desc: '市區配送、小批量貨物',
    featured: false,
  },
  {
    id: 2,
    name: '5 噸貨車',
    desc: '中型貨物、城市運輸',
    featured: false,
  },
  {
    id: 3,
    name: '大貨車',
    desc: '大批量貨物運輸',
    featured: false,
  },
  {
    id: 4,
    name: '聯結車',
    desc: '長程運輸、大宗貨物',
    featured: false,
  },
  {
    id: 5,
    name: '鷗翼氣墊車',
    desc: '精密設備、特殊貨物',
    featured: true,
  },
];

const Fleet: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            多元車型，滿足各種需求
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            我們擁有規模龐大的自有車隊，能根據您的貨物屬性提供最合適的運輸方案
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`relative bg-white p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${
                vehicle.featured
                  ? 'border-yellow-400 ring-1 ring-yellow-400/50 shadow-md transform hover:-translate-y-1'
                  : 'border-slate-100 hover:border-[#87CEEB]'
              }`}
            >
              {vehicle.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  特色服務
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  vehicle.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-500 group-hover:bg-[#87CEEB]/10 group-hover:text-[#87CEEB]'
                }`}>
                  <Truck className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {vehicle.name}
                </h3>
                
                <p className="text-sm text-slate-500 leading-snug">
                  {vehicle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;