import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, FileText, CheckCircle, Download, ArrowRight, RefreshCw, AlertCircle, Home } from 'lucide-react';

// Declare pdfMake types for TypeScript
declare global {
  interface Window {
    pdfMake: any;
  }
}

const cities = [
  "台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣", "苗栗縣", 
  "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", 
  "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣"
];

const cargoTypes = [
  "一般貨物", "精密儀器", "大型設備", "食品/冷藏", "危險品", "其他"
];

const vehicleTypes = [
  "3.5噸貨車", "5噸貨車", "8噸貨車", "10噸貨車", "歐翼車", "氣墊車"
];

interface FormState {
  company: string;
  name: string;
  phone: string;
  email: string;
  originCity: string;
  originAddress: string;
  destCity: string;
  destAddress: string;
  cargoType: string;
  cargoDetails: string;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  vehicleMode: 'recommend' | 'specific';
  specificVehicle: string;
  specialNeeds: string[];
  notes: string;
  agreed: boolean;
}

const initialFormState: FormState = {
  company: '',
  name: '',
  phone: '',
  email: '',
  originCity: '',
  originAddress: '',
  destCity: '',
  destAddress: '',
  cargoType: '',
  cargoDetails: '',
  pickupDate: '',
  pickupTime: '上午',
  deliveryDate: '',
  deliveryTime: '上午',
  vehicleMode: 'recommend',
  specificVehicle: '',
  specialNeeds: [],
  notes: '',
  agreed: false
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quoteID, setQuoteID] = useState('');

  // Auto-save logic
  useEffect(() => {
    const saved = localStorage.getItem('yl_inquiry_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!isSuccess) {
          // setFormData(parsed); // Optional: Enable auto-load logic if desired
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem('yl_inquiry_draft', JSON.stringify(formData));
    } else {
      localStorage.removeItem('yl_inquiry_draft');
    }
  }, [formData, isSuccess]);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name) newErrors.name = '請輸入聯絡人姓名';
    if (!formData.phone) newErrors.phone = '請輸入聯絡電話';
    else if (!/^09\d{8}$|^0\d{1,2}-\d{6,8}$/.test(formData.phone)) newErrors.phone = '電話格式錯誤';
    
    if (!formData.email) newErrors.email = '請輸入 Email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email 格式錯誤';

    if (!formData.originCity) newErrors.originCity = '請選擇起運縣市';
    if (!formData.destCity) newErrors.destCity = '請選擇目的地縣市';
    if (!formData.cargoType) newErrors.cargoType = '請選擇貨物類型';
    if (!formData.cargoDetails) newErrors.cargoDetails = '請輸入重量/數量';
    if (!formData.pickupDate) newErrors.pickupDate = '請選擇取貨日期';
    if (!formData.deliveryDate) newErrors.deliveryDate = '請選擇送達日期';
    if (!formData.agreed) newErrors.agreed = '請同意隱私權政策';

    if (formData.vehicleMode === 'specific' && !formData.specificVehicle) {
      newErrors.specificVehicle = '請選擇指定車型';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = e.target;
    if (name === 'specialNeeds') {
      setFormData(prev => {
        const newNeeds = checked 
          ? [...prev.specialNeeds, value]
          : prev.specialNeeds.filter(item => item !== value);
        return { ...prev, specialNeeds: newNeeds };
      });
    } else if (name === 'agreed') {
      setFormData(prev => ({ ...prev, agreed: checked }));
      if (checked) setErrors(prev => ({ ...prev, agreed: undefined }));
    }
  };

  const generateQuoteId = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `YL-${year}${month}${day}-${random}`;
  };

  const generatePDF = (qid: string) => {
    if (!window.pdfMake) {
      alert("PDF 生成組件尚未加載，請稍後再試");
      return;
    }

    const docDefinition = {
      info: {
        title: `源利交通詢價單-${qid}`,
        author: 'Yuan Li Transportation',
      },
      content: [
        { text: '源利交通股份有限公司', style: 'header', alignment: 'center', color: '#1E3A8A' },
        { text: 'YUAN LI TRANSPORTATION CO., LTD.', style: 'subheader', alignment: 'center', margin: [0, 0, 0, 20] },
        
        { text: '客戶詢價單 / QUOTATION REQUEST', style: 'title', alignment: 'center', margin: [0, 0, 0, 10] },
        
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `詢價編號: ${qid}`, style: 'label' },
                { text: `詢價日期: ${new Date().toLocaleDateString()}`, style: 'label', alignment: 'right' }
              ]
            ]
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 20]
        },

        // Customer Info
        { text: '【客戶基本資訊 / Customer Info】', style: 'sectionHeader' },
        {
          style: 'tableSection',
          table: {
            widths: ['30%', '70%'],
            body: [
              [{ text: '公司名稱', style: 'label' }, formData.company || '-'],
              [{ text: '聯絡人', style: 'label' }, formData.name],
              [{ text: '電話', style: 'label' }, formData.phone],
              [{ text: 'Email', style: 'label' }, formData.email],
            ]
          },
          layout: 'lightHorizontalLines'
        },

        // Transport Info
        { text: '【運輸需求 / Transport Details】', style: 'sectionHeader', margin: [0, 20, 0, 5] },
        {
          style: 'tableSection',
          table: {
            widths: ['30%', '70%'],
            body: [
              [{ text: '起運地', style: 'label' }, `${formData.originCity} ${formData.originAddress}`],
              [{ text: '目的地', style: 'label' }, `${formData.destCity} ${formData.destAddress}`],
              [{ text: '貨物類型', style: 'label' }, formData.cargoType],
              [{ text: '重量/數量', style: 'label' }, formData.cargoDetails],
              [{ text: '期望取貨', style: 'label' }, `${formData.pickupDate} (${formData.pickupTime})`],
              [{ text: '期望送達', style: 'label' }, `${formData.deliveryDate} (${formData.deliveryTime})`],
            ]
          },
          layout: 'lightHorizontalLines'
        },

        // Requirements
        { text: '【車型與特殊需求 / Requirements】', style: 'sectionHeader', margin: [0, 20, 0, 5] },
        {
          style: 'tableSection',
          table: {
            widths: ['30%', '70%'],
            body: [
              [{ text: '車型需求', style: 'label' }, formData.vehicleMode === 'recommend' ? '由專業人員推薦' : formData.specificVehicle],
              [{ text: '特殊需求', style: 'label' }, formData.specialNeeds.length > 0 ? formData.specialNeeds.join(', ') : '無'],
              [{ text: '備註', style: 'label' }, formData.notes || '無'],
            ]
          },
          layout: 'lightHorizontalLines'
        },

        // Footer
        { text: '\n\n' },
        { text: '本詢價單由系統自動生成', alignment: 'center', fontSize: 10, color: 'gray' },
        { text: '我們將在 24 小時內與您聯繫報價', alignment: 'center', fontSize: 10, color: 'gray' },
        { text: '源利交通 | 07-3757599 | service@yuanli-transport.com.tw', alignment: 'center', fontSize: 10, margin: [0, 5, 0, 0] }
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 12, bold: true },
        title: { fontSize: 16, bold: true, color: '#4A90E2' },
        sectionHeader: { fontSize: 12, bold: true, color: '#1E3A8A', margin: [0, 5, 0, 5] },
        label: { fontSize: 10, color: '#666666' },
        tableSection: { margin: [0, 5, 0, 15] }
      },
      defaultStyle: {
        fontSize: 10,
        font: 'Roboto' 
      }
    };

    window.pdfMake.createPdf(docDefinition).download(`源利交通詢價單-${qid}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    const newQuoteID = generateQuoteId();
    setQuoteID(newQuoteID);

    // Prepare data object for localStorage (Business System)
    const newQuote = {
      id: newQuoteID,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        company: formData.company,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      shipping: {
        originCity: formData.originCity,
        originAddress: formData.originAddress,
        destCity: formData.destCity,
        destAddress: formData.destAddress,
        cargoType: formData.cargoType,
        weight: formData.cargoDetails, // mapping cargoDetails to weight
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime
      },
      vehicle: {
        type: formData.vehicleMode === 'specific' ? formData.specificVehicle : '讓業務推薦',
        isRecommended: formData.vehicleMode === 'recommend',
        specialRequests: formData.specialNeeds,
        notes: formData.notes
      },
      business: {
        price: null,
        estimatedPickupDate: null,
        estimatedPickupTime: null,
        estimatedDeliveryDate: null,
        estimatedDeliveryTime: null,
        handler: null,
        internalNotes: null
      }
    };

    // Save to localStorage
    try {
      const existingQuotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
      existingQuotes.push(newQuote);
      localStorage.setItem('yuanli_quotes', JSON.stringify(existingQuotes));
    } catch (err) {
      console.error("Failed to save quote", err);
    }

    // Simulate API call and success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      generatePDF(newQuoteID);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setIsSuccess(false);
    setQuoteID('');
  };

  return (
    <div className="fade-in bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">立即詢價 取得專業報價</h2>
          <p className="text-xl text-slate-600">填寫詢價表單，我們將在 24 小時內與您聯繫</p>
        </div>

        {isSuccess ? (
          // Success State
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 animate-fade-in-up">
             <div className="bg-green-500 p-8 text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">詢價單已成功生成！</h3>
                <p className="opacity-90">詢價編號: {quoteID}</p>
             </div>
             
             <div className="p-10 text-center">
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                   您的詢價單 PDF 已自動下載。<br/>
                   我們已收到您的需求，將盡快安排專人為您評估報價。<br/>
                   若 PDF 未自動下載，請點擊下方按鈕。
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                   <button 
                      onClick={() => generatePDF(quoteID)}
                      className="px-8 py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg"
                   >
                      <Download className="w-5 h-5" /> 重新下載 PDF
                   </button>
                   <button 
                      onClick={handleReset}
                      className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                   >
                      <RefreshCw className="w-5 h-5" /> 送出新詢價
                   </button>
                </div>
                
                <div className="pt-8 border-t border-slate-100">
                   <p className="text-sm text-slate-400 mb-4">注意：由於瀏覽器限制，若 PDF 中文字體顯示異常，請參考 Email 收到的正式報價單。</p>
                   <a href="/" className="text-brand font-bold hover:underline inline-flex items-center gap-1">
                      <Home className="w-4 h-4" /> 返回首頁
                   </a>
                </div>
             </div>
          </div>
        ) : (
          // Form Layout
          <div className="flex flex-col lg:flex-row gap-8 shadow-2xl rounded-3xl overflow-hidden bg-white">
            
            {/* Left Sidebar: Company Info */}
            <div className="lg:w-2/5 bg-brand text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
               {/* Decorative Background */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"></div>

               <div className="relative z-10">
                  <div className="mb-10">
                     <h3 className="text-2xl font-bold mb-1">源利交通股份有限公司</h3>
                     <p className="text-sm opacity-80 font-medium tracking-wider">YUAN LI TRANSPORTATION</p>
                  </div>

                  <div className="space-y-8">
                     <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                           <Phone className="w-5 h-5" />
                           <span className="font-bold text-lg">貨物配送專線</span>
                        </div>
                        <p className="text-2xl font-bold tracking-wide">07-3757599</p>
                     </div>

                     <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 space-y-4">
                        <div className="flex items-start gap-3">
                           <Mail className="w-5 h-5 mt-1 shrink-0" />
                           <div>
                              <span className="font-bold block mb-1">Email</span>
                              <p className="text-sm opacity-90 break-all">service@yuanli-transport.com.tw</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-3">
                           <MapPin className="w-5 h-5 mt-1 shrink-0" />
                           <div>
                              <span className="font-bold block mb-1">公司地址</span>
                              <p className="text-sm opacity-90">高雄市仁武區京富路30巷13弄9號1樓</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-3">
                           <Clock className="w-5 h-5 mt-1 shrink-0" />
                           <div>
                              <span className="font-bold block mb-1">營業時間</span>
                              <p className="text-sm opacity-90">週一至週五 08:00-18:00</p>
                              <p className="text-sm opacity-90">週六 08:00-12:00</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white text-brand rounded-full flex items-center justify-center animate-bounce">
                        <MessageSquare className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="font-bold">或使用「AI 智慧詢價」</p>
                        <p className="text-xs opacity-80">點擊右下角圖示，快速取得報價建議</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Content: Form */}
            <div className="lg:w-3/5 p-8 md:p-12 bg-white">
               <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Section 1: Basic Info */}
                  <div className="space-y-6">
                     <h4 className="text-lg font-bold text-slate-800 border-l-4 border-brand pl-3">基本資訊</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                           <label className="block text-sm font-medium text-slate-700 mb-2">公司名稱 <span className="text-red-500">*</span></label>
                           <input 
                              type="text" 
                              name="company" 
                              value={formData.company} 
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.company ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20'} outline-none transition-all`} 
                              placeholder="請輸入公司完整名稱"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">聯絡人姓名 <span className="text-red-500">*</span></label>
                           <input 
                              type="text" 
                              name="name" 
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20'} outline-none transition-all`} 
                              placeholder="王小明"
                           />
                           {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">聯絡電話 <span className="text-red-500">*</span></label>
                           <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20'} outline-none transition-all`} 
                              placeholder="0912-345678"
                           />
                           {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div className="col-span-2">
                           <label className="block text-sm font-medium text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                           <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20'} outline-none transition-all`} 
                              placeholder="name@company.com"
                           />
                           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                     </div>
                  </div>

                  {/* Section 2: Transport Info */}
                  <div className="space-y-6">
                     <h4 className="text-lg font-bold text-slate-800 border-l-4 border-brand pl-3">運輸需求</h4>
                     
                     {/* Origin */}
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-brand"></div> 起運地 <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <select 
                              name="originCity"
                              value={formData.originCity}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.originCity ? 'border-red-500' : 'border-slate-200'} outline-none`}
                           >
                              <option value="">選擇縣市</option>
                              {cities.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                           <input 
                              type="text" 
                              name="originAddress"
                              value={formData.originAddress}
                              onChange={handleInputChange}
                              placeholder="詳細地址 (路段、門牌)" 
                              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 outline-none col-span-2" 
                           />
                        </div>
                        {errors.originCity && <p className="text-red-500 text-xs mt-1">{errors.originCity}</p>}
                     </div>

                     {/* Destination */}
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-red-500"></div> 目的地 <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <select 
                              name="destCity"
                              value={formData.destCity}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.destCity ? 'border-red-500' : 'border-slate-200'} outline-none`}
                           >
                              <option value="">選擇縣市</option>
                              {cities.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                           <input 
                              type="text" 
                              name="destAddress"
                              value={formData.destAddress}
                              onChange={handleInputChange}
                              placeholder="詳細地址 (路段、門牌)" 
                              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 outline-none col-span-2" 
                           />
                        </div>
                        {errors.destCity && <p className="text-red-500 text-xs mt-1">{errors.destCity}</p>}
                     </div>

                     {/* Cargo Details */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">貨物類型 <span className="text-red-500">*</span></label>
                           <select 
                              name="cargoType"
                              value={formData.cargoType}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.cargoType ? 'border-red-500' : 'border-slate-200'} outline-none`}
                           >
                              <option value="">請選擇類型</option>
                              {cargoTypes.map(t => <option key={t} value={t}>{t}</option>)}
                           </select>
                           {errors.cargoType && <p className="text-red-500 text-xs mt-1">{errors.cargoType}</p>}
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">重量/數量 <span className="text-red-500">*</span></label>
                           <input 
                              type="text" 
                              name="cargoDetails"
                              value={formData.cargoDetails}
                              onChange={handleInputChange}
                              placeholder="例: 2噸、5個棧板" 
                              className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.cargoDetails ? 'border-red-500' : 'border-slate-200'} outline-none`}
                           />
                           {errors.cargoDetails && <p className="text-red-500 text-xs mt-1">{errors.cargoDetails}</p>}
                        </div>
                     </div>

                     {/* Time */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">期望取貨時間 <span className="text-red-500">*</span></label>
                           <div className="flex gap-2">
                              <input 
                                 type="date" 
                                 name="pickupDate"
                                 value={formData.pickupDate}
                                 onChange={handleInputChange}
                                 className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.pickupDate ? 'border-red-500' : 'border-slate-200'} outline-none`}
                              />
                              <select 
                                 name="pickupTime"
                                 value={formData.pickupTime}
                                 onChange={handleInputChange}
                                 className="w-24 px-2 py-3 rounded-lg bg-slate-50 border border-slate-200 outline-none"
                              >
                                 <option value="上午">上午</option>
                                 <option value="下午">下午</option>
                              </select>
                           </div>
                           {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-2">期望送達時間 <span className="text-red-500">*</span></label>
                           <div className="flex gap-2">
                              <input 
                                 type="date" 
                                 name="deliveryDate"
                                 value={formData.deliveryDate}
                                 onChange={handleInputChange}
                                 className={`w-full px-4 py-3 rounded-lg bg-slate-50 border ${errors.deliveryDate ? 'border-red-500' : 'border-slate-200'} outline-none`}
                              />
                              <select 
                                 name="deliveryTime"
                                 value={formData.deliveryTime}
                                 onChange={handleInputChange}
                                 className="w-24 px-2 py-3 rounded-lg bg-slate-50 border border-slate-200 outline-none"
                              >
                                 <option value="上午">上午</option>
                                 <option value="下午">下午</option>
                              </select>
                           </div>
                           {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
                        </div>
                     </div>
                  </div>

                  {/* Section 3: Vehicle & Special */}
                  <div className="space-y-6">
                     <h4 className="text-lg font-bold text-slate-800 border-l-4 border-brand pl-3">車型與特殊需求</h4>
                     
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">車型需求 <span className="text-red-500">*</span></label>
                        <div className="flex gap-6 mb-4">
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="vehicleMode" 
                                 value="recommend"
                                 checked={formData.vehicleMode === 'recommend'}
                                 onChange={(e) => setFormData(prev => ({...prev, vehicleMode: e.target.value as any}))}
                                 className="w-4 h-4 text-brand focus:ring-brand"
                              />
                              <span className="text-slate-700">讓專業人員推薦 (建議)</span>
                           </label>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="vehicleMode" 
                                 value="specific" 
                                 checked={formData.vehicleMode === 'specific'}
                                 onChange={(e) => setFormData(prev => ({...prev, vehicleMode: e.target.value as any}))}
                                 className="w-4 h-4 text-brand focus:ring-brand"
                              />
                              <span className="text-slate-700">指定車型</span>
                           </label>
                        </div>
                        {formData.vehicleMode === 'specific' && (
                           <select 
                              name="specificVehicle"
                              value={formData.specificVehicle}
                              onChange={handleInputChange}
                              className={`w-full md:w-1/2 px-4 py-3 rounded-lg bg-slate-50 border ${errors.specificVehicle ? 'border-red-500' : 'border-slate-200'} outline-none animate-fade-in-up`}
                           >
                              <option value="">請選擇車型</option>
                              {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
                           </select>
                        )}
                        {errors.specificVehicle && <p className="text-red-500 text-xs mt-1">{errors.specificVehicle}</p>}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">特殊需求 (可複選)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                           {["需要尾門裝卸", "需要堆高機", "多點取貨", "多點送貨", "保冷/保溫", "夜間配送"].map(need => (
                              <label key={need} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                 <input 
                                    type="checkbox" 
                                    name="specialNeeds"
                                    value={need}
                                    checked={formData.specialNeeds.includes(need)}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 rounded text-brand focus:ring-brand"
                                 />
                                 <span className="text-sm text-slate-700">{need}</span>
                              </label>
                           ))}
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">其他備註</label>
                        <textarea 
                           name="notes"
                           value={formData.notes}
                           onChange={handleInputChange}
                           className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none h-24 resize-none"
                           placeholder="若有其他需求請在此說明"
                        ></textarea>
                     </div>
                  </div>

                  {/* Section 4: Privacy */}
                  <div className={`p-4 rounded-xl border ${errors.agreed ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50'}`}>
                     <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                           type="checkbox" 
                           name="agreed"
                           checked={formData.agreed}
                           onChange={handleCheckboxChange}
                           className="w-5 h-5 mt-0.5 rounded text-brand focus:ring-brand" 
                        />
                        <div>
                           <span className={`font-bold text-sm ${errors.agreed ? 'text-red-600' : 'text-slate-800'}`}>
                              我已閱讀並同意個人資料保護聲明
                           </span>
                           <p className="text-xs text-slate-500 mt-1">您提供的資訊僅用於報價與服務聯繫，我們將依照個資法妥善保管您的資料。</p>
                        </div>
                     </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full py-4 bg-brand hover:bg-brand-dark text-white font-bold text-lg rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {isSubmitting ? (
                        <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           處理中...
                        </>
                     ) : (
                        <>
                           <FileText className="w-5 h-5" /> 送出詢價並生成 PDF
                        </>
                     )}
                  </button>
               </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;