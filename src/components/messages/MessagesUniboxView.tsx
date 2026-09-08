import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Inbox, 
  Search, 
  Send, 
  Bot, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCheck, 
  Clock, 
  User, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { MessageThread, Channel } from '../../types';

export const MessagesUniboxView: React.FC = () => {
  const { threads, sendGuestMessage } = useApp();
  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]?.id || 'thread-1');
  const [replyText, setReplyText] = useState('');

  const selectedThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || replyText;
    if (!text.trim() || !selectedThread) return;

    sendGuestMessage(selectedThread.id, text, 'staff');
    setReplyText('');
  };

  const getChannelIcon = (channel: Channel) => {
    switch (channel) {
      case 'WhatsApp':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Email':
        return <Mail className="w-3.5 h-3.5 text-blue-600" />;
      case 'Phone':
        return <Phone className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const aiSuggestions = [
    'Certainly! Our concierge will arrange this for you immediately.',
    'Your request has been prioritized with our floor team.',
    'Thank you for staying with us at Lance Grand. May I assist with anything else?'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Omnichannel Unibox (All Inbound Feeds)</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consolidated conversations from WhatsApp, Phone Call Transcripts, SMS, Email & Web Chat with AI draft suggestions.
          </p>
        </div>
      </div>

      {/* 2-Column Unibox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden h-[650px]">
        {/* Left Column: Threads List (4 Cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/40">
          <div className="p-3.5 border-b border-slate-200">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Conversations ({threads.length})</h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setSelectedThreadId(thread.id)}
                className={`p-3.5 hover:bg-slate-100/80 transition-colors cursor-pointer ${
                  selectedThreadId === thread.id ? 'bg-purple-50/60 border-l-4 border-purple-600' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {getChannelIcon(thread.channel)}
                    <span className="text-xs font-bold text-slate-900">{thread.guestName}</span>
                    {thread.roomNumber && (
                      <span className="text-[10px] font-mono text-slate-500">#{thread.roomNumber}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{thread.lastMessageTime}</span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-1">{thread.lastMessageText}</p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    {thread.channel}
                  </span>
                  {thread.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Feed & AI Draft Suggestions (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-full bg-white">
          {selectedThread ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {(selectedThread.guestName || 'GU').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{selectedThread.guestName}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      {getChannelIcon(selectedThread.channel)}
                      <span>Via {selectedThread.channel}</span>
                      {selectedThread.roomNumber && <span>• Room {selectedThread.roomNumber}</span>}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  AI Assisted
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30">
                {(selectedThread.messages || []).map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'staff' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'staff'
                          ? 'bg-slate-900 text-white rounded-br-xs'
                          : msg.sender === 'ai'
                          ? 'bg-teal-50 border border-teal-200 text-teal-900 rounded-bl-xs shadow-2xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Suggested Quick Replies */}
              <div className="p-3 bg-purple-50/50 border-t border-purple-100 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] font-bold uppercase text-purple-700 shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" /> AI Suggestions:
                </span>
                {aiSuggestions.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => setReplyText(reply)}
                    className="px-2.5 py-1 bg-white hover:bg-purple-100/70 border border-purple-200 rounded-lg text-[11px] text-purple-900 font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    "{reply}"
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type message to guest or staff..."
                  className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
