import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AiAssistantModal } from './components/common/AiAssistantModal';
import { DemoWalkthroughModal } from './components/common/DemoWalkthroughModal';

import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { ReceptionistAiView } from './components/receptionist/ReceptionistAiView';
import { SalesAiView } from './components/sales/SalesAiView';
import { LancePadView } from './components/lancepad/LancePadView';
import { GuestRequestsView } from './components/requests/GuestRequestsView';
import { SalesPipelineView } from './components/pipeline/SalesPipelineView';
import { TasksView } from './components/tasks/TasksView';
import { MessagesUniboxView } from './components/messages/MessagesUniboxView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { HotelKnowledgeView } from './components/knowledge/HotelKnowledgeView';
import { SettingsView } from './components/settings/SettingsView';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, currentTab } = useApp();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'receptionist':
        return <ReceptionistAiView />;
      case 'sales':
        return <SalesAiView />;
      case 'lancepad':
        return <LancePadView />;
      case 'requests':
        return <GuestRequestsView />;
      case 'pipeline':
        return <SalesPipelineView />;
      case 'tasks':
        return <TasksView />;
      case 'messages':
        return <MessagesUniboxView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'knowledge':
        return <HotelKnowledgeView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex antialiased selection:bg-teal-500 selection:text-white">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderActiveTab()}
        </main>
      </div>

      {/* Global Modals, Drawers & Toasts */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <AiAssistantModal />
      <DemoWalkthroughModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
