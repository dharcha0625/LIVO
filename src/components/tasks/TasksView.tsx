import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Tablet, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { TaskItem, Department, TaskStatus } from '../../types';

export const TasksView: React.FC = () => {
  const { 
    tasks, 
    staff, 
    acceptTask, 
    completeTask, 
    escalateTask, 
    setCurrentTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [deptFilter, setDeptFilter] = useState<Department | 'All'>('All');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.roomNumber.includes(searchQuery) ||
      task.assignedToStaffName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesDept = deptFilter === 'All' || task.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staff Operations Task Central</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {tasks.length} Tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Departmental task queues with countdown SLAs and staff performance auditing.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('lancepad')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <Tablet className="w-4 h-4 text-teal-400" />
          <span>Switch to Lance Pad Tablet View</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tasks by room, title, or assigned staff..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="ESCALATED">ESCALATED</option>
            </select>

            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value as any)}
              className="text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Engineering">Engineering</option>
              <option value="Front Desk">Front Desk</option>
              <option value="Concierge">Concierge</option>
              <option value="Food & Beverage">Food & Beverage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No tasks matching criteria</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-black text-xs flex flex-col items-center justify-center shrink-0">
                    <span className="text-[8px] text-slate-400 font-normal uppercase">Room</span>
                    <span className="text-sm">{task.roomNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {task.id}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : task.status === 'IN PROGRESS'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : task.status === 'ESCALATED'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {task.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {task.description} • Assigned to <strong className="text-slate-700">{task.assignedToStaffName}</strong> ({task.department})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    SLA: {task.slaMinutes}m
                  </span>

                  {task.status === 'NEW' && (
                    <button
                      onClick={() => acceptTask(task.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Accept
                    </button>
                  )}

                  {task.status === 'IN PROGRESS' && (
                    <button
                      onClick={() => completeTask(task.id, {
                        reason: 'Task executed',
                        guestNotified: true,
                        completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        notes: 'Task marked complete from operations hub'
                      })}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
