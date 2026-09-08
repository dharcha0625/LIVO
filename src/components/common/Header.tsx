import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Globe, 
  PlayCircle, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  LogOut, 
  RotateCcw,
  Hotel,
  Zap
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUserRole,
    setCurrentUserRole,
    currentLanguage,
    setCurrentLanguage,
    setIsSearchOpen,
    isNotifOpen,
    setIsNotifOpen,
    setIsAiModalOpen,
    setIsDemoTourOpen,
    notifications,
    setIsLoggedIn,
    resetAllData
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const roles: UserRole[] = ['Admin', 'Manager', 'Receptionist', 'Housekeeping', 'Engineering', 'Sales', 'Concierge'];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Left: Hotel Title & Live Clock */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600/10 border border-teal-500/20 flex items-center justify-center text-teal-600">
            <Hotel className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight">Lance Grand Hotel</h1>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                Live 5-Star
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{currentTime} Local IST</span>
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all shadow-2xs group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span>Search rooms, guests, requests, tasks or knowledge...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: AI Status, Demo Launcher, Language, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live AI Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 text-white text-xs shadow-2xs">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </div>
          <span className="font-semibold text-[11px] text-slate-200 flex items-center gap-1">
            <Zap className="w-3 h-3 text-teal-400" /> AI Core Active
          </span>
          <span className="text-[10px] text-teal-300 font-mono">42ms</span>
        </div>

        {/* 3-5 Min Demo Tour CTA Button */}
        <button
          onClick={() => setIsDemoTourOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 rounded-lg transition-colors shadow-2xs"
          title="Interactive 3-5 minute guided demonstration"
        >
          <PlayCircle className="w-3.5 h-3.5 text-teal-600" />
          <span className="hidden sm:inline">Guided Demo</span>
        </button>

        {/* AI Assistant Omnibar Button */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-xs active:scale-98"
          title="Open AI Command Center"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
          <span className="hidden sm:inline">AI Command</span>
        </button>

        {/* Language Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsLangMenuOpen(!isLangMenuOpen);
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors"
            title="Switch Language"
          >
            <span className="text-sm">{currentLangObj.flag}</span>
            <span className="hidden xl:inline text-[11px] font-semibold">{currentLangObj.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Multilingual AI
              </div>
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors ${
                    currentLanguage === lang.code ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Staff Profile / Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsLangMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center font-bold text-xs">
              {currentUserRole.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:block text-left text-xs leading-tight pr-1">
              <p className="font-bold text-slate-800">{currentUserRole}</p>
              <p className="text-[10px] text-slate-500">Lance Staff</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden md:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">Signed in as {currentUserRole}</p>
                <p className="text-[11px] text-slate-500">admin@lancehotel.com</p>
              </div>

              <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Switch Role (Demo Mode)
              </div>

              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentUserRole(role);
                    setIsProfileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-1.5 text-left transition-colors ${
                    currentUserRole === role ? 'font-bold text-teal-700 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className={`w-3.5 h-3.5 ${currentUserRole === role ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{role}</span>
                  </span>
                  {currentUserRole === role && <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">Active</span>}
                </button>
              ))}

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={() => {
                  resetAllData();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Demo Mock Data</span>
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-left text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Exit Demo to Landing</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
