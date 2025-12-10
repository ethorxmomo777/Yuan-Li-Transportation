import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import About from './components/About';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/AdminDashboard';
import AdminQuoteDetail from './components/AdminQuoteDetail';
import AdminEmailAnalysis from './components/AdminEmailAnalysis';
import AdminOverview from './components/AdminOverview';
import AdminTaskManager from './components/AdminTaskManager';
import { MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const handleNavigate = (page: string, quoteId?: string) => {
    if (quoteId) {
      setSelectedQuoteId(quoteId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onStartChat={() => setIsChatOpen(true)} onViewFleet={() => handleNavigate('fleet')} />;
      case 'fleet':
        return <Fleet onStartChat={() => setIsChatOpen(true)} />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'admin-overview':
        return <AdminOverview onNavigate={handleNavigate} />;
      case 'admin-tasks':
        return <AdminTaskManager onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-quote':
        return <AdminQuoteDetail quoteId={selectedQuoteId!} onNavigate={handleNavigate} />;
      case 'admin-email-analysis':
        return <AdminEmailAnalysis onNavigate={handleNavigate} />;
      default:
        return <Hero onStartChat={() => setIsChatOpen(true)} onViewFleet={() => handleNavigate('fleet')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Show Navbar only for non-admin pages for cleaner admin view, or keep it. Keeping it for consistency but maybe simpler logic later if needed. */}
      {!currentPage.startsWith('admin') && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          onOpenChat={() => setIsChatOpen(true)} 
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-grow ${!currentPage.startsWith('admin') ? 'pt-20' : ''}`}>
        {renderContent()}
      </main>

      {/* Show Footer only for non-admin pages */}
      {!currentPage.startsWith('admin') && <Footer onNavigate={handleNavigate} />}

      {/* Chat Widget - Hide on admin pages */}
      {!currentPage.startsWith('admin') && (
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
      
      {/* Floating Action Button - Hide on admin pages */}
      {!isChatOpen && !currentPage.startsWith('admin') && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-brand hover:bg-brand-dark text-white rounded-full shadow-2xl z-50 transition-transform hover:scale-110 animate-bounce"
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;