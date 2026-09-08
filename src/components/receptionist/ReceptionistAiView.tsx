import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Terminal, 
  ShieldAlert, 
  Check, 
  Share2, 
  Zap, 
  Building2, 
  Tag,
  Star
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { guestService } from '../../services/guestService';
import { aiService } from '../../services/aiService';

export const ReceptionistAiView: React.FC = () => {
  const { 
    guests, 
    requests, 
    currentLanguage, 
    setCurrentLanguage, 
    executeAiAssistantPrompt,
    setCurrentTab,
    escalateRequest
  } = useApp();

  const [selectedGuestId, setSelectedGuestId] = useState<string>(guests[0]?.id || 'GST-101');
  const [activeChannel, setActiveChannel] = useState<'WhatsApp' | 'Phone' | 'SMS' | 'Web' | 'Email'>('WhatsApp');
  const [inputText, setInputText] = useState('');
  const [conversationHistory, setConversationHistory] = useState([
    {
      sender: 'guest',
      text: 'Hi, we are in Room 402. Could we get 2 extra bath towels and dental kits please?',
      time: '10:41 AM'
    },
    {
      sender: 'ai',
      text: 'Good morning Mr. Rahul Krishnan! Absolutely. I have logged your request and our housekeeping team has been dispatched with 2 luxury bath towels and dental kits to Room 402. Estimated delivery is within 8 minutes.',
      time: '10:41 AM',
      intent: 'Housekeeping / Towels & Toiletries',
      dept: 'Housekeeping',
      sla: '10 Mins'
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [lastParsedIntent, setLastParsedIntent] = useState<any>({
    intentCategory: 'Housekeeping / Linen',
    department: 'Housekeeping',
    roomNumber: '402',
    priority: 'Normal',
    confidence: 0.98,
    action: 'Dispatched TASK-501 to Priya Sharma on Lance Pad'
  });

  const currentGuest = guests?.find(g => g.id === selectedGuestId) || guests?.[0];
  const guestRequests = currentGuest 
    ? requests.filter(r => r.guestId === currentGuest.id || r.roomNumber === currentGuest.roomNumber)
    : [];

  const preferences = currentGuest?.specialPreferences || (currentGuest?.notes ? [currentGuest.notes] : []);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add guest message
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversationHistory(prev => [...prev, { sender: 'guest', text, time: now }]);
    setInputText('');
    setIsAiTyping(true);

    setTimeout(() => {
      const parsed = aiService.parseGuestOrSalesInput(text, currentLanguage);
      setLastParsedIntent(parsed);

      setConversationHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          text: parsed.responseMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intent: parsed.intentCategory,
          dept: parsed.department,
          sla: parsed.priority === 'High' ? '5 Mins' : '15 Mins'
        }
      ]);
      setIsAiTyping(false);
    }, 600);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
    handleSendMessage(prompt);
  };

  const handleEscalateToManager = () => {
    if (guestRequests.length > 0) {
      escalateRequest(guestRequests[0].id, 'Guest requested human supervisor intervention');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Module Title Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white border border-teal-800/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Receptionist AI Agent (24/7 Guest Service)</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
              Active • 42ms
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Autonomous multi-channel guest conversational agent with Opera PMS real-time verification and automated task dispatching.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {(['WhatsApp', 'Phone', 'SMS', 'Web', 'Email'] as const).map(channel => (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChannel === channel
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Layout: Guests & PMS (Left), Interactive Chat (Center), AI Intent & PMS Sync (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Opera PMS & Guest Profile (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Oracle Opera PMS Record</h2>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                VERIFIED
              </span>
            </div>

            {/* Guest Selector Dropdown */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Select In-House Guest:</label>
              <select
                value={selectedGuestId}
                onChange={e => setSelectedGuestId(e.target.value)}
                className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
              >
                {guests.map(g => (
                  <option key={g.id} value={g.id}>
                    Room {g.roomNumber} – {g.name} ({g.vipTier})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Guest PMS Card */}
            {currentGuest && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{currentGuest.name}</span>
                  {currentGuest.vipStatus && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {currentGuest.vipTier || 'VIP'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Room Number</span>
                    <span className="font-mono font-bold text-slate-900">#{currentGuest.roomNumber} ({currentGuest.roomType || 'Deluxe Room'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Stay Dates</span>
                    <span className="font-semibold text-slate-800">{currentGuest.checkInDate || currentGuest.checkIn} - {currentGuest.checkOutDate || currentGuest.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Folio Balance</span>
                    <span className="font-mono font-bold text-emerald-700">₹{(currentGuest.folioBalance ?? 0).toLocaleString('en-IN')} (Paid)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Loyalty Points</span>
                    <span className="font-mono font-semibold text-slate-800">{currentGuest.loyaltyPoints ?? 0} pts</span>
                  </div>
                </div>

                {preferences.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preferences & Notes:</span>
                    <div className="flex flex-wrap gap-1">
                      {preferences.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Escalation Button */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={handleEscalateToManager}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Escalate to Duty Manager</span>
              </button>
            </div>
          </div>

          {/* Multilingual Selector */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Receptionist AI Multilingual</span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              AI translates and understands guest messages in real time.
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`p-1.5 rounded-lg text-xs text-center border transition-all ${
                    currentLanguage === lang.code
                      ? 'bg-teal-600 text-white font-bold border-teal-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-sm">{lang.flag}</span>
                  <span className="text-[10px] block truncate">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Live Chat Interface (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-[650px] bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Receptionist AI Agent</p>
                <p className="text-[10px] text-slate-400">Serving {currentGuest.name} (Room {currentGuest.roomNumber}) via {activeChannel}</p>
              </div>
            </div>

            <span className="text-[10px] font-mono text-teal-300 bg-slate-800 px-2 py-0.5 rounded">
              24/7 Autonomous
            </span>
          </div>

          {/* Quick Presets Bar */}
          <div className="p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            <button
              onClick={() => handleQuickPrompt('I need 2 extra towels and bathrobes in Room 402.')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-teal-400 rounded-lg text-[11px] font-semibold text-slate-700 whitespace-nowrap"
            >
              Extra Towels
            </button>
            <button
              onClick={() => handleQuickPrompt('The AC is making noise and not cooling.')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-rose-400 rounded-lg text-[11px] font-semibold text-slate-700 whitespace-nowrap"
            >
              AC Issue (Urgent)
            </button>
            <button
              onClick={() => handleQuickPrompt('Can I get late checkout until 2 PM tomorrow?')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-purple-400 rounded-lg text-[11px] font-semibold text-slate-700 whitespace-nowrap"
            >
              Late Checkout
            </button>
            <button
              onClick={() => handleQuickPrompt('What time does the rooftop swimming pool close?')}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] font-semibold text-slate-700 whitespace-nowrap"
            >
              Pool Timings
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40">
            {conversationHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'guest'
                      ? 'bg-teal-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.sender === 'ai' && msg.intent && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                        {msg.intent}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                        Dept: {msg.dept}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        SLA: {msg.sla}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isAiTyping && (
              <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit shadow-2xs">
                <Bot className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="text-xs text-slate-500 font-medium">Receptionist AI is thinking & checking PMS...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Type a guest request for Room ${currentGuest.roomNumber}...`}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAiTyping}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: AI Intent Extraction & Dispatch Status (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Live Intent Analysis</span>
              </h3>
              <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">
                Confidence: 98%
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Classified Category</span>
                <span className="font-bold text-slate-900">{lastParsedIntent.intentCategory}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Dept</span>
                  <span className="font-bold text-teal-700">{lastParsedIntent.department}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Room</span>
                  <span className="font-bold text-slate-900">Room {lastParsedIntent.roomNumber}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Autonomous Dispatch Action</span>
                <p className="font-semibold text-slate-800 text-[11px] leading-tight mt-0.5">
                  {lastParsedIntent.action}
                </p>
              </div>
            </div>

            {/* Jump to Lance Pad CTA */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setCurrentTab('lancepad')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Track on Lance Pad Tablet</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>
          </div>

          {/* Active Tasks for this Room */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Dispatched Tasks for Room {currentGuest.roomNumber}
            </h3>
            {guestRequests.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">No active tasks for this room.</p>
            ) : (
              <div className="space-y-2">
                {guestRequests.slice(0, 2).map(r => (
                  <div key={r.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{r.request}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                        {r.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Assigned: {r.assignedStaffName || 'Auto-Routing'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
