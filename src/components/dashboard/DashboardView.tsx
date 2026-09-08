import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ConciergeBell, 
  CheckSquare, 
  Bot, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  ArrowUpRight, 
  Sparkles, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  PlayCircle,
  PlusCircle,
  Building2,
  Hotel
} from 'lucide-react';
import { hotelService } from '../../services/hotelService';

export const DashboardView: React.FC = () => {
  const { 
    requests, 
    tasks, 
    opportunities, 
    staff, 
    aiLogs, 
    setCurrentTab, 
    setIsAiModalOpen,
    setIsDemoTourOpen,
    acceptTask,
    completeTask
  } = useApp();

  const pendingRequests = requests.filter(r => r.status === 'Pending' || r.status === 'In Progress');
  const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED');
  const departmentWorkloads = hotelService.calculateDepartmentWorkload(tasks, staff);

  const kpis = [
    {
      title: 'Active Guest Requests',
      value: pendingRequests.length || 24,
      subtext: '100% Routed via AI',
      change: '+14% vs yesterday',
      icon: ConciergeBell,
      color: 'text-teal-600',
      bg: 'bg-teal-50 border-teal-200'
    },
    {
      title: 'Pending Staff Tasks',
      value: pendingTasks.length || 11,
      subtext: 'Active on Lance Pad',
      change: '4 High Priority',
      icon: CheckSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'AI Conversations Today',
      value: 187,
      subtext: 'Across 6 Channels',
      change: '68% Handled Autonomously',
      icon: Bot,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Sales Opportunities',
      value: opportunities.length || 18,
      subtext: 'Active in Pipeline',
      change: '5 Awaiting Proposal',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Avg Response Time',
      value: '42 sec',
      subtext: 'Guest Inquiry to Dispatch',
      change: '34% Faster than manual',
      icon: Clock,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Resolution Rate',
      value: '94%',
      subtext: 'Within Target SLA',
      change: '+3.2% this week',
      icon: CheckCircle2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Revenue Opportunities',
      value: '₹4.8L',
      subtext: 'Qualified Pipeline Deals',
      change: '₹8.5L highest deal',
      icon: IndianRupee,
      color: 'text-teal-700',
      bg: 'bg-teal-50 border-teal-200'
    },
    {
      title: 'Staff Workload',
      value: '72%',
      subtext: 'Balanced Across 6 Depts',
      change: 'Optimal Capacity',
      icon: Users,
      color: 'text-slate-700',
      bg: 'bg-slate-50 border-slate-200'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Hotel Operations Cockpit</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
              Live Real-Time Sync
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Lance Autonomous Engine is actively monitoring guest communications, PMS records, and staff tasks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 rounded-xl transition-all shadow-xs"
          >
            <PlayCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Demo</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Command Center</span>
          </button>
        </div>
      </div>

      {/* KPI 8-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                  {kpi.title}
                </span>
                <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
                  {kpi.value}
                </span>
                <div className="flex items-center justify-between text-[10px] mt-1">
                  <span className="text-slate-500 font-medium">{kpi.subtext}</span>
                  <span className="text-teal-700 font-semibold">{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section Grid: Live Operations + AI Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Live Operations (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Section A: Live Operations Feed</h2>
              </div>
              <button
                onClick={() => setCurrentTab('requests')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
              >
                <span>View All ({requests.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {requests.slice(0, 4).map(req => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-slate-200/70 hover:border-teal-300/80 bg-slate-50/50 hover:bg-teal-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] text-slate-400 font-normal">ROOM</span>
                      <span>{req.roomNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{req.request}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          req.priority === 'High' 
                            ? 'bg-rose-50 text-rose-700 border-rose-200' 
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {req.priority}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          req.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : req.status === 'Escalated'
                            ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                            : req.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span><strong>Dept:</strong> {req.department}</span>
                        <span>•</span>
                        <span><strong>Assigned:</strong> {req.assignedStaffName || 'Auto-Routing...'}</span>
                        <span>•</span>
                        <span><strong>Channel:</strong> {req.channel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setCurrentTab('lancepad')}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Open on Lance Pad
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Revenue Opportunities Spotlight */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Section D: Sales Revenue Opportunities (AI Qualified)</h2>
              </div>
              <button
                onClick={() => setCurrentTab('pipeline')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>Pipeline CRM ({opportunities.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunities.slice(0, 2).map(opp => (
                <div
                  key={opp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        Stage: {opp.stage}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        Score: {opp.leadScore}/100
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mt-1.5">{opp.company}</h3>
                    <p className="text-[11px] text-slate-600">{opp.eventType} • {opp.guestCount} Guests</p>
                    <p className="text-[10px] text-slate-500 mt-1">Dates: {opp.eventDates}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Est. Revenue</span>
                      <span className="text-base font-extrabold text-blue-700">
                        ₹{(opp.estimatedValue / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentTab('sales')}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      View AI Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Section B (AI Activity) + Section C (Department Workload) */}
        <div className="space-y-6">
          {/* Section B: AI Live Activity */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Section B: AI Live Activity</h2>
              </div>
              <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-bold">
                Automated
              </span>
            </div>

            <div className="space-y-3">
              {aiLogs.slice(0, 5).map(log => (
                <div key={log.id} className="text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-slate-700">{log.roomOrLead}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-tight">
                    {log.description}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="text-teal-700 font-semibold">{log.department}</span>
                    <span className="text-slate-400 font-mono">{log.latencyMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Department Workload */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Section C: Department Workload</h2>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">6 Active Teams</span>
            </div>

            <div className="space-y-3.5">
              {departmentWorkloads.map(dept => (
                <div key={dept.department} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{dept.department}</span>
                    <span className="text-slate-600 font-mono text-[11px]">
                      {dept.activeTasks} Tasks • {dept.loadPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${dept.color} transition-all duration-500`}
                      style={{ width: `${Math.max(8, dept.loadPercentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => setCurrentTab('lancepad')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Manage Staff Shifts on Lance Pad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
