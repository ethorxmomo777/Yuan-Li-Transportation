import React from 'react';
import { Truck, Phone, Mail, MapPin, Settings } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#333333] text-white py-12 border-t border-slate-700">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand rounded flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-wide">源利交通股份有限公司</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              成立於 1972 年，深耕高雄超過 50 年的專業物流公司。我們秉持「永續發展」的經營理念，為全台客戶提供穩定、可靠的運輸服務。
            </p>
            <p className="text-gray-500 text-xs">
              統一編號：79475079
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:pl-12">
            <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-brand pl-3">快速連結</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand transition-colors">首頁</button></li>
              <li><button onClick={() => onNavigate('fleet')} className="hover:text-brand transition-colors">車型介紹</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand transition-colors">服務項目</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-brand transition-colors">關於我們</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-brand transition-colors">聯絡我們</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-brand pl-3">聯絡資訊</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-500 mb-1">貨物配送專線</span>
                  <span className="text-lg font-bold text-white">07-3757599</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                   <span className="block text-xs text-gray-500 mb-1">電子信箱</span>
                   <a href="mailto:service@yuanli-transport.com.tw" className="hover:text-brand transition-colors">
                     service@yuanli-transport.com.tw
                   </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-500 mb-1">公司地址</span>
                  <span>高雄市仁武區京富路30巷13弄9號1樓</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Yuan Li Transportation Co., Ltd. All rights reserved.</p>
          
          <div className="mt-6 pt-4 border-t border-slate-800 inline-block px-8">
            <button 
              onClick={() => onNavigate('admin-overview')}
              className="flex items-center gap-1 text-[#555555] hover:text-gray-400 transition-colors mx-auto"
            >
              <Settings className="w-3 h-3" />
              <span>業務管理系統</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;