import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Download, Mail, Phone, Trash2, Calendar, User, Truck, FileText, CheckCircle, Bell } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminQuoteDetailProps {
  quoteId: string;
  onNavigate: (page: string) => void;
}

const AdminQuoteDetail: React.FC<AdminQuoteDetailProps> = ({ quoteId, onNavigate }) => {
  const [quote, setQuote] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const quotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
    const found = quotes.find((q: any) => q.id === quoteId);
    if (found) {
      setQuote(found);
    }
  }, [quoteId]);

  if (!quote) return <div className="p-10 text-center">載入中...</div>;

  const handleSave = () => {
    setIsSaving(true);
    const quotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
    const index = quotes.findIndex((q: any) => q.id === quoteId);
    if (index !== -1) {
      const updatedQuote = { ...quote, updatedAt: new Date().toISOString() };
      quotes[index] = updatedQuote;
      localStorage.setItem('yuanli_quotes', JSON.stringify(quotes));
      setQuote(updatedQuote);
    }
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleDelete = () => {
    if (confirm(`確定要刪除詢價單 ${quoteId} 嗎？此操作無法復原。`)) {
      const quotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
      const filtered = quotes.filter((q: any) => q.id !== quoteId);
      localStorage.setItem('yuanli_quotes', JSON.stringify(filtered));
      onNavigate('admin-dashboard');
    }
  };

  const updateBusinessField = (field: string, value: any) => {
    setQuote((prev: any) => ({
      ...prev,
      business: { ...prev.business, [field]: value }
    }));
  };

  const generatePDF = () => {
     if (!window.pdfMake) return;
     const docDefinition = {
         info: { title: `源利交通詢價單-${quote.id}`, author: 'Yuan Li Transportation' },
         content: [
             { text: '源利交通股份有限公司', style: 'header', alignment: 'center', color: '#1E3A8A' },
             { text: '客戶詢價單 / QUOTATION REQUEST', style: 'title', alignment: 'center', margin: [0, 10, 0, 20] },
             { text: `詢價編號: ${quote.id}`, alignment: 'right', fontSize: 10 },
             { text: `列印日期: ${new Date().toLocaleDateString()}`, alignment: 'right', fontSize: 10, margin: [0, 0, 0, 10] },
             
             { text: '【客戶資訊】', style: 'subheader', margin: [0, 10, 0, 5] },
             { text: `公司: ${quote.customer.company}` },
             { text: `聯絡人: ${quote.customer.name}` },
             { text: `電話: ${quote.customer.phone}` },
             
             { text: '【運輸需求】', style: 'subheader', margin: [0, 10, 0, 5] },
             { text: `起運地: ${quote.shipping.originCity} ${quote.shipping.originAddress}` },
             { text: `目的地: ${quote.shipping.destCity} ${quote.shipping.destAddress}` },
             { text: `貨物: ${quote.shipping.cargoType} / ${quote.shipping.weight}` },
             
             { text: '【業務報價】', style: 'subheader', margin: [0, 10, 0, 5] },
             { text: `報價金額: ${quote.business.price ? `NT$ ${quote.business.price}` : '尚未報價'}`, bold: true }
         ],
         styles: { 
             header: { fontSize: 18, bold: true }, 
             title: { fontSize: 14, bold: true, color: '#4A90E2' },
             subheader: { fontSize: 12, bold: true, color: '#333333' }
         },
         defaultStyle: { font: 'Roboto' }
     };
     window.pdfMake.createPdf(docDefinition).download(`源利交通詢價單-${quote.id}.pdf`);
   };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar activePage="admin-dashboard" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         {/* Top Header */}
         <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('admin-dashboard')}
                className="p-1 hover:bg-gray-100 rounded-full text-slate-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-slate-800">詢價單詳情</h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-sm font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded">
                  {quoteId}
               </div>
               <div className="h-8 w-px bg-gray-200"></div>
               <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
         </header>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto pb-20">
              
              {/* Action Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                       {quote.customer.company}
                       <span className={`text-sm px-3 py-1 rounded-full border ${
                          quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          quote.status === 'quoted' ? 'bg-green-100 text-green-800 border-green-200' :
                          quote.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                       }`}>
                         {quote.status === 'pending' ? '待處理' : 
                          quote.status === 'quoted' ? '已報價' : 
                          quote.status === 'completed' ? '已成交' : '已取消'}
                       </span>
                    </h1>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-colors">
                       <Trash2 className="w-5 h-5" />
                    </button>
                    <button onClick={generatePDF} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors font-bold shadow-sm">
                       <Download className="w-4 h-4" /> 下載 PDF
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors font-bold shadow-md">
                       {isSaving ? '儲存中...' : <><Save className="w-4 h-4" /> 儲存更新</>}
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                 {/* Left Column: Details */}
                 <div className="lg:col-span-2 space-y-6">
                    
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                          <User className="w-5 h-5 text-brand" /> 客戶基本資訊
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">公司名稱</label>
                             <div className="font-medium text-slate-800">{quote.customer.company}</div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">聯絡人</label>
                             <div className="font-medium text-slate-800">{quote.customer.name}</div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">聯絡電話</label>
                             <div className="font-medium text-slate-800 flex items-center gap-2">
                                {quote.customer.phone}
                                <a href={`tel:${quote.customer.phone}`} className="text-brand hover:underline text-xs flex items-center gap-1">
                                   <Phone className="w-3 h-3" /> 撥打
                                </a>
                             </div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">Email</label>
                             <div className="font-medium text-slate-800 flex items-center gap-2 break-all">
                                {quote.customer.email}
                                <a href={`mailto:${quote.customer.email}`} className="text-brand hover:underline text-xs flex items-center gap-1">
                                   <Mail className="w-3 h-3" /> 寫信
                                </a>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Transport Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                          <Truck className="w-5 h-5 text-brand" /> 運輸需求
                       </h3>
                       <div className="space-y-6">
                          <div className="flex flex-col md:flex-row gap-8">
                             <div className="flex-1 relative pl-4 border-l-2 border-green-200">
                                <label className="text-xs text-gray-400 block mb-1">起運地</label>
                                <div className="font-bold text-lg text-slate-800">{quote.shipping.originCity}</div>
                                <div className="text-sm text-slate-600">{quote.shipping.originAddress}</div>
                             </div>
                             <div className="flex-1 relative pl-4 border-l-2 border-red-200">
                                <label className="text-xs text-gray-400 block mb-1">目的地</label>
                                <div className="font-bold text-lg text-slate-800">{quote.shipping.destCity}</div>
                                <div className="text-sm text-slate-600">{quote.shipping.destAddress}</div>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                             <div>
                                <label className="text-xs text-gray-400 block mb-1">貨物類型</label>
                                <div className="font-bold text-slate-800">{quote.shipping.cargoType}</div>
                             </div>
                             <div>
                                <label className="text-xs text-gray-400 block mb-1">重量/數量</label>
                                <div className="font-bold text-slate-800">{quote.shipping.weight}</div>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs text-gray-400 block mb-1">期望取貨時間</label>
                                <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
                                   <Calendar className="w-4 h-4 text-slate-400" />
                                   {quote.shipping.pickupDate} ({quote.shipping.pickupTime})
                                </div>
                             </div>
                             <div>
                                <label className="text-xs text-gray-400 block mb-1">期望送達時間</label>
                                <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
                                   <Calendar className="w-4 h-4 text-slate-400" />
                                   {quote.shipping.deliveryDate} ({quote.shipping.deliveryTime})
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Special Requests */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                          <CheckCircle className="w-5 h-5 text-brand" /> 車型與特殊需求
                       </h3>
                       <div className="space-y-4">
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">車型需求</label>
                             <div className="font-medium text-slate-800">
                                {quote.vehicle.type} 
                                {quote.vehicle.isRecommended && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">建議車型</span>}
                             </div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">特殊需求</label>
                             <div className="flex flex-wrap gap-2">
                                {quote.vehicle.specialRequests.length > 0 ? (
                                   quote.vehicle.specialRequests.map((req: string) => (
                                      <span key={req} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                                         ✓ {req}
                                      </span>
                                   ))
                                ) : (
                                   <span className="text-slate-400 text-sm">無</span>
                                )}
                             </div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 block mb-1">客戶備註</label>
                             <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                                {quote.vehicle.notes || "無"}
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Right Column: Business Actions */}
                 <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md border border-brand/20 p-6 sticky top-0">
                       <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                          <FileText className="w-5 h-5 text-brand" /> 業務處理
                       </h3>
                       
                       <div className="space-y-5">
                          <div>
                             <label className="text-sm font-bold text-slate-700 block mb-2">狀態更新</label>
                             <select 
                                value={quote.status}
                                onChange={(e) => setQuote({...quote, status: e.target.value})}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                             >
                                <option value="pending">🟡 待處理</option>
                                <option value="quoted">🟢 已報價</option>
                                <option value="completed">🔵 已成交</option>
                                <option value="cancelled">⚪ 已取消</option>
                             </select>
                          </div>

                          <div>
                             <label className="text-sm font-bold text-slate-700 block mb-2">報價金額 (NT$)</label>
                             <input 
                                type="number"
                                placeholder="請輸入金額"
                                value={quote.business.price || ''}
                                onChange={(e) => updateBusinessField('price', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-brand focus:ring-1 focus:ring-brand text-lg font-bold text-brand"
                             />
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                             <div>
                                <label className="text-xs text-gray-500 block mb-1">承辦人員</label>
                                <input 
                                   type="text"
                                   value={quote.business.handler || ''}
                                   onChange={(e) => updateBusinessField('handler', e.target.value)}
                                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                   placeholder="姓名"
                                />
                             </div>
                             <div>
                                <label className="text-xs text-gray-500 block mb-1">內部備註</label>
                                <textarea 
                                   value={quote.business.internalNotes || ''}
                                   onChange={(e) => updateBusinessField('internalNotes', e.target.value)}
                                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm h-20 resize-none"
                                   placeholder="僅內部可見..."
                                />
                             </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                             最後更新: {new Date(quote.updatedAt).toLocaleString()}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminQuoteDetail;