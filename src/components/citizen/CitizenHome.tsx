import React from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Award,
  Truck,
  Leaf,
  ShieldCheck,
  Flame,
  ArrowRight,
  TrendingUp,
  QrCode
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { PickupRequest } from '../../types';

interface CitizenHomeProps {
  onNavigateTab: (tab: string) => void;
  onOpenReceipt: (pickup: PickupRequest) => void;
}

export const CitizenHome: React.FC<CitizenHomeProps> = ({ onNavigateTab, onOpenReceipt }) => {
  const { currentUser } = useAuth();
  const { pickups, bins, envStats } = useAppState();

  const activePickup = pickups.find((p) => p.status !== 'COMPLETED') || pickups[0];
  const nearbyBins = bins.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-brand-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-slate-950 font-bold">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="text-xs font-mono font-bold text-brand-300 uppercase tracking-wider">
                {currentUser.zone || 'Hitec City - Zone 1'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-brand-400">{currentUser.name}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your household has diverted <b>142 kg</b> of recyclables from landfills this month. Keep up your 98% segregation accuracy streak!
            </p>
          </div>

          {/* Citizen Impact Capsule */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Eco-Points</span>
              <p className="text-xl font-black font-mono text-amber-400 mt-0.5">{currentUser.points || 1240}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">Level 4 Champion</span>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-3.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">CO₂ Avoided</span>
              <p className="text-xl font-black font-mono text-blue-400 mt-0.5">86.4 kg</p>
              <span className="text-[10px] text-slate-400 font-medium">~4.2 Trees Eq.</span>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-3.5 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Segregation</span>
              <p className="text-xl font-black font-mono text-emerald-400 mt-0.5">98%</p>
              <span className="text-[10px] text-brand-400 font-semibold">Grade A+</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <button
          onClick={() => onNavigateTab('scanner')}
          className="p-5 rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-950/30 to-slate-900 hover:border-brand-400 text-left transition-all group shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 group-hover:bg-brand-500 group-hover:text-slate-950 transition-colors mb-3">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
            AI Waste Scanner
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Snap image & let AI identify category, bin color, and recyclability.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('pickups')}
          className="p-5 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-slate-900 hover:border-blue-400 text-left transition-all group shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors mb-3">
            <Truck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
            Book Smart Pickup
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Schedule doorstep collection with OTP token and live truck tracking.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('dumping')}
          className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/30 to-slate-900 hover:border-red-400 text-left transition-all group shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-slate-950 transition-colors mb-3">
            <Flame className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
            Report Illegal Dump
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Flag roadside debris with photo & GPS to earn +100 bonus Eco-Points.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('rewards')}
          className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-900 hover:border-amber-400 text-left transition-all group shadow-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors mb-3">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
            Rewards & Ranking
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Redeem points for Metro vouchers, tree planting & property rebates.
          </p>
        </button>

      </div>

      {/* Main Row: Active Pickup Tracker Card + Nearby Bins Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Pickup Card */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">Active Doorstep Collection</h3>
            </div>
            <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 text-xs font-mono font-semibold">
              {activePickup.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Request ID:</span>
                <span className="font-mono font-bold text-slate-200">{activePickup.requestNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-emerald-400">{activePickup.category} (~{activePickup.estimatedWeightKg}kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Slot:</span>
                <span className="font-medium text-slate-300">{activePickup.preferredTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Driver:</span>
                <span className="text-slate-200 font-semibold">{activePickup.assignedDriverName || 'Ramesh Kumar (T-01)'}</span>
              </div>
            </div>

            {/* OTP Handover Box */}
            <div className="rounded-xl bg-brand-950/20 border border-brand-500/40 p-4 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Handover Verification OTP</span>
                <div className="text-3xl font-black font-mono tracking-widest text-brand-400 my-1">
                  {activePickup.verificationOtp}
                </div>
                <p className="text-[10px] text-slate-400">Share with driver upon arrival</p>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onNavigateTab('tracking')}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold py-1.5 transition-colors"
                >
                  <span>Track Live Truck</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Nearby Smart Bins Radar */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Nearby Smart Bins Radar</h3>
            </div>
            <span className="text-xs text-brand-400 font-mono">Live Telemetry</span>
          </div>

          <div className="space-y-2.5">
            {nearbyBins.map((bin) => {
              const fillPct = bin.currentFillLevel;
              const fillBadgeColor = fillPct >= 90 ? 'text-red-400 bg-red-950/60 border-red-800/60' : fillPct >= 75 ? 'text-amber-400 bg-amber-950/60 border-amber-800/60' : 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';

              return (
                <div
                  key={bin.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-bold text-slate-200 truncate">{bin.name}</p>
                    <p className="text-[10px] text-slate-400">{bin.category} Bin • {bin.location.address}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${fillBadgeColor}`}>
                      {fillPct}% Full
                    </span>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">Ping: {bin.lastCommunication}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
