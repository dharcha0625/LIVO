import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Kanban, 
  TrendingUp, 
  PlusCircle, 
  Users, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  FileText,
  Building2
} from 'lucide-react';
import { SalesOpportunity, SalesStage } from '../../types';
import { salesService } from '../../services/salesService';

export const SalesPipelineView: React.FC = () => {
  const { 
    opportunities, 
    updateOpportunityStage, 
    setCurrentTab 
  } = useApp();

  const stages: SalesStage[] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
  const totalPipelineValue = salesService.calculateTotalPipelineValue(opportunities);

  const moveStage = (oppId: string, currentStage: SalesStage, direction: 'next' | 'prev') => {
    const idx = stages.indexOf(currentStage);
    if (direction === 'next' && idx < stages.length - 1) {
      updateOpportunityStage(oppId, stages[idx + 1]);
    } else if (direction === 'prev' && idx > 0) {
      updateOpportunityStage(oppId, stages[idx - 1]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <Kanban className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Corporate Sales & Banquet CRM Pipeline</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual deal flow across 5 stages with automated lead scoring and contract value tracking.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Pipeline Value</span>
            <span className="text-lg font-black text-blue-700 font-['Outfit',sans-serif]">
              ₹{(totalPipelineValue / 100000).toFixed(1)} Lakhs
            </span>
          </div>

          <button
            onClick={() => setCurrentTab('sales')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Sales AI Lead Scoring</span>
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageDeals = opportunities.filter(o => o.stage === stage);
          const stageValue = stageDeals.reduce((sum, o) => sum + o.estimatedValue, 0);

          return (
            <div
              key={stage}
              className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col min-h-[550px] min-w-[240px]"
            >
              {/* Column Header */}
              <div className="pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {stage}
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-[11px] font-mono font-bold text-blue-700 mt-1">
                  ₹{(stageValue / 100000).toFixed(1)}L
                </p>
              </div>

              {/* Deal Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {stageDeals.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    <span>No deals in {stage}</span>
                  </div>
                ) : (
                  stageDeals.map(opp => (
                    <div
                      key={opp.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">{opp.company}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {opp.leadScore} pts
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <p className="font-medium text-slate-800">{opp.eventType}</p>
                        <p className="flex items-center gap-1 text-slate-500">
                          <Users className="w-3 h-3" />
                          {opp.guestCount} Guests • {opp.roomsRequired} Rooms
                        </p>
                        <p className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {opp.eventDates}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-black text-blue-700">
                          ₹{(opp.estimatedValue / 100000).toFixed(1)}L
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{opp.assignedStaffName}</span>
                      </div>

                      {/* Stage transition arrows */}
                      <div className="pt-1 flex items-center justify-between gap-1">
                        <button
                          onClick={() => moveStage(opp.id, opp.stage, 'prev')}
                          disabled={stages.indexOf(opp.stage) === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Move to previous stage"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setCurrentTab('sales')}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => moveStage(opp.id, opp.stage, 'next')}
                          disabled={stages.indexOf(opp.stage) === stages.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Advance to next stage"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
