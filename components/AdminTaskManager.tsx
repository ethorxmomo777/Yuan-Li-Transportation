import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, Mail, Globe, Clock, 
  Calendar, MapPin, User, ChevronRight, AlertCircle, CheckCircle, 
  ArrowRight, Truck, DollarSign, Bell
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface Task {
  id: string;
  source: 'website' | 'ai-email';
  status: 'pending' | 'processing' | 'quoted' | 'completed' | 'cancelled';
  customer: {
    company: string;
    name: string;
  };
  shipping: {
    originCity: string;
    destCity: string;
    cargoType: string;
  };
  business: {
    price: string | null;
    handler: string | null; // 負責人
  };
  urgency?: 'high' | 'normal' | 'low';
  createdAt: string;
}

interface AdminTaskManagerProps {
  onNavigate: (page: string, quoteId?: string) => void;
}

const STAFF_LIST = ["陳經理", "林專員", "王小明", "張司機", "調度中心"];

interface KanbanCardProps {
  task: Task;
  onNavigate: (page: string, quoteId?: string) => void;
  onAssign: (taskId: string, user: string) => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onNavigate, onAssign, onStatusChange }) => (
  <div 
    className={`bg-white p-4 rounded-xl border shadow-sm mb-3 hover:shadow-md transition-all cursor-pointer group relative ${task.urgency === 'high' ? 'border-l-4 border-l-red-500' : 'border-gray-200'}`}
    onClick={() => onNavigate('admin-quote', task.id)}
  >
    {/* Header Tags */}
    <div className="flex justify-between items-start mb-3">
       <div className="flex gap-2">
          {task.source === 'ai-email' ? (
            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-700 font-bold flex items-center gap-1">
              <Mail className="w-3 h-3" /> 信件
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] bg-sky-100 text-sky-700 font-bold flex items-center gap-1">
              <Globe className="w-3 h-3" /> 網站
            </span>
          )}
          {task.urgency === 'high' && (
             <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> 急件
             </span>
          )}
       </div>
       <button className="text-slate-300 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
       </button>
    </div>

    {/* Content */}
    <div className="mb-3">
       <h4 className="font-bold text-slate-800 text-sm mb-1">{task.customer.company}</h4>
       <p className="text-xs text-slate-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> 
          {task.shipping.originCity} <ArrowRight className="w-3 h-3" /> {task.shipping.destCity}
       </p>
    </div>

    <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 bg-slate-50 p-2 rounded">
       <Truck className="w-3 h-3" /> {task.shipping.cargoType}
    </div>

    {/* Footer / Actions */}
    <div className="flex items-center justify-between pt-3 border-t border-gray-50" onClick={e => e.stopPropagation()}>
       {/* Assignee Selector */}
       <div className="flex items-center gap-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${task.business.handler ? 'bg-brand' : 'bg-slate-300'}`}>
             {task.business.handler ? task.business.handler[0] : <User className="w-3 h-3" />}
          </div>
          <select 
             className="text-xs bg-transparent border-none outline-none text-slate-600 cursor-pointer max-w-[80px]"
             value={task.business.handler || ""}
             onChange={(e) => onAssign(task.id, e.target.value)}
          >
             <option value="" disabled>指派人員</option>
             {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
       </div>

       {/* Price or Action */}
       {task.status === 'quoted' || task.status === 'completed' ? (
          <div className="text-sm font-bold text-slate-700 flex items-center gap-1">
             <DollarSign className="w-3 h-3" /> {task.business.price || '-'}
          </div>
       ) : (
          <div className="flex gap-1">
            {task.status === 'pending' && (
              <button 
                onClick={() => onAssign(task.id, "我")}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs transition-colors"
              >
                接單
              </button>
            )}
          </div>
       )}
    </div>

    {/* Quick Move (Hover) */}
    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
       {task.status !== 'completed' && (
          <button 
             onClick={(e) => {
                e.stopPropagation();
                const next = task.status === 'pending' ? 'processing' : task.status === 'processing' ? 'quoted' : 'completed';
                onStatusChange(task.id, next);
             }}
             className="p-1.5 bg-brand text-white rounded-full shadow-lg hover:bg-brand-dark"
             title="移至下一階段"
          >
             <ChevronRight className="w-4 h-4" />
          </button>
       )}
    </div>
  </div>
);

const AdminTaskManager: React.FC<AdminTaskManagerProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');

  // Load Data
  useEffect(() => {
    const loadData = () => {
      // Compatibility with existing quote structure, treating quotes as tasks
      let storedQuotes = JSON.parse(localStorage.getItem('yuanli_quotes') || '[]');
      
      // Ensure data has necessary fields for tasks if missing
      const processedTasks = storedQuotes.map((q: any) => ({
        ...q,
        urgency: q.vehicle?.notes?.includes('急') || q.id.includes('735') ? 'high' : 'normal', // Mock logic for urgency
        status: q.status === 'pending' && q.business?.handler ? 'processing' : q.status // Introduce 'processing' status logic
      }));

      setTasks(processedTasks);
    };
    loadData();
    
    // Refresh every 5s to simulate real-time updates
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAssign = (taskId: string, user: string) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        // If assigning a user to a pending task, move it to processing
        const newStatus = t.status === 'pending' ? 'processing' : t.status;
        return { 
          ...t, 
          status: newStatus as any,
          business: { ...t.business, handler: user } 
        };
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem('yuanli_quotes', JSON.stringify(updatedTasks));
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus as any } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem('yuanli_quotes', JSON.stringify(updatedTasks));
  };

  const getColumns = () => {
    const filtered = tasks.filter(t => 
      (filterUser === 'all' || t.business.handler === filterUser) &&
      (t.customer.company.includes(searchTerm) || t.id.includes(searchTerm))
    );

    return {
      pending: filtered.filter(t => t.status === 'pending'),
      processing: filtered.filter(t => t.status === 'processing'),
      quoted: filtered.filter(t => t.status === 'quoted'),
      completed: filtered.filter(t => t.status === 'completed'),
    };
  };

  const columns = getColumns();

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      <AdminSidebar activePage="admin-tasks" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0 z-20">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Truck className="w-6 h-6 text-brand" /> 任務管理中心
              </h2>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex gap-2">
                 <button 
                    onClick={() => setFilterUser('all')}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filterUser === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                 >
                    全體任務
                 </button>
                 <button 
                    onClick={() => setFilterUser('我')}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filterUser === '我' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                 >
                    我的任務
                 </button>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="搜尋客戶或編號..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand/50 outline-none"
                 />
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                 <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                 <Bell className="w-5 h-5" />
              </button>
           </div>
        </header>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
           <div className="flex h-full gap-6 min-w-[1200px]">
              
              {/* Column 1: New / Pending */}
              <div className="flex-1 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 h-full">
                 <div className="p-4 flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                       <h3 className="font-bold text-slate-700">新進需求</h3>
                       <span className="px-2 py-0.5 bg-white rounded-full text-xs font-bold text-slate-400 shadow-sm">{columns.pending.length}</span>
                    </div>
                 </div>
                 <div className="p-3 overflow-y-auto flex-1 scrollbar-hide">
                    {columns.pending.map(task => (
                      <KanbanCard 
                        key={task.id} 
                        task={task} 
                        onNavigate={onNavigate} 
                        onAssign={handleAssign} 
                        onStatusChange={handleStatusChange} 
                      />
                    ))}
                    {columns.pending.length === 0 && (
                       <div className="h-32 flex items-center justify-center text-slate-300 text-sm">暫無新需求</div>
                    )}
                 </div>
              </div>

              {/* Column 2: Processing */}
              <div className="flex-1 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 h-full">
                 <div className="p-4 flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                       <h3 className="font-bold text-slate-700">處理中</h3>
                       <span className="px-2 py-0.5 bg-white rounded-full text-xs font-bold text-slate-400 shadow-sm">{columns.processing.length}</span>
                    </div>
                 </div>
                 <div className="p-3 overflow-y-auto flex-1 scrollbar-hide">
                    {columns.processing.map(task => (
                      <KanbanCard 
                        key={task.id} 
                        task={task} 
                        onNavigate={onNavigate} 
                        onAssign={handleAssign} 
                        onStatusChange={handleStatusChange} 
                      />
                    ))}
                 </div>
              </div>

              {/* Column 3: Quoted */}
              <div className="flex-1 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 h-full">
                 <div className="p-4 flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                       <h3 className="font-bold text-slate-700">已報價 / 待確認</h3>
                       <span className="px-2 py-0.5 bg-white rounded-full text-xs font-bold text-slate-400 shadow-sm">{columns.quoted.length}</span>
                    </div>
                 </div>
                 <div className="p-3 overflow-y-auto flex-1 scrollbar-hide">
                    {columns.quoted.map(task => (
                      <KanbanCard 
                        key={task.id} 
                        task={task} 
                        onNavigate={onNavigate} 
                        onAssign={handleAssign} 
                        onStatusChange={handleStatusChange} 
                      />
                    ))}
                 </div>
              </div>

              {/* Column 4: Completed */}
              <div className="flex-1 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 h-full">
                 <div className="p-4 flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       <h3 className="font-bold text-slate-700">已成交</h3>
                       <span className="px-2 py-0.5 bg-white rounded-full text-xs font-bold text-slate-400 shadow-sm">{columns.completed.length}</span>
                    </div>
                 </div>
                 <div className="p-3 overflow-y-auto flex-1 scrollbar-hide">
                    {columns.completed.map(task => (
                      <KanbanCard 
                        key={task.id} 
                        task={task} 
                        onNavigate={onNavigate} 
                        onAssign={handleAssign} 
                        onStatusChange={handleStatusChange} 
                      />
                    ))}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminTaskManager;