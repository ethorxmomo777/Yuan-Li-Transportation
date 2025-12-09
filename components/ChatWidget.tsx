import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage, Role } from '../types';
import { startChatSession, sendMessageToGemini, resetChatSession } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      resetChatSession();
      startChatSession();
      
      // Add initial greeting from AI (simulated based on system prompt logic)
      const initialMessage: ChatMessage = {
        id: 'init-1',
        role: Role.MODEL,
        text: "嗨！我是小源 😊 您的台灣陸運好幫手！請問今天需要從哪裡運送貨物呢？",
        timestamp: Date.now(),
      };
      setMessages([initialMessage]);
      hasInitialized.current = true;
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add User Message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text: userText,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI Response
      const responseText = await sendMessageToGemini(userText);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-end sm:p-6 bg-black/50 sm:bg-transparent transition-opacity duration-300">
      <div className="bg-white w-full h-full sm:w-[400px] sm:h-[600px] sm:rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-[#87CEEB] p-4 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">源利運輸客服</h3>
              <p className="text-xs text-blue-50 opacity-90">AI 助理 小源 (線上)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] gap-2 ${msg.role === Role.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === Role.USER ? 'bg-indigo-100' : 'bg-sky-100'
                }`}>
                  {msg.role === Role.USER ? (
                    <User className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <Bot className="w-5 h-5 text-sky-500" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === Role.USER 
                    ? 'bg-indigo-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                   <ReactMarkdown 
                    components={{
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mt-2 mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-sky-600" {...props} />
                    }}
                   >
                     {msg.text}
                   </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-sky-500" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-sky-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-sky-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-sky-400 rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="輸入訊息..."
              className="flex-1 bg-slate-100 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-sky-300 focus:outline-none transition-all placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-[#87CEEB] text-white rounded-full hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-slate-400">AI 智慧客服可能會產生錯誤訊息，請以正式報價單為準。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;