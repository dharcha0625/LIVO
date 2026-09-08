import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tablet, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Send, 
  MessageSquare, 
  ShieldAlert, 
  Check, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  PlusCircle, 
  Users, 
  ChevronRight,
  Flame,
  Radio
} from 'lucide-react';
import { TaskItem, Department, TaskStatus } from '../../types';

export const LancePadView: React.FC = () => {
  const { 
    tasks, 
    staff, 
    teamMessages, 
    sendTeamMessage,
    acceptTask, 
    completeTask, 
    escalateTask,
    currentUserRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'board' | 'chat'>('board');
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState<Department | 'All'>('All');
  const [selectedChannel, setSelectedChannel] = useState<string>('#housekeeping');
  const [chatInput, setChatInput] = useState('');
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [completionNote, setCompletionNote] = useState('Delivered extra linens to guest room. Guest verified satisfaction.');

  const departments: (Department | 'All')[] = [
    'All', 
    'Housekeeping', 
    'Engineering', 
    'Front Desk', 
    'Concierge', 
    'Food & Beverage', 
    'Sales'
  ];

  // Filter tasks by active department
  const filteredTasks = tasks.filter(task => {
    if (activeDepartmentFilter === 'All') return true;
    return task.department === activeDepartmentFilter;
  });

  const unassignedTasks = filteredTasks.filter(t => t.status === 'NEW');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'IN PROGRESS');
  const completedTasks = filteredTasks.filter(t => t.status === 'COMPLETED');

  const filteredTeamMessages = teamMessages.filter(m => m.channelName === selectedChannel);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendTeamMessage(selectedChannel, chatInput);
    setChatInput('');
  };

  const handleConfirmCompletion = () => {
    if (completingTaskId) {
      completeTask(completingTaskId, {
        reason: 'Delivered request',
        guestNotified: true,
        completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: completionNote
      });
      setCompletingTaskId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header Banner (Tablet-optimized) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-800/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Tablet className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Lance Pad – Hotel Staff Operations Hub</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Tablet Mode
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time operations dispatch replacement for walkie-talkies. Accept tasks, track SLAs, and collaborate with staff.
          </p>
        </div>

        {/* View Switcher: Kanban vs Team Walkie Talkie */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('board')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'board'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Task Board ({filteredTasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Team Walkie Channel</span>
          </button>
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter Dept:
        </span>
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setActiveDepartmentFilter(dept)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeDepartmentFilter === dept
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* TAB 1: KANBAN BOARD */}
      {activeTab === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: NEW / UNASSIGNED */}
          <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  New / Unassigned ({unassignedTasks.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold">DISPATCHED</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {unassignedTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                  <span>No pending tasks</span>
                </div>
              ) : (
                unassignedTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {task.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        task.priority === 'High' || task.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                          {task.roomNumber}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{task.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold">{task.department}</span>
                      <span className="font-mono text-amber-700 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.slaMinutes}m SLA
                      </span>
                    </div>

                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={() => acceptTask(task.id)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        Accept Task
                      </button>
                      <button
                        onClick={() => escalateTask(task.id, 'No staff responded in 5 mins')}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs transition-colors"
                        title="Escalate to Supervisor"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  In Progress ({inProgressTasks.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-blue-700 font-bold">STAFF ON-SITE</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {inProgressTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <span>No tasks currently in progress</span>
                </div>
              ) : (
                inProgressTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-2xs hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {task.id}
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        Assigned: {task.assignedToStaffName}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                          {task.roomNumber}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{task.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{task.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{task.department}</span>
                      <span className="font-mono text-emerald-700 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        Target: {task.slaMinutes}m
                      </span>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => setCompletingTaskId(task.id)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        <span>Complete & Log Note</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: COMPLETED */}
          <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Resolved & Verified ({completedTasks.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">SLA MET</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {completedTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <span>No completed tasks yet today</span>
                </div>
              ) : (
                completedTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-white border border-emerald-200/60 shadow-2xs opacity-90 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-600">{task.id}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Resolved in {task.completedAt ? '7 mins' : '8 mins'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center">
                          {task.roomNumber}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 line-through decoration-slate-400">{task.title}</h4>
                      </div>
                      {task.resolution?.notes && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">"{task.resolution.notes}"</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>By: {task.assignedToStaffName}</span>
                      <span>Opera PMS Logged ✓</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENT LIVE WALKIE-TALKIE CHAT */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden h-[600px]">
          {/* Channels List (4 Cols) */}
          <div className="lg:col-span-4 border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Department Radio Channels
            </h3>
            <div className="space-y-1">
              {['#housekeeping', '#engineering', '#front-desk', '#concierge', '#sales'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all text-left ${
                    selectedChannel === ch
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5" />
                    <span>{ch}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    selectedChannel === ch ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {teamMessages.filter(m => m.channelName === ch).length} msgs
                  </span>
                </button>
              ))}
            </div>

            {/* Staff On Duty */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Staff On Duty (Floor 1-5):</span>
              <div className="space-y-1.5">
                {staff.filter(s => s.status === 'Available' || s.status === 'Busy').map(s => (
                  <div key={s.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-semibold text-slate-800">{s.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{s.department}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Feed (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs text-slate-900 uppercase">Channel {selectedChannel}</span>
              </div>
              <span className="text-[10px] text-slate-500">Broadcasting to on-duty tablets</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
              {filteredTeamMessages.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <span>No recent transmissions in this channel</span>
                </div>
              ) : (
                filteredTeamMessages.map(msg => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl max-w-md text-xs space-y-1 bg-white border border-slate-200 text-slate-800 mr-auto"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold flex items-center gap-1 text-slate-900">
                        {msg.staffName} ({msg.staffDepartment})
                      </span>
                      <span className="text-slate-400">{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder={`Post update to ${selectedChannel}...`}
                className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Resolution Note Modal */}
      {completingTaskId && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Complete Task {completingTaskId}</h3>
              </div>
              <button onClick={() => setCompletingTaskId(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Resolution Notes (Logged to Oracle Opera PMS & Guest WhatsApp):
              </label>
              <textarea
                value={completionNote}
                onChange={e => setCompletionNote(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCompletingTaskId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCompletion}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-md active:scale-95 transition-all"
              >
                Confirm Completion & Notify Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
