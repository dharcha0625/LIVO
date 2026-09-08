import React, { useState } from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Bot, 
  TrendingUp, 
  Tablet, 
  ConciergeBell, 
  Kanban, 
  CheckSquare, 
  Inbox, 
  BarChart3, 
  BookOpen, 
  Settings, 
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';

interface NavItem {
  tab: NavTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    requests, 
    tasks, 
    opportunities, 
    threads, 
    currentUserRole 
  } = useApp();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pendingRequestsCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length;
  const activeTasksCount = tasks.filter(t => t.status !== 'COMPLETED').length;
  const unreadMessagesCount = threads.reduce((acc, t) => acc + t.unreadCount, 0);
  const activeLeadsCount = opportunities.filter(o => o.stage === 'New' || o.stage === 'Qualified').length;

  const mainNavItems: NavItem[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      tab: 'receptionist', 
      label: 'Receptionist AI', 
      icon: Bot, 
      badge: '24/7',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      highlight: true
    },
    { 
      tab: 'sales', 
      label: 'Sales AI', 
      icon: TrendingUp, 
      badge: 'AI CRM',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      highlight: true
    },
    { 
      tab: 'lancepad', 
      label: 'Lance Pad', 
      icon: Tablet, 
      badge: activeTasksCount > 0 ? activeTasksCount : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      highlight: true
    },
    { 
      tab: 'requests', 
      label: 'Guest Requests', 
      icon: ConciergeBell,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    { 
      tab: 'pipeline', 
      label: 'Sales Pipeline', 
      icon: Kanban,
      badge: activeLeadsCount > 0 ? activeLeadsCount : undefined,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    { 
      tab: 'tasks', 
      label: 'Tasks Board', 
      icon: CheckSquare 
    },
    { 
      tab: 'messages', 
      label: 'Messages (Unibox)', 
      icon: Inbox,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
    },
    { tab: 'analytics', label: 'Analytics', icon: BarChart3 },
    { tab: 'knowledge', label: 'Hotel Knowledge', icon: BookOpen },
    { tab: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-5 left-5 z-40 p-3 bg-slate-900 text-white rounded-full shadow-xl border border-slate-700 hover:bg-slate-800 transition-transform active:scale-95"
        aria-label="Toggle navigation menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-30 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
          <button 
            onClick={() => handleNavClick('dashboard')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-900/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-['Outfit',sans-serif]">
                  LANCE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  AI OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Hotel Operations Platform</p>
            </div>
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Item List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Operations Center
          </div>

          {mainNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;

            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/40'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : item.highlight ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} 
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span 
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Role & System Card */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] font-bold text-slate-200">{currentUserRole} Access</span>
              </div>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400"></span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Shift Active • Shift ends 04:30 PM
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Oracle Opera PMS</span>
              <span className="text-teal-400 font-semibold">Synced ✓</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
