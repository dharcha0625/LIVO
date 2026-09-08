import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Zap, 
  Terminal, 
  TrendingUp, 
  ConciergeBell,
  RefreshCw
} from 'lucide-react';
import { AiParsedIntent } from '../../services/aiService';

export const AiAssistantModal: React.FC = () => {
  const { 
    isAiModalOpen, 
    setIsAiModalOpen, 
    executeAiAssistantPrompt, 
    setCurrentTab,
    currentLanguage
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState<AiParsedIntent | null>(null);
  const [pmsStepIdx, setPmsStepIdx] = useState<number>(0);

  if (!isAiModalOpen) return null;

  const examplePrompts = [
    {
      label: 'Housekeeping Pillow Request',
      text: 'Room 305 needs 2 extra hypoallergenic pillows and fresh sheets.',
      icon: ConciergeBell,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      label: 'High-Priority AC Issue',
      text: 'Guest in room 510 says the AC is not cooling and making loud rattling noise.',
      icon: Zap,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      label: 'Corporate Conference Lead',
      text: 'TechCorp wants to book a 200-person corporate conference next month with catering and 90 rooms.',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      label: 'Late Checkout Request',
      text: 'Guest in Room 204 requests complimentary late checkout until 2 PM.',
      icon: ConciergeBell,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const handleRunSimulation = (promptText: string) => {
    setInputPrompt(promptText);
    setIsProcessing(true);
    setParsedResult(null);
    setPmsStepIdx(0);

    // Simulate AI inference & PMS workflow
    setTimeout(() => {
      const result = executeAiAssistantPrompt(promptText);
      setParsedResult(result);
      setIsProcessing(false);

      // Animate PMS steps
      const stepsCount = result?.pmsSyncSteps?.length || 0;
      if (stepsCount > 1) {
        const interval = setInterval(() => {
          setPmsStepIdx(prev => {
            if (prev >= stepsCount - 1) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 400);
      }
    }, 600);
  };

  const handleNavigateToResult = () => {
    if (!parsedResult) return;
    if (parsedResult.isSalesLead) {
      setCurrentTab('pipeline');
    } else {
      setCurrentTab('lancepad');
    }
    setIsAiModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div 
        onClick={() => setIsAiModalOpen(false)}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">AI Command Center & Intent Engine</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  GEMINI-READY ARCHITECTURE
                </span>
              </div>
              <p className="text-xs text-slate-400">Simulate autonomous intent parsing, task routing, legacy PMS sync & response generation</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Prompt Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (inputPrompt.trim()) {
                handleRunSimulation(inputPrompt);
              }
            }}
            className="space-y-3"
          >
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter Inbound Guest Request or Sales Prompt:
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                placeholder="e.g. 'Room 305 needs extra pillows' or '200 pax conference for Oct 20'..."
                className="w-full pl-4 pr-28 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-transparent font-medium transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={isProcessing || !inputPrompt.trim()}
                className="absolute right-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Run AI</span>
              </button>
            </div>
          </form>

          {/* Quick Preset Badges */}
          <div>
            <p className="text-[11px] font-semibold text-slate-500 mb-2">Try one-click test cases:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examplePrompts.map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleRunSimulation(p.text)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all hover:scale-101 flex items-start gap-2.5 ${p.color}`}
                  >
                    <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">{p.label}</span>
                      <span className="text-[11px] opacity-80 line-clamp-1">{p.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading State */}
          {isProcessing && (
            <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed animate-pulse">
              <Bot className="w-8 h-8 mx-auto text-teal-600 animate-bounce mb-2" />
              <p className="text-xs font-bold text-slate-800">Processing Natural Language Understanding...</p>
              <p className="text-[11px] text-slate-500">Extracting entities, checking Opera PMS room status, routing task</p>
            </div>
          )}

          {/* Parsed Result Display */}
          {parsedResult && !isProcessing && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase">AI Extracted Intent & Entities</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Confidence: {(parsedResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Intent</span>
                    <span className="font-bold text-teal-300">{parsedResult.intentCategory}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Target Dept</span>
                    <span className="font-bold text-white">{parsedResult.department}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Room / Entity</span>
                    <span className="font-bold text-amber-300">{parsedResult.roomNumber}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Priority</span>
                    <span className={`font-bold ${parsedResult.priority === 'High' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {parsedResult.priority}
                    </span>
                  </div>
                </div>

                {parsedResult.isSalesLead && parsedResult.salesData && (
                  <div className="mt-3 p-3 rounded-lg bg-blue-950/60 border border-blue-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-blue-300 uppercase font-bold block">Opportunity Value</span>
                      <span className="text-base font-extrabold text-blue-400">
                        ₹{(parsedResult.salesData.estimatedValue / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 uppercase font-bold block">Lead Score</span>
                      <span className="font-bold text-white">{parsedResult.salesData.leadScore}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 uppercase font-bold block">Guests / Rooms</span>
                      <span className="font-bold text-white">{parsedResult.salesData.guestCount} pax / {parsedResult.salesData.roomsRequired} rooms</span>
                    </div>
                  </div>
                )}

                {/* AI Simulated Response Box */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[10px] text-teal-400 uppercase font-bold block mb-1">Generated Guest / Lead Response:</span>
                  <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-200 border border-slate-800 font-sans leading-relaxed">
                    "{parsedResult.responseMessage}"
                  </div>
                </div>
              </div>

              {/* Legacy PMS Autonomous Computer Use / Integration Workflow */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-700" />
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Autonomous Computer-Use & PMS Sync Execution
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Live Bridge</span>
                </div>

                <div className="space-y-2">
                  {parsedResult.pmsSyncSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-2 rounded-lg text-xs transition-all ${
                        idx <= pmsStepIdx 
                          ? 'bg-white border border-slate-200 shadow-2xs' 
                          : 'opacity-40'
                      }`}
                    >
                      <div className="mt-0.5">
                        {idx <= pmsStepIdx ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-mono text-slate-400">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{step.step}</p>
                        <p className="text-[11px] text-slate-500">{step.subtext} • <span className="font-mono text-[10px] text-slate-400">{step.system}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to jump to created item */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNavigateToResult}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-md active:scale-98"
                >
                  <span>View in {parsedResult.isSalesLead ? 'Sales Pipeline' : 'Lance Pad Operations Hub'}</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
