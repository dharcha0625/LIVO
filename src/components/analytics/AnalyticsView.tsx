import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Bot, 
  IndianRupee, 
  Users, 
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  // Chart datasets
  const dailyRequestData = [
    { day: 'Mon', totalRequests: 142, aiAutomated: 98, manualCalls: 44 },
    { day: 'Tue', totalRequests: 165, aiAutomated: 118, manualCalls: 47 },
    { day: 'Wed', totalRequests: 180, aiAutomated: 135, manualCalls: 45 },
    { day: 'Thu', totalRequests: 154, aiAutomated: 112, manualCalls: 42 },
    { day: 'Fri', totalRequests: 210, aiAutomated: 164, manualCalls: 46 },
    { day: 'Sat', totalRequests: 245, aiAutomated: 196, manualCalls: 49 },
    { day: 'Sun', totalRequests: 220, aiAutomated: 172, manualCalls: 48 },
  ];

  const responseTimeTrend = [
    { hour: '06:00', traditionalMinutes: 14, lanceMinutes: 0.8 },
    { hour: '09:00', traditionalMinutes: 18, lanceMinutes: 0.7 },
    { hour: '12:00', traditionalMinutes: 22, lanceMinutes: 0.9 },
    { hour: '15:00', traditionalMinutes: 19, lanceMinutes: 0.6 },
    { hour: '18:00', traditionalMinutes: 26, lanceMinutes: 1.1 },
    { hour: '21:00', traditionalMinutes: 24, lanceMinutes: 0.7 },
    { hour: '00:00', traditionalMinutes: 30, lanceMinutes: 0.5 },
  ];

  const requestCategories = [
    { name: 'Housekeeping & Linens', value: 38, color: '#0d9488' },
    { name: 'Engineering & Maintenance', value: 24, color: '#e11d48' },
    { name: 'Late Checkout & Policies', value: 16, color: '#8b5cf6' },
    { name: 'F&B & Dining Orders', value: 12, color: '#f59e0b' },
    { name: 'Concierge & Transport', value: 10, color: '#3b82f6' },
  ];

  const channelDistribution = [
    { name: 'WhatsApp', value: 52, color: '#10b981' },
    { name: 'Phone Transcribed', value: 22, color: '#6366f1' },
    { name: 'Web Guest Portal', value: 14, color: '#0ea5e9' },
    { name: 'Email / RFPs', value: 12, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Operations & Revenue Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data insights on automated dispatching speed, SLA adherence, staff workload and pipeline conversion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-xl">
            AI Automation: 74.2%
          </span>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Weekly Requests</span>
          <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1 block">1,316</span>
          <span className="text-[10px] text-teal-700 font-semibold">+18.4% vs last week</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Avg SLA Resolution</span>
          <span className="text-2xl font-black text-emerald-700 font-['Outfit',sans-serif] mt-1 block">7.4 mins</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Under 10m target</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Staff Time Saved</span>
          <span className="text-2xl font-black text-blue-700 font-['Outfit',sans-serif] mt-1 block">148 hrs</span>
          <span className="text-[10px] text-blue-700 font-semibold">~21 hrs/day</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Sales Qualified Deals</span>
          <span className="text-2xl font-black text-purple-700 font-['Outfit',sans-serif] mt-1 block">₹28.4L</span>
          <span className="text-[10px] text-purple-700 font-semibold">Q4 Event Bookings</span>
        </div>
      </div>

      {/* Chart Row 1: Request Volume & Response Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart A: Daily Request Volume & Automation */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Weekly Requests: AI Autonomous vs Manual Phone Calls
            </h3>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              74% AI Automated
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRequestData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="aiAutomated" name="AI Autonomous" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="manualCalls" name="Manual Front Desk Calls" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Response Time Comparison (Minutes) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Response & Dispatch Speed: Traditional vs Lance OS
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              96% Faster Dispatch
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="m" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="traditionalMinutes" name="Traditional Phone Flow (mins)" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="lanceMinutes" name="Lance Autonomous OS (mins)" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Categories & Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Top Guest Request Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestCategories}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {requestCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {requestCategories.map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-slate-700 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Guest Communication Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelDistribution}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {channelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {channelDistribution.map(chan => (
                <div key={chan.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chan.color }}></span>
                    <span className="text-slate-700 font-medium">{chan.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{chan.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
