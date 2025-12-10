import React from 'react';
import { LayoutDashboard, Mail, LogOut, Truck, Settings, Home, PieChart, ClipboardList } from 'lucide-react';

interface AdminSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'admin-overview', label: '營運總覽', icon: <PieChart className="w-5 h-5" /> },
    { id: 'admin-tasks', label: '任務管理', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'admin-dashboard', label: '詢價單列表', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'admin-email-analysis', label: 'AI 信件分析', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 transition-all duration-300 shadow-xl z-50">
      {/* Brand Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-900">
        <div className="w-8 h-8 bg-brand rounded flex items-center justify-center text-white shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div>
           <div className="font-bold text-white text-base tracking-tight leading-none">源利業務系統</div>
           <div className="text-[10px] text-slate-500 mt-1">v2.0.0 Pro</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">主要功能</div>
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-brand text-white shadow-md shadow-brand/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}

        <div className="px-3 mt-8 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">系統設定</div>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white text-slate-400 transition-all">
           <Settings className="w-5 h-5" />
           帳號設定
        </button>
      </nav>

      {/* User & Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-purple-500 flex items-center justify-center text-white font-bold text-xs border border-white/10">
              YL
           </div>
           <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Admin User</div>
              <div className="text-xs text-slate-500 truncate">admin@yuanli.com</div>
           </div>
        </div>
        <button 
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded hover:bg-slate-700 transition-colors"
        >
          <Home className="w-3 h-3" /> 返回官方網站
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;