import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, ChevronRight, Filter, Mail, Globe, Sparkles, Bell, User } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface Quote {
  id: string;
  source?: 'website' | 'ai-email';
  status: 'pending' | 'quoted' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  customer: {
    company: string;
    name: string;
    phone: string;
    email: string;
  };
  shipping: {
    originCity: string;
    originAddress: string;
    destCity: string;
    destAddress: string;
    cargoType: string;
    weight: string;
    pickupDate: string;
    pickupTime: string;
    deliveryDate: string;
    deliveryTime: string;
  };
  vehicle: {
    type: string;
    isRecommended: boolean;
    specialRequests: string[];
    notes: string;
  };
  business: {
    price: string | null;
    handler: string | null;
  };
}

interface AdminDashboardProps {
  onNavigate: (page: string, quoteId?: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Load data
  useEffect(() => {
    const loadData = () => {
      let storedQuotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
      
      if (storedQuotes.length === 0) {
        const testData: Quote[] = [
          {
            id: "YL-20251210-735",
            source: "website",
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            customer: { company: "XX科技有限公司", name: "王小明", phone: "0912-345-678", email: "wang@example.com" },
            shipping: { 
              originCity: "台北市", originAddress: "信義區信義路五段7號", 
              destCity: "高雄市", destAddress: "仁武區京富路30巷13弄9號",
              cargoType: "精密儀器", weight: "2噸",
              pickupDate: "2025-12-15", pickupTime: "上午",
              deliveryDate: "2025-12-16", deliveryTime: "下午"
            },
            vehicle: { type: "氣墊車", isRecommended: false, specialRequests: ["尾門", "保冷保溫"], notes: "貨物價值較高,請小心搬運。" },
            business: { price: null, handler: null }
          },
          {
            id: "YL-20251210-621",
            source: "ai-email",
            status: "quoted",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86000000).toISOString(),
            customer: { company: "OO物流股份有限公司", name: "李美華", phone: "0923-456-789", email: "lee@example.com" },
            shipping: { 
              originCity: "台中市", originAddress: "西屯區台灣大道三段", 
              destCity: "台南市", destAddress: "永康區中正北路",
              cargoType: "一般貨物", weight: "5噸",
              pickupDate: "2025-12-12", pickupTime: "下午",
              deliveryDate: "2025-12-13", deliveryTime: "上午"
            },
            vehicle: { type: "讓業務推薦", isRecommended: true, specialRequests: [], notes: "" },
            business: { price: "8500", handler: "陳經理" }
          },
          {
            id: "YL-20251209-458",
            source: "website",
            status: "completed",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            updatedAt: new Date(Date.now() - 100000000).toISOString(),
            customer: { company: "△△製造有限公司", name: "陳大明", phone: "0933-111-222", email: "chen@example.com" },
            shipping: { 
              originCity: "桃園市", originAddress: "龜山區文化一路", 
              destCity: "高雄市", destAddress: "小港區中鋼路",
              cargoType: "機械設備", weight: "8噸",
              pickupDate: "2025-12-08", pickupTime: "上午",
              deliveryDate: "2025-12-08", deliveryTime: "下午"
            },
            vehicle: { type: "8噸貨車", isRecommended: true, specialRequests: ["堆高機"], notes: "急件" },
            business: { price: "12000", handler: "林專員" }
          }
        ];
        storedQuotes = testData;
        localStorage.setItem('yuanli_quotes', JSON.stringify(testData));
      }
      setQuotes(storedQuotes);
    };
    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'quoted': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '待處理';
      case 'quoted': return '已報價';
      case 'completed': return '已成交';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      q.id.toLowerCase().includes(searchLower) ||
      q.customer.company.toLowerCase().includes(searchLower) ||
      q.customer.name.toLowerCase().includes(searchLower) ||
      q.customer.phone.includes(searchLower);
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    let matchesDate = true;
    const qDate = new Date(q.createdAt);
    const now = new Date();
    if (dateFilter === 'today') {
      matchesDate = qDate.getDate() === now.getDate() && qDate.getMonth() === now.getMonth();
    } else if (dateFilter === 'week') {
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      matchesDate = qDate >= oneWeekAgo;
    }
    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const counts = {
    all: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    completed: quotes.filter(q => q.status === 'completed').length
  };

  const handleQuickStatusUpdate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updatedQuotes = quotes.map(q => q.id === id ? { ...q, status: 'quoted' as const } : q);
    setQuotes(updatedQuotes);
    localStorage.setItem('yuanli_quotes', JSON.stringify(updatedQuotes));
  };

  const generatePDF = (e: React.MouseEvent, q: Quote) => {
    e.stopPropagation();
    if (!window.pdfMake) return;
    const docDefinition = {
        info: { title: `源利交通詢價單-${q.id}`, author: 'Yuan Li Transportation' },
        content: [
            { text: '源利交通股份有限公司', style: 'header', alignment: 'center', color: '#1E3A8A' },
            { text: '客戶詢價單 / QUOTATION REQUEST', style: 'title', alignment: 'center', margin: [0, 10, 0, 10] },
            { text: `詢價編號: ${q.id}`, alignment: 'right' },
            { text: `公司: ${q.customer.company} / 聯絡人: ${q.customer.name}`, margin: [0, 20, 0, 0] },
            { text: `路線: ${q.shipping.originCity} -> ${q.shipping.destCity}`, margin: [0, 5, 0, 0] }
        ],
        styles: { header: { fontSize: 18, bold: true }, title: { fontSize: 14, bold: true, color: '#4A90E2' } },
        defaultStyle: { font: 'Roboto' }
    };
    window.pdfMake.createPdf(docDefinition).download(`源利交通詢價單-${q.id}.pdf`);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar activePage="admin-dashboard" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         {/* Top Header */}
         <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
            <h2 className="text-xl font-bold text-slate-800">詢價單管理看板</h2>
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
               </div>
               <div className="h-8 w-px bg-gray-200"></div>
               <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">管理員</span>
               </div>
            </div>
         </header>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: '全部', count: counts.all, color: 'bg-white', text: 'text-slate-600', active: statusFilter === 'all', val: 'all' },
                { label: '🟡 待處理', count: counts.pending, color: 'bg-yellow-50', text: 'text-yellow-700', active: statusFilter === 'pending', val: 'pending' },
                { label: '🟢 已報價', count: counts.quoted, color: 'bg-green-50', text: 'text-green-700', active: statusFilter === 'quoted', val: 'quoted' },
                { label: '🔵 已成交', count: counts.completed, color: 'bg-blue-50', text: 'text-blue-700', active: statusFilter === 'completed', val: 'completed' }
              ].map((stat) => (
                <button 
                  key={stat.label}
                  onClick={() => setStatusFilter(stat.val)}
                  className={`p-4 rounded-xl border transition-all ${stat.active ? 'ring-2 ring-brand border-brand' : 'border-gray-200 hover:shadow-md'} ${stat.color} text-left`}
                >
                    <div className="text-2xl font-bold mb-1">{stat.count}</div>
                    <div className={`text-sm font-medium ${stat.text}`}>{stat.label}</div>
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-10">
               <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                     type="text" 
                     placeholder="搜尋公司、編號、聯絡人..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  />
               </div>
               
               <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                  <select 
                    value={dateFilter} 
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                     <option value="all">所有日期</option>
                     <option value="today">今天</option>
                     <option value="week">本週</option>
                  </select>
               </div>
            </div>

            {/* Quote List */}
            <div className="space-y-4">
               {filteredQuotes.map((quote) => (
                 <div 
                   key={quote.id}
                   onClick={() => onNavigate('admin-quote', quote.id)}
                   className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-brand/30"
                 >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                       <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-lg text-slate-700">{quote.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(quote.status)}`}>
                             {getStatusText(quote.status)}
                          </span>
                          
                          {quote.source === 'ai-email' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-bold border border-purple-200 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> AI 信件
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-100 text-sky-700 font-bold border border-sky-200 flex items-center gap-1">
                              <Globe className="w-3 h-3" /> 網站表單
                            </span>
                          )}
                       </div>
                       <div className="text-xs text-gray-400">
                          {new Date(quote.createdAt).toLocaleString()}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                       <div>
                          <div className="text-xs text-gray-400 mb-1">客戶</div>
                          <div className="font-bold text-slate-800">{quote.customer.company}</div>
                          <div className="text-sm text-slate-600">{quote.customer.name}</div>
                       </div>
                       <div>
                          <div className="text-xs text-gray-400 mb-1">路線</div>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                             {quote.shipping.originCity} <ChevronRight className="w-4 h-4 text-gray-300" /> {quote.shipping.destCity}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                             {quote.shipping.cargoType} · {quote.shipping.weight}
                          </div>
                       </div>
                       <div>
                          <div className="text-xs text-gray-400 mb-1">日期</div>
                          <div className="text-sm text-slate-600">
                             取: {quote.shipping.pickupDate}
                          </div>
                          <div className="text-sm text-slate-600">
                             送: {quote.shipping.deliveryDate}
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                       {quote.status === 'pending' && (
                         <button 
                           onClick={(e) => handleQuickStatusUpdate(e, quote.id)}
                           className="px-3 py-1.5 text-xs font-bold text-green-600 bg-green-50 rounded hover:bg-green-100 border border-green-200 transition-colors"
                         >
                           快速已報價
                         </button>
                       )}
                       <button 
                          onClick={(e) => generatePDF(e, quote)}
                          className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 rounded hover:bg-slate-100 border border-slate-200 flex items-center gap-1 transition-colors"
                       >
                          <Download className="w-3 h-3" /> PDF
                       </button>
                       <button className="px-3 py-1.5 text-xs font-bold text-white bg-brand rounded hover:bg-brand-dark transition-colors">
                          詳情
                       </button>
                    </div>
                 </div>
               ))}
               
               {filteredQuotes.length === 0 && (
                  <div className="text-center py-20 text-gray-400">
                     <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                     <p>沒有符合條件的詢價單</p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;