import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Mail, 
  CheckCircle2, 
  Calendar, 
  Users, 
  IndianRupee, 
  Building2, 
  Clock, 
  Send, 
  PlusCircle, 
  Download, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { SalesOpportunity, SalesStage } from '../../types';

export const SalesAiView: React.FC = () => {
  const { 
    opportunities, 
    updateOpportunityStage, 
    updateOpportunity,
    createSalesOpportunity,
    setCurrentTab,
    showToast
  } = useApp();

  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || 'opp-1');
  const [activeTab, setActiveTab] = useState<'qualification' | 'proposal' | 'simulator'>('qualification');
  const [rfpCompany, setRfpCompany] = useState('Apex Innovations Ltd');
  const [rfpContact, setRfpContact] = useState('Sunil Verma');
  const [rfpEmail, setRfpEmail] = useState('sunil.verma@apexinnovate.com');
  const [rfpEventType, setRfpEventType] = useState('Annual Tech Summit & Gala');
  const [rfpGuests, setRfpGuests] = useState(220);
  const [rfpDates, setRfpDates] = useState('Nov 14 - Nov 16, 2026');
  const [rfpBudget, setRfpBudget] = useState('₹12,00,000');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedOpp = opportunities.find(o => o.id === selectedOppId) || opportunities[0];

  const handleGenerateProposal = (oppId: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const opp = opportunities.find(o => o.id === oppId);
      const guestCount = opp?.guestCount || 50;
      const rooms = opp?.roomsRequired || Math.ceil(guestCount * 0.45);
      const roomRate = rooms * 8500 * 2;
      const hallRental = 150000;
      const fAndBCost = guestCount * 2800;
      const taxes = Math.round(0.18 * (roomRate + hallRental + fAndBCost));
      const total = roomRate + hallRental + fAndBCost + taxes;

      const generatedProposal = {
        roomRate,
        hallRental,
        fAndBCost,
        taxes,
        total,
        specialDiscounts: 'Includes 10% Executive Corporate Privilege Package'
      };

      updateOpportunity(oppId, {
        stage: 'Proposal',
        proposalDetails: generatedProposal,
        estimatedValue: total,
        proposalSentDate: new Date().toISOString().split('T')[0]
      });

      setIsGenerating(false);
      setActiveTab('proposal');
      showToast('Proposal Generated', 'Executive Banquet package prepared with rate card verification', 'success');
    }, 600);
  };

  const handleSimulateNewRfp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const budgetNum = parseInt(rfpBudget.replace(/[^0-9]/g, '')) || 800000;
      const rooms = Math.ceil(rfpGuests * 0.45);
      const newOpp: Partial<SalesOpportunity> = {
        company: rfpCompany,
        contactName: rfpContact,
        contactEmail: rfpEmail,
        contactPhone: '+91 98401 55221',
        eventType: rfpEventType,
        guestCount: rfpGuests,
        roomsRequired: rooms,
        eventDates: rfpDates,
        estimatedValue: budgetNum,
        leadScore: 92,
        stage: 'Qualified',
        assignedStaffName: 'Sneha Patel',
        notes: `Simulated inbound RFP from ${rfpCompany}. AI confidence score: 92%`,
        meetingRoomRequired: true,
        cateringRequired: true,
        aiExtractedInsights: {
          budgetIndication: 'High budget alignment with luxury banquet rate card',
          decisionTimeline: 'Finalizing within 10 days',
          competitorMentions: ['Taj Coromandel', 'ITC Grand Chola'],
          sentimentScore: 0.94
        },
        proposalDetails: {
          roomRate: rooms * 8500 * 2,
          hallRental: 250000,
          fAndBCost: rfpGuests * 3200,
          taxes: 0.18 * (rooms * 8500 * 2 + 250000 + rfpGuests * 3200),
          total: (rooms * 8500 * 2 + 250000 + rfpGuests * 3200) * 1.18,
          specialDiscounts: 'Includes 10% Early Bird Banquet Concession'
        }
      };

      createSalesOpportunity(newOpp);
      setIsGenerating(false);
      setActiveTab('qualification');
    }, 700);
  };

  const stages: SalesStage[] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

  return (
    <div className="space-y-6 pb-12">
      {/* Title Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white border border-blue-800/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Sales AI Agent (Corporate RFPs & Banquets)</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              Autonomous CRM
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Autonomous qualification, 0–100 lead scoring, automated banquet proposal generator, and sales CRM pipeline.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Simulate Inbound RFP</span>
          </button>
          <button
            onClick={() => setCurrentTab('pipeline')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors"
          >
            Pipeline Kanban View
          </button>
        </div>
      </div>

      {/* Main Grid: Left Opportunity List, Right Details/Proposal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Leads List (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Active Corporate Leads ({opportunities.length})
              </h2>
              <span className="text-[10px] text-slate-500 font-semibold">Sorted by Score</span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {opportunities.map(opp => (
                <div
                  key={opp.id}
                  onClick={() => {
                    setSelectedOppId(opp.id);
                    if (activeTab === 'simulator') setActiveTab('qualification');
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedOppId === opp.id
                      ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{opp.company}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      opp.leadScore >= 90 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : opp.leadScore >= 80
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Score: {opp.leadScore}/100
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1">{opp.eventType} • {opp.guestCount} Guests</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-blue-700">
                      ₹{(opp.estimatedValue / 100000).toFixed(1)} Lakhs
                    </span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      {opp.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lead Analysis, Proposal Builder & Simulator (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeTab === 'simulator' ? (
            /* Simulator Form */
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight">Simulate Inbound Corporate Inquiry / RFP</h2>
                  <p className="text-xs text-slate-500">Test autonomous parsing and instant quote generation</p>
                </div>
                <button
                  onClick={() => setActiveTab('qualification')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSimulateNewRfp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={rfpCompany}
                      onChange={e => setRfpCompany(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Person</label>
                    <input
                      type="text"
                      value={rfpContact}
                      onChange={e => setRfpContact(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={rfpEmail}
                      onChange={e => setRfpEmail(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Type</label>
                    <input
                      type="text"
                      value={rfpEventType}
                      onChange={e => setRfpEventType(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Attendees / Delegates</label>
                    <input
                      type="number"
                      value={rfpGuests}
                      onChange={e => setRfpGuests(parseInt(e.target.value) || 50)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimated Budget</label>
                    <input
                      type="text"
                      value={rfpBudget}
                      onChange={e => setRfpBudget(e.target.value)}
                      className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Requested Dates</label>
                  <input
                    type="text"
                    value={rfpDates}
                    onChange={e => setRfpDates(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Run Sales AI Lead Qualification</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Opportunity Details & Proposal Tabs */
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">{selectedOpp.company}</h2>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {selectedOpp.eventType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Contact: {selectedOpp.contactName} ({selectedOpp.contactEmail} • {selectedOpp.contactPhone})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('qualification')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'qualification' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Lead Score & AI
                  </button>
                  <button
                    onClick={() => setActiveTab('proposal')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'proposal' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Proposal Document
                  </button>
                </div>
              </div>

              {/* Stage Progress Tracker */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pipeline Deal Stage:</span>
                <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-semibold">
                  {stages.map((stage, idx) => {
                    const currentStageIdx = stages.indexOf(selectedOpp.stage);
                    const isPassed = idx <= currentStageIdx;
                    return (
                      <button
                        key={stage}
                        onClick={() => updateOpportunityStage(selectedOpp.id, stage)}
                        className={`p-2 rounded-lg border transition-all ${
                          isPassed
                            ? 'bg-blue-50 border-blue-400 text-blue-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-[10px] block truncate">{stage}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab 1: AI Qualification & Lead Details */}
              {activeTab === 'qualification' && (
                <div className="space-y-4">
                  {/* Lead Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Revenue</span>
                      <span className="text-lg font-black text-blue-700 font-['Outfit',sans-serif]">
                        ₹{(selectedOpp.estimatedValue / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">AI Lead Score</span>
                      <span className="text-lg font-black text-emerald-700 font-['Outfit',sans-serif]">
                        {selectedOpp.leadScore}/100
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Delegates / Rooms</span>
                      <span className="text-sm font-bold text-slate-800">
                        {selectedOpp.guestCount} pax / {selectedOpp.roomsRequired} rooms
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Owner</span>
                      <span className="text-sm font-bold text-slate-800">
                        {selectedOpp.assignedStaffName}
                      </span>
                    </div>
                  </div>

                  {/* AI Strategic Analysis Box */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">Sales AI Opportunity Assessment</h4>
                      </div>
                      <span className="text-[10px] font-mono bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded">
                        Score: {selectedOpp.leadScore}/100
                      </span>
                    </div>

                    <div className="text-xs space-y-2 text-slate-300">
                      <p><strong>Notes:</strong> {selectedOpp.notes || 'Inbound corporate booking request verified.'}</p>
                      <p><strong>Timeline:</strong> {selectedOpp.aiExtractedInsights?.decisionTimeline || 'Within 2 weeks'}</p>
                      <p><strong>Budget Match:</strong> {selectedOpp.aiExtractedInsights?.budgetIndication || 'High alignment with Q4 banquet rate card.'}</p>
                    </div>
                  </div>

                  {/* Proposal Action Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleGenerateProposal(selectedOpp.id)}
                      disabled={isGenerating}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md active:scale-98"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{selectedOpp.proposalDetails ? 'View Banquet Proposal' : 'Generate 1-Click Banquet Proposal'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Formatted Proposal Document */}
              {activeTab === 'proposal' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {selectedOpp.proposalDetails ? (
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">Executive Banquet & Rooms Proposal</h3>
                          <p className="text-[11px] text-slate-500">Prepared for {selectedOpp.company} • Lance Grand Hotel Sales</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          Total: ₹{(selectedOpp.proposalDetails?.total ?? 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Line Items Table */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Itemized Budget Breakdown:</span>
                        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold">
                              <tr>
                                <th className="p-2.5">Item & Description</th>
                                <th className="p-2.5 text-right">Total Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-800">
                              <tr className="hover:bg-slate-50/60">
                                <td className="p-2.5 font-medium">Deluxe Accommodation ({selectedOpp.roomsRequired} Rooms)</td>
                                <td className="p-2.5 text-right font-mono font-bold">₹{(selectedOpp.proposalDetails?.roomRate ?? 0).toLocaleString('en-IN')}</td>
                              </tr>
                              <tr className="hover:bg-slate-50/60">
                                <td className="p-2.5 font-medium">Grand Ballroom & Stage AV Rental</td>
                                <td className="p-2.5 text-right font-mono font-bold">₹{(selectedOpp.proposalDetails?.hallRental ?? 0).toLocaleString('en-IN')}</td>
                              </tr>
                              <tr className="hover:bg-slate-50/60">
                                <td className="p-2.5 font-medium">Banquet Dining & High-Tea ({selectedOpp.guestCount} Guests)</td>
                                <td className="p-2.5 text-right font-mono font-bold">₹{(selectedOpp.proposalDetails?.fAndBCost ?? 0).toLocaleString('en-IN')}</td>
                              </tr>
                              <tr className="hover:bg-slate-50/60">
                                <td className="p-2.5 font-medium">GST & Luxury Taxes (18%)</td>
                                <td className="p-2.5 text-right font-mono font-bold">₹{(selectedOpp.proposalDetails?.taxes ?? 0).toLocaleString('en-IN')}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Notes and Terms */}
                      <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
                        <span className="font-bold text-slate-800 block">Terms & Inclusions:</span>
                        <p>{selectedOpp.proposalDetails.specialDiscounts}</p>
                      </div>

                      {/* Send Proposal Actions */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500 font-medium">Valid until next week</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateOpportunityStage(selectedOpp.id, 'Proposal');
                              showToast('Proposal Dispatched', `Proposal emailed to ${selectedOpp.contactEmail}`, 'success');
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Email Official Proposal</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                      <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      <p className="text-xs font-bold text-slate-700">No Proposal Generated Yet</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Click below to generate a tailored pricing proposal using AI rate cards.</p>
                      <button
                        onClick={() => handleGenerateProposal(selectedOpp.id)}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg"
                      >
                        Generate Proposal
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
