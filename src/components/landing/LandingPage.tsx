import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Bot, 
  Tablet, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  PlayCircle, 
  ArrowRight, 
  Clock, 
  Globe, 
  Zap, 
  Server, 
  Building2, 
  PhoneCall, 
  Users, 
  Layers, 
  ChevronRight,
  Star,
  Cpu,
  Lock
} from 'lucide-react';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { 
    setIsLoggedIn, 
    setCurrentUserRole, 
    setCurrentTab, 
    setIsDemoTourOpen 
  } = useApp();

  const [emailInput, setEmailInput] = useState('admin@lancehotel.com');
  const [passwordInput, setPasswordInput] = useState('demo123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentUserRole(selectedRole);
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  const handleRoleQuickStart = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentUserRole(role);
    setIsLoggedIn(true);
    if (role === 'Housekeeping' || role === 'Engineering') {
      setCurrentTab('lancepad');
    } else if (role === 'Sales') {
      setCurrentTab('sales');
    } else if (role === 'Receptionist') {
      setCurrentTab('receptionist');
    } else {
      setCurrentTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit',sans-serif]">
                LANCE
              </span>
              <span className="text-[11px] uppercase font-bold tracking-widest text-teal-400 block -mt-1">
                Hotel Operations OS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problem" className="hover:text-teal-400 transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-teal-400 transition-colors">3 Core Modules</a>
            <a href="#receptionist" className="hover:text-teal-400 transition-colors">Receptionist AI</a>
            <a href="#sales" className="hover:text-teal-400 transition-colors">Sales AI</a>
            <a href="#lancepad" className="hover:text-teal-400 transition-colors">Lance Pad</a>
            <a href="#legacy-pms" className="hover:text-teal-400 transition-colors">PMS Integration</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleLogin();
                setIsDemoTourOpen(true);
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 rounded-xl transition-all shadow-xs"
            >
              <PlayCircle className="w-4 h-4 text-teal-400" />
              <span>Guided Demo</span>
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl transition-all shadow-md shadow-teal-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden border-b border-slate-800/80">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Next-Generation Autonomous Hospitality Architecture</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1] font-['Outfit',sans-serif]">
            Turn every guest request and sales inquiry into action — <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">automatically.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate phone interruptions, dispatch housekeeping and engineering in seconds, qualify high-value corporate inquiries 24/7, and equip staff with real-time tablet hubs.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLogin()}
              className="px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>View Live Operations App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                handleLogin();
                setIsDemoTourOpen(true);
              }}
              className="px-6 py-4 text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 text-teal-400" />
              <span>Launch 3–5 Min Interactive Tour</span>
            </button>
          </div>

          {/* Quick Role Tester Pills */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              One-Click Role Demonstration Presets:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(['Admin', 'Manager', 'Receptionist', 'Housekeeping', 'Engineering', 'Sales'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleQuickStart(role)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-teal-950/80 hover:border-teal-500/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-teal-300 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Launch as {role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Preview Card */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl p-2 bg-gradient-to-b from-teal-500/20 via-slate-800/40 to-slate-900 border border-slate-700/80 shadow-2xl">
            <div className="rounded-xl bg-slate-900 overflow-hidden border border-slate-800 text-left p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">Lance Grand Hotel • Operations Cockpit</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  Opera PMS Synced
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Active Requests</p>
                  <p className="text-2xl font-black text-white mt-1">24</p>
                  <span className="text-[10px] text-teal-400 font-semibold">100% Routed by AI</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Pending Tasks</p>
                  <p className="text-2xl font-black text-amber-400 mt-1">11</p>
                  <span className="text-[10px] text-slate-400">On Lance Pad</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Avg Response Time</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">42 sec</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">34% Faster</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Revenue Pipeline</p>
                  <p className="text-2xl font-black text-teal-300 mt-1">₹4.8L</p>
                  <span className="text-[10px] text-teal-400 font-semibold">18 Qualified Leads</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Autonomous AI Action in Progress:</span>
                    <span className="text-slate-300">Room 402 towels dispatched to Housekeeper Priya (SLA: 8 mins)</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleLogin()}
                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg transition-colors text-xs"
                >
                  Enter Cockpit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-slate-900/50 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400">The Problem</h2>
            <p className="text-3xl font-extrabold text-white mt-2 font-['Outfit',sans-serif]">
              Hotel Operations Still Depend on Chaotic Phone Calls
            </p>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Every ring interrupts front desk staff, leaves guests on hold, delays housekeeping dispatches, and causes high-value conference inquiries to slip through the cracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Endless Staff Interruptions</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Front desk agents answer 150+ repetitive calls a day asking for towels, WiFi codes, late checkout, and parking rules while in-person guests wait in line.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Slow, Disjointed Dispatch</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Staff scribble requests on paper notes or shout over noisy walkie-talkies. Requests get forgotten, SLAs get breached, and guests leave negative reviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Lost Event & Sales Revenue</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Inbound corporate RFPs and conference inquiries taking days to receive pricing quotes lose deals to competing properties that respond instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution – 3 Core Modules */}
      <section id="solution" className="py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Our Solution</h2>
            <p className="text-3xl font-extrabold text-white mt-2 font-['Outfit',sans-serif]">
              One Unified Operations Platform. Three Intelligent Modules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">
            {/* Module 1: Receptionist AI */}
            <div id="receptionist" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Module 01</span>
                <h3 className="text-xl font-bold text-white mt-1">Receptionist AI Agent</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  24/7 guest service across WhatsApp, Phone voice, SMS, Email, and Web. Understands requests in 9 languages, queries PMS records, and auto-dispatches tasks.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Instant intent parsing & entity extraction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Multilingual support in Tamil, Hindi, French, etc.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Automated task routing & SLA tracking</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleRoleQuickStart('Receptionist');
                }}
                className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-teal-900/60 text-teal-300 border border-slate-700 hover:border-teal-500/50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Receptionist AI</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Module 2: Sales AI */}
            <div id="sales" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Module 02</span>
                <h3 className="text-xl font-bold text-white mt-1">Sales AI Agent</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Converts inbound event, banquet, and room block inquiries into scored pipeline deals with instant tailored pricing proposals.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Autonomous lead qualification & 0–100 scoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>1-click banquet & room block proposal generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Pipeline CRM stages & follow-up scheduler</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleRoleQuickStart('Sales');
                }}
                className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-blue-900/60 text-blue-300 border border-slate-700 hover:border-blue-500/50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Sales AI</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Module 3: Lance Pad */}
            <div id="lancepad" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Tablet className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Module 03</span>
                <h3 className="text-xl font-bold text-white mt-1">Lance Pad Operations Hub</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Tablet-first staff workspace replacing walkie-talkies. Live Kanban board, real-time department chat (#housekeeping, #engineering), and SLA escalations.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time Task Kanban with Accept/Complete flows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Department channels with staff mentions & updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>High-priority escalation triggers & resolution modals</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleRoleQuickStart('Housekeeping');
                }}
                className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-emerald-900/60 text-emerald-300 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Open Lance Pad</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous Vision & Legacy PMS Integration Section */}
      <section id="legacy-pms" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Bridge Legacy Systems
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-2 font-['Outfit',sans-serif]">
                Works With On-Premise & Modern PMS Without Expensive Upgrades
              </h2>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Hotels often run legacy desktop PMS software (Oracle Opera 5.6, Fidelio, Amadeus) that lacks modern APIs. Lance integrates via API bridges or simulated visual screen automation, querying room occupancy and posting work orders automatically.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <Server className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Legacy PMS Direct Sync</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Reads guest profile, loyalty tiers, room history, and balance folios.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Autonomous Work Order Generation</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Dispatches maintenance tasks directly to engineering with SLA alerts.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PMS Terminal Workflow Visual */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  PMS Bridge Terminal
                </span>
                <span>Oracle Opera 5.6 Host</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <p className="text-teal-400">&gt; Guest Request: "2 Extra Towels in Room 402"</p>
                <p className="text-slate-400">&gt; Locating Reservation: RES-98442 (Rahul Krishnan - Platinum VIP)</p>
                <p className="text-slate-400">&gt; Status: Occupied / Guaranteed / Departure: Sep 04</p>
                <p className="text-emerald-400">&gt; [OK] Created Housekeeping Ticket #501</p>
                <p className="text-emerald-400">&gt; [OK] Assigned: Priya Sharma (Floor 4 Pantry)</p>
                <p className="text-teal-300 font-bold">&gt; ✓ Task Active on Lance Pad Hub (ETA: 8 mins)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-16 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
            Ready to experience next-generation hotel operations?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Experience the live prototype with mock data. No API keys or credit card required.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleLogin()}
              className="px-8 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xl active:scale-95 transition-all"
            >
              Enter Live Operations Cockpit
            </button>
            <button
              onClick={() => {
                handleLogin();
                setIsDemoTourOpen(true);
              }}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-teal-400" />
              <span>Launch 3–5 Min Demo Tour</span>
            </button>
          </div>

          <p className="mt-12 text-[11px] text-slate-600">
            Lance – AI-Powered Hotel Operations Platform © 2026. Designed for modern luxury hospitality.
          </p>
        </div>
      </footer>

      {/* Login / Role Selection Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-left animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Sign In to Lance Grand Hotel</h3>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1.5">Select Role for Demo:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Admin', 'Manager', 'Receptionist', 'Housekeeping', 'Engineering', 'Sales'] as UserRole[]).map(role => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border text-left transition-all ${
                        selectedRole === role
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md active:scale-98"
              >
                Sign In as {selectedRole}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
