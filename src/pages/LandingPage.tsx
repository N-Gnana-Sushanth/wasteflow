import React from 'react';
import {
  Trash2,
  Sparkles,
  ShieldCheck,
  Cpu,
  UserCheck,
  Truck,
  Building2,
  Leaf,
  ArrowRight,
  TrendingDown,
  Navigation,
  CheckCircle2,
  Activity,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { UserRole } from '../types';

interface LandingPageProps {
  onEnterApp: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { setRole } = useAuth();
  const { startShowcaseTour, envStats } = useAppState();

  const handleLaunchRole = (role: UserRole) => {
    setRole(role);
    onEnterApp(role);
  };

  const handleLaunchShowcase = () => {
    handleLaunchRole('citizen');
    setTimeout(() => {
      startShowcaseTour();
    }, 400);
  };

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/90 border border-brand-500/30 p-8 sm:p-14 shadow-2xl overflow-hidden text-center">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 text-xs font-mono font-bold text-brand-300">
            <Sparkles className="h-4 w-4 text-brand-400" />
            <span>AI-POWERED AUTONOMOUS SMART-CITY PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Next-Gen Municipal Waste Intelligence & Circular Economy
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            WasteFlow interconnects citizens, computer-vision classifiers, IoT ultrasonic bins, AI fleet dispatchers, and circular recycling refineries into one unified SaaS platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleLaunchShowcase}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:opacity-95 text-slate-950 font-black px-6 py-3.5 text-sm shadow-xl shadow-brand-500/25 transition-all transform hover:scale-105"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Launch 5-Minute Guided Showcase Tour</span>
            </button>

            <button
              onClick={() => handleLaunchRole('admin')}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-bold px-6 py-3.5 text-sm transition-all"
            >
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Enter Municipal AI Command Center</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Operational Metrics Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
          <Leaf className="h-6 w-6 text-emerald-400 mx-auto mb-1.5" />
          <p className="text-2xl sm:text-3xl font-black font-mono text-white">{(envStats.divertedFromLandfillTons / 1000).toFixed(1)}k Tons</p>
          <span className="text-xs text-slate-400 font-medium">Landfill Diverted</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
          <TrendingDown className="h-6 w-6 text-blue-400 mx-auto mb-1.5" />
          <p className="text-2xl sm:text-3xl font-black font-mono text-white">-28.4%</p>
          <span className="text-xs text-slate-400 font-medium">Fleet Distance Reduced</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
          <Activity className="h-6 w-6 text-purple-400 mx-auto mb-1.5" />
          <p className="text-2xl sm:text-3xl font-black font-mono text-white">52 Bins</p>
          <span className="text-xs text-slate-400 font-medium">Active IoT Sensors</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-center shadow-lg">
          <ShieldCheck className="h-6 w-6 text-amber-400 mx-auto mb-1.5" />
          <p className="text-2xl sm:text-3xl font-black font-mono text-white">98.4%</p>
          <span className="text-xs text-slate-400 font-medium">SLA Pickup Compliance</span>
        </div>
      </div>

      {/* 4 Role-Based Experiences Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white">Experience 4 Specialized Role Portals</h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose a persona below to explore dedicated workflows tailored for each smart-city stakeholder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Citizen Portal */}
          <div
            onClick={() => handleLaunchRole('citizen')}
            className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-xl hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors mb-4">
                <UserCheck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Persona 1</span>
              <h3 className="text-lg font-bold text-white mt-1">Citizen Experience</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                AI Vision Waste Scanner, 8-stage doorstep pickup scheduling, live GPS truck tracking, OTP receipt verification, and gamified eco-rewards.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Citizen App</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* 2. Municipal Admin */}
          <div
            onClick={() => handleLaunchRole('admin')}
            className="rounded-3xl border border-cyan-500/30 bg-slate-900 p-6 shadow-xl hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Persona 2</span>
              <h3 className="text-lg font-bold text-white mt-1">AI Command Center</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Live GIS master map, 52 IoT smart bins, AI priority engine, One-Click City Route Optimization, What-If simulator, and predictive demand analytics.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Command Center</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* 3. Collection Driver */}
          <div
            onClick={() => handleLaunchRole('driver')}
            className="rounded-3xl border border-amber-500/30 bg-slate-900 p-6 shadow-xl hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">Persona 3</span>
              <h3 className="text-lg font-bold text-white mt-1">Driver Field Suite</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Mobile manifest navigation, arrived/collect actions, QR/OTP verification scanner, offline support, and vehicle predictive maintenance.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Driver App</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* 4. Recycling Facility */}
          <div
            onClick={() => handleLaunchRole('facility')}
            className="rounded-3xl border border-purple-500/30 bg-slate-900 p-6 shadow-xl hover:border-purple-400 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950 transition-colors mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">Persona 4</span>
              <h3 className="text-lg font-bold text-white mt-1">Recycler Facility Hub</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Weighbridge queue management, material recovery flow visualizer, bio-methanation outputs, and B2B recyclable commodities trading marketplace.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Facility Portal</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
