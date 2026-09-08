import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ConciergeBell, 
  Search, 
  Filter, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  ChevronRight, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { GuestRequest, Department, Priority } from '../../types';

export const GuestRequestsView: React.FC = () => {
  const { 
    requests, 
    createGuestRequest, 
    updateRequestStatus, 
    setCurrentTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed' | 'Escalated'>('All');
  const [deptFilter, setDeptFilter] = useState<Department | 'All'>('All');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form state for new request
  const [newRoom, setNewRoom] = useState('305');
  const [newGuestName, setNewGuestName] = useState('Ananya Iyer');
  const [newRequestText, setNewRequestText] = useState('Extra pillows and fresh dental kit');
  const [newDept, setNewDept] = useState<Department>('Housekeeping');
  const [newPriority, setNewPriority] = useState<Priority>('Normal');

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.roomNumber.includes(searchQuery) ||
      req.guestName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesDept = deptFilter === 'All' || req.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    createGuestRequest({
      roomNumber: newRoom,
      guestName: newGuestName,
      request: newRequestText,
      department: newDept,
      priority: newPriority,
      status: 'Pending',
      channel: 'WhatsApp',
      slaMinutes: newPriority === 'High' ? 10 : 20
    });
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
              <ConciergeBell className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Live Guest Requests Feed</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {requests.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-channel feed with autonomous categorization, PMS synchronization, and SLA tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manual Request</span>
          </button>
          <button
            onClick={() => setCurrentTab('receptionist')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Receptionist AI</span>
          </button>
        </div>
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
              placeholder="Search by room, guest name, or request item..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Escalated">Escalated</option>
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

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">ID & Room</th>
                <th className="p-3.5">Guest & Details</th>
                <th className="p-3.5">Department & SLA</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Source Channel</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No guest requests found</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {req.roomNumber}
                        </span>
                        <div>
                          <span className="font-mono text-slate-500 font-semibold">{req.id}</span>
                          <span className="block text-[10px] text-slate-400">{req.createdAt}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div>
                        <span className="font-bold text-slate-900">{req.guestName}</span>
                        <p className="text-slate-600 mt-0.5 line-clamp-1">{req.request}</p>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800">{req.department}</span>
                      <span className="block text-[10px] font-mono text-teal-700 font-bold">
                        {req.slaMinutes} mins SLA
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        req.priority === 'High' || req.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-700 border-rose-200' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {req.priority}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="text-[11px] font-medium text-slate-600">
                        {req.channel}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        req.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : req.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : req.status === 'Escalated'
                          ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {req.status === 'Pending' && (
                          <button
                            onClick={() => updateRequestStatus(req.id, 'In Progress')}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold"
                          >
                            Dispatch
                          </button>
                        )}
                        {req.status === 'In Progress' && (
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => updateRequestStatus(req.id, 'Escalated')}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                          title="Escalate"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Request Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Create In-House Guest Request</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase text-[10px] mb-1">Room #</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={e => setNewRoom(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase text-[10px] mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={newGuestName}
                    onChange={e => setNewGuestName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase text-[10px] mb-1">Request Summary</label>
                <input
                  type="text"
                  value={newRequestText}
                  onChange={e => setNewRequestText(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase text-[10px] mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={e => setNewDept(e.target.value as Department)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="Concierge">Concierge</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase text-[10px] mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as Priority)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Normal">Normal (20m SLA)</option>
                    <option value="High">High (10m SLA)</option>
                    <option value="Urgent">Urgent (5m SLA)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Dispatch to Lance Pad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
