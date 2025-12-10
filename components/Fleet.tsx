import React from 'react';
import { Truck, Scale, Maximize, Package, Shield, CheckCircle } from 'lucide-react';

const vehicles = [
  {
    id: 1,
    name: '3.5 噸貨車',
    load: '3.5 噸',
    size: '4.3m × 1.9m × 1.9m',
    usage: '一般貨物、小型設備、零星配送',
    features: ['靈活機動', '市區配送首選', '尾門', 'GPS'],
    icon: <Truck className="w-6 h-6" />,
    // Updated 3.5T image
    image: 'https://tsam.blob.core.windows.net/hinocms23/attachments/clw0kljc500z0tm6iz2i2su5l-clrivnc2sacujp2dyn0vx4tmn-hino-200-key-visual-new-final-electric-1.desktop.png',
    highlight: false,
  },
  {
    id: 2,
    name: '5 噸貨車',
    load: '5 噸',
    size: '6.2m × 2.2m × 2.2m',
    usage: '中型貨物、家具、機械設備',
    features: ['承載量大', '經濟實惠', '尾門', 'GPS'],
    icon: <Truck className="w-6 h-6" />,
    // Updated 5T image
    image: 'https://imgcdn.zigwheels.vn/large/gallery/exterior/95/1002/hino-300-series-front-angle-low-view-902403.jpg',
    highlight: false,
  },
  {
    id: 3,
    name: '8 噸貨車',
    load: '8 噸',
    size: '7.5m × 2.3m × 2.4m',
    usage: '大批貨物、重型設備',
    features: ['長途運輸', '大量貨物', '尾門', '氣墊可選'],
    icon: <Truck className="w-6 h-6" />,
    // Large box truck side view (Existing placeholder)
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
    highlight: false,
  },
  {
    id: 4,
    name: '10 噸貨車',
    load: '10 噸',
    size: '8.5m × 2.4m × 2.5m',
    usage: '超大型貨物、整批貨運',
    features: ['最大承載', '專業運輸', '尾門', '氣墊可選'],
    icon: <Truck className="w-6 h-6" />,
    // Heavy duty truck (Existing placeholder)
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop',
    highlight: false,
  },
  {
    id: 5,
    name: '歐翼車',
    load: '多種噸數',
    size: '依車型而定',
    usage: '大型物件、機械設備、展覽器材',
    features: ['側開式車廂', '快速裝卸', '減少人力'],
    icon: <Package className="w-6 h-6" />,
    // Updated Wing truck image
    image: 'https://www.hino.com.tw//upload/carpage/bigpics//202403/2024030718285433241024.png',
    highlight: true,
  },
  {
    id: 6,
    name: '氣墊車',
    load: '精密運輸',
    size: '精密儀器專用',
    usage: '精密儀器、高價值貨物、易碎品',
    features: ['氣墊懸吊', '減震保護', '安全保障'],
    icon: <Shield className="w-6 h-6" />,
    // Updated Air Cushion truck image
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4zgBN1nkW0m52ABvzRq96KS77xqCLWTFWsg&s',
    highlight: true,
  },
];

interface FleetProps {
  onStartChat: () => void;
}

const Fleet: React.FC<FleetProps> = ({ onStartChat }) => {
  return (
    <div className="bg-slate-50 py-24 fade-in">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            專業車隊 滿足各種運輸需求
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            源利交通擁有超過 80 輛自有車輛，定期保養維護，確保每一次運送都安全無虞。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border group relative flex flex-col ${
                vehicle.highlight ? 'border-brand/40 ring-1 ring-brand/10' : 'border-slate-100'
              }`}
            >
              {/* Image Section */}
              <div className="h-56 overflow-hidden relative bg-slate-200">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {vehicle.highlight && (
                  <div className="absolute top-4 right-0 z-20 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-l-md shadow-md">
                    特色車型
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{vehicle.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" /> 
                      {vehicle.size}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    vehicle.highlight ? 'bg-brand/10 text-brand' : 'bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand'
                  }`}>
                    {vehicle.icon}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-xs text-slate-400 block mb-1">最大載重</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                       <Scale className="w-4 h-4 text-brand" /> {vehicle.load}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-xs text-slate-400 block mb-1">適用貨物</span>
                    <span className="text-sm text-slate-700">{vehicle.usage}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-auto">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-brand" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-500 mb-4">找不到適合的車型？</p>
          <button 
            onClick={onStartChat}
            className="inline-flex items-center gap-2 text-brand font-bold border-b-2 border-brand/20 pb-0.5 hover:border-brand transition-colors"
          >
            詢問 AI 客服小源，獲得專業建議 <Truck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fleet;