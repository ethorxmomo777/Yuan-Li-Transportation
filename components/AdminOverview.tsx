import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, 
  Clock, CheckCircle, AlertCircle, Truck, Package, Calendar, FileText, Sparkles 
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminOverviewProps {
  onNavigate: (page: string, quoteId?: string) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingQuotes: 0,
    completedQuotes: 0,
    conversionRate: 0,
    totalQuotes: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // 計算數據
  useEffect(() => {
    const quotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
    
    // 基礎統計
    const total = quotes.length;
    const pending = quotes.filter((q: any) => q.status === 'pending').length;
    const completed = quotes.filter((q: any) => q.status === 'completed').length;
    
    // 計算營收 (模擬將字串轉數字)
    const revenue = quotes.reduce((acc: number, q: any) => {
      if (q.business && q.business.price) {
        return acc + (parseInt(q.business.price) || 0);
      }
      return acc;
    }, 0);

    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      totalRevenue: revenue,
      pendingQuotes: pending,
      completedQuotes: completed,
      conversionRate: rate,
      totalQuotes: total
    });

    // 生成最近活動 (取前 5 筆最新的詢價單變動)
    const activities = quotes
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map((q: any) => ({
        id: q.id,
        type: q.status === 'pending' ? 'new_quote' : q.status === 'completed' ? 'deal_closed' : 'status_update',
        title: q.customer.company,
        desc: q.status === 'pending' ? '提交了新詢價單' : q.status === 'completed' ? '已確認成交訂單' : '狀態已更新',
        time: new Date(q.updatedAt).toLocaleDateString(),
        amount: q.business.price
      }));
    
    setRecentActivities(activities);
  }, []);

  // 模擬圖表數據
  const weeklyData = [45, 70, 35, 60, 85, 65, 90]; // 0-100 scale

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      <AdminSidebar activePage="admin-overview" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
          <h2 className="text-xl font-bold text-slate-800">營運總覽儀表板</h2>
          <div className="text-sm text-slate-500">
             {new Date().toLocaleDateString()}
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Revenue */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-brand flex items-center justify-center">
                     <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                     <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
                  </span>
               </div>
               <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">本月預估營收</div>
               <div className="text-2xl font-bold text-slate-800">NT$ {stats.totalRevenue.toLocaleString()}</div>
            </div>

            {/* Pending */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-brand/30 transition-colors" onClick={() => onNavigate('admin-dashboard')}>
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                     <Clock className="w-5 h-5" />
                  </div>
                  {stats.pendingQuotes > 0 && (
                     <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full animate-pulse">
                        需處理
                     </span>
                  )}
               </div>
               <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">待處理詢價</div>
               <div className="text-2xl font-bold text-slate-800">{stats.pendingQuotes} <span className="text-sm text-slate-400 font-normal">/ {stats.totalQuotes} 總數</span></div>
            </div>

            {/* Clients */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                     <Users className="w-5 h-5" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                     <ArrowUpRight className="w-3 h-3 mr-1" /> +5
                  </span>
               </div>
               <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">本月新客戶</div>
               <div className="text-2xl font-bold text-slate-800">28</div>
            </div>

            {/* Conversion */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                     <Activity className="w-5 h-5" />
                  </div>
               </div>
               <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">詢價成交率</div>
               <div className="text-2xl font-bold text-slate-800">{stats.conversionRate}%</div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             
             {/* Revenue Chart */}
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-bold text-slate-800 text-lg">營收趨勢分析</h3>
                   <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1 outline-none">
                      <option>最近 7 天</option>
                      <option>最近 30 天</option>
                   </select>
                </div>
                
                {/* CSS Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                   {weeklyData.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                         <div 
                           className="w-full bg-brand rounded-t-lg transition-all duration-500 group-hover:bg-brand-dark relative" 
                           style={{height: `${h}%`}}
                         >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                               {h * 1000} 元
                            </div>
                         </div>
                         <div className="text-xs text-slate-400 font-medium">Day {i + 1}</div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Vehicle Distribution */}
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-6">車型需求分佈</h3>
                
                <div className="space-y-6">
                   {[
                     { label: '3.5 噸貨車', pct: 45, color: 'bg-blue-500' },
                     { label: '歐翼車', pct: 30, color: 'bg-purple-500' },
                     { label: '氣墊車', pct: 15, color: 'bg-orange-500' },
                     { label: '其他', pct: 10, color: 'bg-slate-300' },
                   ].map((item) => (
                      <div key={item.label}>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-700">{item.label}</span>
                            <span className="text-slate-500">{item.pct}%</span>
                         </div>
                         <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{width: `${item.pct}%`}}></div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl text-center">
                   <p className="text-xs text-slate-500">本月氣墊車需求增加 20%</p>
                </div>
             </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             
             {/* Activity Feed */}
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                <h3 className="font-bold text-slate-800 text-lg mb-6">最新動態</h3>
                <div className="space-y-4">
                   {recentActivities.length === 0 ? (
                      <div className="text-center text-slate-400 py-10">暫無活動</div>
                   ) : (
                      recentActivities.map((act) => (
                         <div key={act.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer" onClick={() => onNavigate('admin-quote', act.id)}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                               act.type === 'new_quote' ? 'bg-blue-50 text-brand' :
                               act.type === 'deal_closed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                               {act.type === 'new_quote' ? <FileText className="w-5 h-5" /> :
                                act.type === 'deal_closed' ? <CheckCircle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="font-bold text-slate-800 text-sm truncate">{act.title}</h4>
                               <p className="text-xs text-slate-500">{act.desc} {act.amount && `(NT$ ${parseInt(act.amount).toLocaleString()})`}</p>
                            </div>
                            <div className="text-xs text-slate-400 whitespace-nowrap">{act.time}</div>
                         </div>
                      ))
                   )}
                </div>
             </div>

             {/* Quick Actions */}
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
                <div>
                   <h3 className="font-bold text-lg mb-2">快速開始</h3>
                   <p className="text-slate-400 text-sm mb-6">使用 AI 工具加速您的工作流程</p>
                   
                   <div className="space-y-3">
                      <button 
                        onClick={() => onNavigate('admin-email-analysis')}
                        className="w-full py-3 bg-brand hover:bg-brand-dark rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-brand/20"
                      >
                         <Sparkles className="w-4 h-4" /> AI 信件分析
                      </button>
                      <button 
                        onClick={() => onNavigate('admin-dashboard')}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 font-medium transition-all"
                      >
                         <Truck className="w-4 h-4" /> 管理詢價單
                      </button>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-slate-300">系統運作正常</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOverview;