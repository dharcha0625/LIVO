import React, { useState } from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  X, 
  CheckCheck, 
  AlertTriangle, 
  TrendingUp, 
  ConciergeBell, 
  CheckCircle2, 
  Bot, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { AppNotification } from '../../types';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotifOpen, 
    setIsNotifOpen, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setCurrentTab 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'escalations' | 'sales'>('all');

  if (!isNotifOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.isRead;
    if (activeFilter === 'escalations') return n.type === 'escalation' || n.type === 'high_priority';
    if (activeFilter === 'sales') return n.type === 'sales_lead';
    return true;
  });

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'escalation':
      case 'high_priority':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'sales_lead':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'ai_handoff':
        return <Bot className="w-4 h-4 text-teal-600" />;
      default:
        return <ConciergeBell className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleNotifClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.linkTab) {
      setCurrentTab(notif.linkTab as NavTab);
    }
    setIsNotifOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsNotifOpen(false)}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Operations Activity & Notifications</h3>
            <p className="text-xs text-slate-500">Real-time alerts from AI and hotel departments</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsAsRead}
              className="p-1.5 text-xs text-slate-600 hover:text-teal-700 hover:bg-slate-200/60 rounded-lg transition-colors flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
            <button
              onClick={() => setIsNotifOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-1.5 bg-white text-xs overflow-x-auto">
          {(['all', 'unread', 'escalations', 'sales'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all whitespace-nowrap ${
                activeFilter === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400">No active alerts matching your filter.</p>
            </div>
          ) : (
            filteredNotifs.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotifClick(notif)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-xs ${
                  !notif.isRead 
                    ? 'bg-teal-50/30 border-teal-200/80 hover:bg-teal-50/60' 
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    !notif.isRead ? 'bg-white shadow-2xs border border-teal-100' : 'bg-slate-100'
                  }`}>
                    {getNotifIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className={`text-xs tracking-tight truncate ${!notif.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      {notif.linkTab && (
                        <span className="text-[10px] font-bold text-teal-700 flex items-center gap-1 group">
                          Jump to {notif.linkTab.toUpperCase()}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-teal-500 ml-auto"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
