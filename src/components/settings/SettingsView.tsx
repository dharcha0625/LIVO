import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Server, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  Users, 
  Bell, 
  RotateCcw, 
  CheckCircle2, 
  Save, 
  Key,
  Hotel
} from 'lucide-react';
import { UserRole } from '../../types';

export const SettingsView: React.FC = () => {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    currentLanguage, 
    setCurrentLanguage,
    resetAllData,
    staff
  } = useApp();

  const [hotelName, setHotelName] = useState('Lance Grand Hotel');
  const [pmsSystem, setPmsSystem] = useState('Oracle Opera 5.6');
  const [aiModel, setAiModel] = useState('Gemini 2.5 Flash / Flash Lite (Autonomous)');
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [autoDispatchTasks, setAutoDispatchTasks] = useState(true);
  const [escalationSlaMinutes, setEscalationSlaMinutes] = useState(10);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System & AI Operations Settings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure Oracle Opera PMS bridge, autonomous dispatch thresholds, and staff access roles.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all mock data to factory demo default?')) {
              resetAllData();
            }
          }}
          className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Property & PMS Connection */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Hotel className="w-4 h-4 text-teal-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Property & Legacy PMS Configuration</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Hotel Property Name</label>
              <input
                type="text"
                value={hotelName}
                onChange={e => setHotelName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">PMS Integration Bridge</label>
              <select
                value={pmsSystem}
                onChange={e => setPmsSystem(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              >
                <option value="Oracle Opera 5.6">Oracle Opera 5.6 (Legacy API / Screen Bridge)</option>
                <option value="Oracle Opera Cloud">Oracle Opera Cloud (OHIP APIs)</option>
                <option value="Amadeus PMS">Amadeus Hospitality PMS</option>
                <option value="Protel PMS">Protel PMS</option>
                <option value="Infor HMS">Infor HMS</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-emerald-900">Oracle Opera PMS Live Bridge: ACTIVE & SYNCHRONIZED</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Latency: 28ms</span>
          </div>
        </div>

        {/* Section 2: AI Autonomous Engine Settings */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Autonomous Intent & Dispatch Controls</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">AI Reasoning Model</label>
              <input
                type="text"
                value={aiModel}
                disabled
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Autonomous Confidence Threshold ({aiConfidenceThreshold}%)
              </label>
              <input
                type="range"
                min={50}
                max={99}
                value={aiConfidenceThreshold}
                onChange={e => setAiConfidenceThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Requests above {aiConfidenceThreshold}% confidence auto-dispatch to Lance Pad without manual receptionist clicks.
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={autoDispatchTasks}
                onChange={e => setAutoDispatchTasks(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Enable direct autonomous task creation on Lance Pad tablet hub</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Send automated WhatsApp confirmation ping to guest upon task completion</span>
            </label>
          </div>
        </div>

        {/* Section 3: Staff Roster */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">On-Duty Staff Roster ({staff.length})</h2>
            </div>
            <span className="text-[10px] font-semibold text-slate-500">6 Departments Connected</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {staff.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{s.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    {s.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{s.role} • {s.department}</p>
                <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Shift: {s.shift}</span>
                  <span>⭐ {s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings successfully saved & synced across cluster!</span>
            </span>
          ) : (
            <span className="text-xs text-slate-400">All configurations applied to active session</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-98 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
