import React, { useState, useEffect, useRef } from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Search, 
  X, 
  DoorClosed, 
  User, 
  ConciergeBell, 
  CheckSquare, 
  TrendingUp, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { guestService } from '../../services/guestService';
import { hotelService } from '../../services/hotelService';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setCurrentTab, 
    guests, 
    requests, 
    tasks, 
    opportunities, 
    knowledge 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingGuests = q ? guestService.searchGuests(q, guests).slice(0, 3) : [];
  const matchingRequests = q ? requests.filter(r => 
    r.request.toLowerCase().includes(q) || 
    r.roomNumber.includes(q) || 
    r.guestName.toLowerCase().includes(q)
  ).slice(0, 3) : [];
  const matchingTasks = q ? tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.roomNumber.includes(q) ||
    t.assignedToStaffName.toLowerCase().includes(q)
  ).slice(0, 3) : [];
  const matchingOpportunities = q ? opportunities.filter(o =>
    o.company.toLowerCase().includes(q) ||
    o.contactName.toLowerCase().includes(q) ||
    o.eventType.toLowerCase().includes(q)
  ).slice(0, 3) : [];
  const matchingKnowledge = q ? hotelService.searchKnowledge(q, knowledge).slice(0, 3) : [];

  const hasResults = q && (
    matchingGuests.length > 0 ||
    matchingRequests.length > 0 ||
    matchingTasks.length > 0 ||
    matchingOpportunities.length > 0 ||
    matchingKnowledge.length > 0
  );

  const navigateTo = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-teal-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search rooms, guests, requests, tasks, sales leads, policies..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto text-teal-500 mb-2 opacity-60" />
              <p className="text-xs font-semibold text-slate-700">Quick Navigation Suggestions</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                <button onClick={() => { setQuery('Room 402'); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Room 402</button>
                <button onClick={() => { setQuery('Towels'); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Extra Towels</button>
                <button onClick={() => { setQuery('Late checkout'); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">Late Checkout Policy</button>
                <button onClick={() => { setQuery('TechNova'); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">TechNova Lead</button>
                <button onClick={() => { setQuery('AC Maintenance'); }} className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700">AC Maintenance</button>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for a room number, guest name, or department.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Guests Results */}
              {matchingGuests.length > 0 && (
                <div>
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3 h-3 text-teal-600" />
                    <span>Guests & Rooms</span>
                  </div>
                  <div className="space-y-1">
                    {matchingGuests.map(g => (
                      <button
                        key={g.id}
                        onClick={() => navigateTo('receptionist')}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                            {g.roomNumber}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-slate-900">{g.name}</p>
                              {g.vipStatus && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                                  {g.vipTier} VIP
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">{g.email} • {g.phone}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Guest Requests Results */}
              {matchingRequests.length > 0 && (
                <div>
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ConciergeBell className="w-3 h-3 text-amber-600" />
                    <span>Live Guest Requests</span>
                  </div>
                  <div className="space-y-1">
                    {matchingRequests.map(r => (
                      <button
                        key={r.id}
                        onClick={() => navigateTo('requests')}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">Room {r.roomNumber} – {r.request}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">{r.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{r.department} • Assigned to {r.assignedStaffName || 'Unassigned'}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks Results */}
              {matchingTasks.length > 0 && (
                <div>
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-3 h-3 text-emerald-600" />
                    <span>Lance Pad Operational Tasks</span>
                  </div>
                  <div className="space-y-1">
                    {matchingTasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => navigateTo('lancepad')}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{t.id}: {t.title}</p>
                          <p className="text-[11px] text-slate-500">Room {t.roomNumber} • {t.department} • {t.assignedToStaffName}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {t.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sales Leads Results */}
              {matchingOpportunities.length > 0 && (
                <div>
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-blue-600" />
                    <span>Sales Pipeline Leads</span>
                  </div>
                  <div className="space-y-1">
                    {matchingOpportunities.map(o => (
                      <button
                        key={o.id}
                        onClick={() => navigateTo('pipeline')}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{o.company} – {o.eventType}</p>
                          <p className="text-[11px] text-slate-500">{o.guestCount} Guests • Stage: {o.stage} • Value: ₹{(o.estimatedValue / 100000).toFixed(1)}L</p>
                        </div>
                        <span className="text-xs font-bold text-blue-700">₹{(o.estimatedValue / 100000).toFixed(1)}L</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Knowledge Base Results */}
              {matchingKnowledge.length > 0 && (
                <div>
                  <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-purple-600" />
                    <span>Hotel Knowledge Base</span>
                  </div>
                  <div className="space-y-1">
                    {matchingKnowledge.map(k => (
                      <button
                        key={k.id}
                        onClick={() => navigateTo('knowledge')}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{k.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{k.content}</p>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          {k.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search indexed with Opera PMS & Lance Knowledge Base</span>
          <span>Press <strong>ESC</strong> to close</span>
        </div>
      </div>
    </div>
  );
};
