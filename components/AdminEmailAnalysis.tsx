import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Sparkles, Plus, Clock, User, Bell, 
  X, RefreshCw, ChevronRight, UserPlus, CheckCircle, Edit3, AlertCircle, Inbox, ArrowRight
} from 'lucide-react';
import { analyzeEmail } from '../services/geminiService';
import AdminSidebar from './AdminSidebar';

interface AdminEmailAnalysisProps {
  onNavigate: (page: string, quoteId?: string) => void;
}

interface MockEmail {
  id: number;
  from: string;
  senderName: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  status: 'unread' | 'read' | 'processed';
  isAnalyzed?: boolean;
}

// 模擬員工名單
const STAFF_LIST = ["陳經理", "林專員", "王小明", "張司機", "調度中心"];

const INITIAL_EMAILS: MockEmail[] = [
  {
    id: 1,
    from: "manager.lin@screwmaker.com.tw",
    senderName: "林經理",
    subject: "Re: 美國訂單出貨問題 - 需報價",
    preview: "源利您好, 我們收到美國客戶的訂單了,需要你們幫忙報價運送到高雄港...",
    date: "12/10 14:30",
    status: 'unread',
    content: `From: 林經理 <manager.lin@screwmaker.com.tw>
To: 源利交通 <service@yuanli-transport.com.tw>
Subject: Re: 美國訂單出貨問題

源利您好,

我們收到美國客戶的訂單了,需要你們幫忙報價運送到高雄港。

以下是客戶給我的訂單:
==========================================
Purchase Order #US-2025-1234
From: ABC Hardware Inc. (Los Angeles, USA)
To: 台灣螺絲製造有限公司
Order Details:
- M6 x 20mm Hex Bolts: 500 boxes
Total: 1000 boxes
Unit Price: USD 2.50/box
Buyer: ABC Hardware Inc.
==========================================

我們這邊的出貨資訊如下:
- 出貨地點: 台中市大雅區中清路三段88號 (我們的工廠)
- 目的地: 高雄港 (要出口到美國)
- 貨物: 上面那些螺絲,總共 1000 箱
- 我們已經打好棧板了,共 10 個棧板
- 每個棧板大概 110cm × 110cm × 120cm (高)
- 每個棧板重量大約 800 公斤左右
- 需要在 12/15 左右取貨
- 最晚 12/20 要送到高雄港,因為船期是 12/20

對了,棧板是木製的,應該需要那個什麼 ISPM15 的標準吧?
還有你們可以幫忙處理報關文件嗎?

麻煩報價,謝謝!

林經理
台灣螺絲製造有限公司
電話: 04-2566-8888
手機: 0912-123-456`
  },
  {
    id: 2,
    from: "deputy.chang@electronics-tw.com",
    senderName: "張副理",
    subject: "Fw: PO from Japan Client - Urgent (精密儀器)",
    preview: "Hi 源利, 轉發我們日本客戶的訂單給你們看,這批貨要送到高雄港出口...",
    date: "12/10 10:15",
    status: 'unread',
    content: `From: 張副理 <deputy.chang@electronics-tw.com>
To: service@yuanli-transport.com.tw
Subject: Fw: PO from Japan Client - Urgent

Hi 源利,

轉發我們日本客戶的訂單給你們看,這批貨要送到高雄港出口。

我們的運送需求是:

起點: 新竹科學園區,新竹市東區力行路15號 (我們工廠)
終點: 高雄港

貨物詳情:
- 50 個紙箱裝的電路板 (精密電子產品!)
- 每箱尺寸: 60cm × 40cm × 30cm
- 每箱重量: 約 25 公斤
- 總重量: 約 1.25 噸
- 已裝 6 個小棧板 (100cm × 80cm)

重要!特殊要求:
- 這是精密電子零件,一定要用氣墊車
- 要有避震和防潮措施
- 車廂溫度不要超過 30 度
- 不能堆疊太高,最多 2 層

時間:
- 希望 1/5 (日) 取貨
- 1/8 (三) 前一定要送到高雄港

請盡快報價,這單很重要!

張副理 (Kevin Chang)
台灣電子製造股份有限公司
Tel: 03-577-8899
Mobile: 0923-456-789`
  },
  {
    id: 3,
    from: "chen.manager@exhibition-design.com",
    senderName: "陳經理",
    subject: "急件!下週高雄展覽的器材運送",
    preview: "源利你好, 我們下週在高雄有個重要展覽,需要運器材過去,時間很趕! 要運的東西...",
    date: "12/09 18:45",
    status: 'unread',
    content: `From: 陳經理 <chen.manager@exhibition-design.com>
To: service@yuanli-transport.com.tw
Subject: 急件!下週高雄展覽的器材運送

源利你好,

我們下週在高雄有個重要展覽,需要運器材過去,時間很趕!

要運的東西:
1. 大型展示櫃 × 8 座
   - 每座尺寸: 2m (寬) × 1m (深) × 2.5m (高)
   - 每座重量: 約 150kg
   - 需要側開車才好裝卸!

2. 產品樣品 × 200 箱
   - 總重約 2 噸

3. LED 顯示螢幕 × 4 台
   - 55 吋大螢幕,有原廠包裝
   - 每台都很貴 (一台 10 萬),要非常小心!

起點: 台北市內湖區瑞光路 200 號 3 樓 (我們倉庫)
終點: 高雄展覽館 (高雄市前鎮區成功二路 39 號)

時間非常緊迫:
- 必須在 12/16 (一) 下午取貨
- 12/17 (二) 早上 8:00 前一定要到達高雄展覽館!
  因為我們當天早上要開始布展

特殊需求:
- 展示櫃很大,一定要歐翼車 (側開)
- 需要堆高機或 2-3 個壯丁協助裝卸
- 螢幕要特別小心,建議用氣泡紙多包幾層

這個案子很重要,拜託優先處理!

陳經理 (陳大明)
優質建材設計有限公司
Tel: 02-8797-5566`
  }
];

const AdminEmailAnalysis: React.FC<AdminEmailAnalysisProps> = ({ onNavigate }) => {
  const [emails, setEmails] = useState<MockEmail[]>(INITIAL_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'pending' | 'processed'>('pending');

  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  const handleSelectEmail = (id: number) => {
    setSelectedEmailId(id);
    setAnalysisResult(null); // Reset analysis when switching emails
    setIsEditing(false);
    
    // Mark as read if status is unread
    setEmails(prev => prev.map(e => e.id === id && e.status === 'unread' ? { ...e, status: 'read' } : e));
  };

  const handleAnalyze = async () => {
    if (!selectedEmail) return;
    setIsLoading(true);
    try {
      const data = await analyzeEmail(selectedEmail.content);
      setAnalysisResult(data);
      setEditForm(JSON.parse(JSON.stringify(data))); // Deep copy for editing
    } catch (error) {
      alert("分析失敗，請稍後再試。");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuote = () => {
    if (!analysisResult || !selectedEmail) return;
    
    const sourceData = editForm || analysisResult;

    const today = new Date();
    const id = `YL-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    const newQuote = {
      id: id,
      source: 'ai-email',
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      customer: {
        company: sourceData.customer.company || "未提供",
        name: sourceData.customer.contactPerson || "未提供",
        phone: sourceData.customer.phone || sourceData.customer.mobile || "未提供",
        email: sourceData.customer.email || "未提供"
      },
      
      shipping: {
        originCity: sourceData.shipping.originCity || "",
        originAddress: sourceData.shipping.originAddress || "",
        destCity: sourceData.shipping.destCity || "",
        destAddress: sourceData.shipping.destAddress || "",
        cargoType: sourceData.shipping.cargoType || "",
        weight: sourceData.shipping.totalWeight || "",
        pickupDate: sourceData.shipping.pickupDate || "",
        pickupTime: sourceData.shipping.pickupTime || "",
        deliveryDate: sourceData.shipping.deliveryDate || "",
        deliveryTime: sourceData.shipping.deliveryTime || ""
      },
      
      vehicle: {
        type: sourceData.requirements.vehicleType || "建議車型",
        isRecommended: true,
        specialRequests: sourceData.requirements.specialNeeds || [],
        notes: (sourceData.aiNotes || []).join('\n')
      },
      
      business: {
        price: null,
        handler: sourceData.workflow.assignTo, // Assign user
        internalNotes: `AI 建議:\n工作階段: ${sourceData.workflow.stage}\n預估報價: ${sourceData.workflow.estimatedPrice}\n建議車輛: ${sourceData.workflow.estimatedVehicles}\n\n原始郵件: ${selectedEmail.subject}`
      }
    };

    // Save to localStorage
    const quotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
    quotes.push(newQuote);
    localStorage.setItem('yuanli_quotes', JSON.stringify(quotes));
    
    // Mark email as processed
    setEmails(prev => prev.map(e => e.id === selectedEmail.id ? { ...e, status: 'processed' } : e));
    
    if(confirm(`已建立任務 ${id}！\n來源：${sourceData.customer.company}\n\n是否前往「任務管理」頁面進行指派？`)) {
      onNavigate('admin-tasks');
    } else {
      setSelectedEmailId(null);
      setAnalysisResult(null);
    }
  };

  const handleEditChange = (path: string, value: string) => {
    const update = (obj: any, pathArray: string[], val: any): any => {
      const [head, ...tail] = pathArray;
      if (!tail.length) {
        return { ...obj, [head]: val };
      }
      return { ...obj, [head]: update(obj[head] || {}, tail, val) };
    };
    setEditForm((prev: any) => update(prev, path.split('.'), value));
  };

  const filteredEmails = emails.filter(e => 
    viewMode === 'pending' ? e.status !== 'processed' : e.status === 'processed'
  );

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar activePage="admin-email-analysis" onNavigate={onNavigate} />

      {/* Main Content (Split Pane) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         {/* Top Header */}
         <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <Sparkles className="w-5 h-5 text-purple-600" /> AI 信件分析中心
            </h2>
            <div className="flex items-center gap-4">
               <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  模擬 Gmail 收件匣環境
               </div>
               <div className="h-8 w-px bg-gray-200"></div>
               <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
         </header>

         {/* Content Area */}
         <div className="flex-1 flex overflow-hidden">
            
            {/* Left Sidebar: Email List */}
            <div className="w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col shrink-0">
               {/* List Tabs */}
               <div className="p-4 border-b border-gray-100">
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode('pending')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === 'pending' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      📬 待處理 ({emails.filter(e => e.status !== 'processed').length})
                    </button>
                    <button 
                      onClick={() => setViewMode('processed')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === 'processed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      ✅ 已處理 ({emails.filter(e => e.status === 'processed').length})
                    </button>
                  </div>
               </div>

               {/* Email List Items */}
               <div className="flex-1 overflow-y-auto">
                 {filteredEmails.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                       <Inbox className="w-10 h-10 mx-auto mb-2 opacity-20" />
                       <p className="text-sm">沒有{viewMode === 'pending' ? '新' : '已處理'}信件</p>
                    </div>
                 ) : (
                    filteredEmails.map(email => (
                      <div 
                        key={email.id}
                        onClick={() => handleSelectEmail(email.id)}
                        className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-slate-50 relative ${selectedEmailId === email.id ? 'bg-blue-50/50 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent'}`}
                      >
                         <div className="flex justify-between items-start mb-1">
                            <span className={`text-sm font-bold truncate pr-2 ${email.status === 'unread' ? 'text-slate-900' : 'text-slate-600'}`}>
                              {email.senderName}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{email.date}</span>
                         </div>
                         <div className={`text-xs mb-1 truncate ${email.status === 'unread' ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                            {email.subject}
                         </div>
                         <div className="text-[11px] text-slate-400 truncate leading-snug">
                            {email.preview}
                         </div>
                         
                         {email.status === 'unread' && (
                            <div className="absolute top-4 right-4 w-2 h-2 bg-brand rounded-full"></div>
                         )}
                      </div>
                    ))
                 )}
               </div>
            </div>

            {/* Right Content: Detail View */}
            <div className="flex-1 overflow-y-auto bg-[#F5F5F5]">
               {selectedEmail ? (
                  <div className="flex flex-col xl:flex-row min-h-full">
                     
                     {/* Email Content (Middle) */}
                     <div className={`flex-1 bg-white p-8 border-r border-gray-200 transition-all ${analysisResult ? 'hidden 2xl:block 2xl:w-1/2' : 'w-full'}`}>
                        {/* Subject */}
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">{selectedEmail.subject}</h2>
                        
                        {/* Metadata */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                           <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                              {selectedEmail.senderName[0]}
                           </div>
                           <div>
                              <div className="font-bold text-slate-700 flex items-center gap-2">
                                {selectedEmail.senderName} 
                                <span className="text-xs font-normal text-slate-400">&lt;{selectedEmail.from}&gt;</span>
                              </div>
                              <div className="text-xs text-slate-400">
                                 {selectedEmail.date}
                              </div>
                           </div>
                        </div>

                        {/* Body */}
                        <div className="prose prose-sm max-w-none text-slate-600 whitespace-pre-wrap font-sans leading-relaxed">
                           {selectedEmail.content}
                        </div>

                        {/* Action Bar (if not analyzed) */}
                        {!analysisResult && viewMode === 'pending' && (
                           <div className="mt-12 text-center">
                              <button 
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="px-8 py-3 bg-brand text-white rounded-full font-bold shadow-lg hover:bg-brand-dark transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto disabled:opacity-70 disabled:scale-100"
                              >
                                 {isLoading ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                      AI 分析中...
                                    </>
                                 ) : (
                                    <>
                                      <Sparkles className="w-5 h-5" /> 啟動 AI 智慧分析
                                    </>
                                 )}
                              </button>
                              <p className="text-xs text-slate-400 mt-2">將自動提取運輸需求、貨物資訊與客戶聯絡方式</p>
                           </div>
                        )}
                     </div>

                     {/* Analysis Result (Right) */}
                     {analysisResult && (
                        <div className="w-full xl:w-[480px] 2xl:w-[500px] shrink-0 bg-[#F5F7FA] p-6 border-l border-gray-200 shadow-xl overflow-y-auto">
                           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up flex flex-col h-full">
                              
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-500" /> AI 分析結果
                                 </h3>
                                 <div className="flex items-center gap-2">
                                    <button onClick={handleAnalyze} className="text-slate-400 hover:text-brand p-1" title="重新分析">
                                       <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setAnalysisResult(null)} className="text-slate-400 hover:text-slate-600 p-1">
                                       <X className="w-5 h-5" />
                                    </button>
                                 </div>
                              </div>

                              {/* Content Scrollable Area */}
                              <div className="flex-1 overflow-y-auto pr-1 space-y-4 pb-4">
                                 
                                 {/* Summary */}
                                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex items-start gap-2 mb-2">
                                       <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div>
                                       <span className="text-xs font-bold text-slate-500">摘要</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{isEditing ? editForm.summary.subject : analysisResult.summary.subject}</p>
                                    <div className="mt-2 flex gap-2">
                                       <span className="text-[10px] px-2 py-0.5 bg-white border rounded text-slate-500">{isEditing ? editForm.summary.type : analysisResult.summary.type}</span>
                                       <span className={`text-[10px] px-2 py-0.5 border rounded font-bold ${(isEditing ? editForm.summary.urgency : analysisResult.summary.urgency) === '高' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                         {(isEditing ? editForm.summary.urgency : analysisResult.summary.urgency) === '高' ? '🔥 急件' : '一般'}
                                       </span>
                                    </div>
                                 </div>

                                 {/* Customer */}
                                 <div className="bg-white p-4 rounded-lg border border-slate-200">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1"><User className="w-3 h-3" /> 客戶資訊</h4>
                                    <div className="space-y-2">
                                       {['company:公司', 'contactPerson:聯絡人', 'phone:電話'].map(f => {
                                         const [key, label] = f.split(':');
                                         return (
                                           <div key={key} className="flex flex-col">
                                              <span className="text-[10px] text-slate-400">{label}</span>
                                              {isEditing ? (
                                                <input 
                                                  value={editForm.customer[key] || ''} 
                                                  onChange={e => handleEditChange(`customer.${key}`, e.target.value)}
                                                  className="text-sm border-b border-purple-200 focus:border-purple-500 outline-none w-full"
                                                />
                                              ) : (
                                                <span className="text-sm font-medium text-slate-700">{analysisResult.customer[key] || '-'}</span>
                                              )}
                                           </div>
                                         )
                                       })}
                                    </div>
                                 </div>

                                 {/* Shipping */}
                                 <div className="bg-white p-4 rounded-lg border border-slate-200">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1"><Clock className="w-3 h-3" /> 運輸需求</h4>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                       <div className="col-span-2">
                                          <span className="text-[10px] text-slate-400">起運地</span>
                                          {isEditing ? (
                                            <div className="flex gap-1">
                                               <input value={editForm.shipping.originCity} onChange={e => handleEditChange('shipping.originCity', e.target.value)} className="w-1/3 text-sm border-b" />
                                               <input value={editForm.shipping.originAddress} onChange={e => handleEditChange('shipping.originAddress', e.target.value)} className="w-2/3 text-sm border-b" />
                                            </div>
                                          ) : (
                                            <div className="text-sm font-medium text-slate-700">{analysisResult.shipping.originCity} {analysisResult.shipping.originAddress}</div>
                                          )}
                                       </div>
                                       <div className="col-span-2">
                                          <span className="text-[10px] text-slate-400">目的地</span>
                                          {isEditing ? (
                                            <div className="flex gap-1">
                                               <input value={editForm.shipping.destCity} onChange={e => handleEditChange('shipping.destCity', e.target.value)} className="w-1/3 text-sm border-b" />
                                               <input value={editForm.shipping.destAddress} onChange={e => handleEditChange('shipping.destAddress', e.target.value)} className="w-2/3 text-sm border-b" />
                                            </div>
                                          ) : (
                                            <div className="text-sm font-medium text-slate-700">{analysisResult.shipping.destCity} {analysisResult.shipping.destAddress}</div>
                                          )}
                                       </div>
                                       <div>
                                          <span className="text-[10px] text-slate-400">貨物</span>
                                          {isEditing ? (
                                             <input value={editForm.shipping.cargoType} onChange={e => handleEditChange('shipping.cargoType', e.target.value)} className="w-full text-sm border-b" />
                                          ) : (
                                             <div className="text-sm font-medium text-slate-700">{analysisResult.shipping.cargoType}</div>
                                          )}
                                       </div>
                                       <div>
                                          <span className="text-[10px] text-slate-400">重量</span>
                                          {isEditing ? (
                                             <input value={editForm.shipping.totalWeight} onChange={e => handleEditChange('shipping.totalWeight', e.target.value)} className="w-full text-sm border-b" />
                                          ) : (
                                             <div className="text-sm font-medium text-slate-700">{analysisResult.shipping.totalWeight}</div>
                                          )}
                                       </div>
                                    </div>
                                 </div>

                                 {/* Task Assignment (New) */}
                                 <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <h4 className="text-xs font-bold text-purple-700 uppercase mb-3 flex items-center gap-1">
                                       <UserPlus className="w-3 h-3" /> 任務指派與流程
                                    </h4>
                                    
                                    <div className="space-y-3">
                                       <div>
                                          <span className="text-[10px] text-purple-500 block mb-1">指派人員</span>
                                          <select 
                                             value={editForm?.workflow.assignTo || analysisResult.workflow.assignTo || ""}
                                             onChange={(e) => handleEditChange('workflow.assignTo', e.target.value)}
                                             className="w-full p-2 text-sm bg-white border border-purple-200 rounded-lg text-slate-700 outline-none focus:border-purple-500"
                                          >
                                             <option value="">請選擇人員</option>
                                             {STAFF_LIST.map(staff => (
                                                <option key={staff} value={staff}>{staff}</option>
                                             ))}
                                          </select>
                                       </div>
                                       
                                       <div className="flex gap-4">
                                          <div className="flex-1">
                                             <span className="text-[10px] text-purple-500 block mb-1">預估報價</span>
                                             {isEditing ? (
                                                <input value={editForm.workflow.estimatedPrice} onChange={e => handleEditChange('workflow.estimatedPrice', e.target.value)} className="w-full text-sm p-1 border-b bg-transparent" />
                                             ) : (
                                                <div className="text-sm font-bold text-purple-900">{analysisResult.workflow.estimatedPrice}</div>
                                             )}
                                          </div>
                                          <div className="flex-1">
                                             <span className="text-[10px] text-purple-500 block mb-1">建議車輛</span>
                                             {isEditing ? (
                                                <input value={editForm.workflow.estimatedVehicles} onChange={e => handleEditChange('workflow.estimatedVehicles', e.target.value)} className="w-full text-sm p-1 border-b bg-transparent" />
                                             ) : (
                                                <div className="text-sm font-bold text-purple-900">{analysisResult.workflow.estimatedVehicles}</div>
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* AI Notes (Improved) */}
                                 {analysisResult.aiNotes && analysisResult.aiNotes.length > 0 && (
                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                       <h4 className="text-xs font-bold text-amber-700 uppercase mb-2 flex items-center gap-1">
                                          <AlertCircle className="w-3 h-3" /> AI 備註
                                       </h4>
                                       <ul className="space-y-1">
                                          {analysisResult.aiNotes.map((note: string, idx: number) => (
                                             <li key={idx} className="text-xs text-amber-800 flex items-start gap-1.5">
                                                <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 shrink-0"></span>
                                                {note}
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 )}

                              </div>

                              {/* Actions (Bottom) */}
                              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 shrink-0">
                                 {isEditing ? (
                                    <div className="flex gap-2">
                                       <button 
                                          onClick={() => setIsEditing(false)}
                                          className="flex-1 py-3 bg-white text-slate-500 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all"
                                       >
                                          取消編輯
                                       </button>
                                       <button 
                                          onClick={handleCreateQuote}
                                          className="flex-1 py-3 bg-brand text-white rounded-lg font-bold shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                                       >
                                          <CheckCircle className="w-4 h-4" /> 確認並生成
                                       </button>
                                    </div>
                                 ) : (
                                    <div className="flex flex-col gap-2">
                                       <button 
                                          onClick={handleCreateQuote}
                                          className="w-full py-3 bg-brand text-white rounded-lg font-bold shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                                       >
                                          <CheckCircle className="w-4 h-4" /> 確認並建立任務
                                       </button>
                                       <button 
                                          onClick={() => setIsEditing(true)}
                                          className="w-full py-2.5 bg-white text-brand border border-brand/20 rounded-lg font-bold hover:bg-brand/5 transition-all flex items-center justify-center gap-2 text-sm"
                                       >
                                          <Edit3 className="w-4 h-4" /> 手動編輯
                                       </button>
                                    </div>
                                 )}
                              </div>

                           </div>
                        </div>
                     )}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50">
                     <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                        <Mail className="w-10 h-10 opacity-30" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-600 mb-2">請選擇一封郵件</h3>
                     <p className="text-sm max-w-xs text-center">
                        點擊左側列表中的郵件以查看內容並使用 AI 進行分析
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminEmailAnalysis;