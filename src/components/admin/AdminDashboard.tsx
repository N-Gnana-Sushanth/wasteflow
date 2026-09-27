import React, { useState } from 'react';
import {
  Sparkles,
  Trash2,
  AlertTriangle,
  Truck,
  TrendingUp,
  Leaf,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { CityMap } from '../maps/CityMap';
import { OptimizeModal } from '../common/OptimizeModal';
import { PriorityItem } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const {
    bins,
    vehicles,
    pickups,
    incidents,
    priorityItems,
    envStats,
    optimizeCityCollection,
    lastOptimization
  } = useAppState();

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptModal, setShowOptModal] = useState(false);
  const [optResult, setOptResult] = useState<any>(null);
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(null);

  const criticalBinsCount = bins.filter((b) => b.status === 'CRITICAL').length;
  const highBinsCount = bins.filter((b) => b.status === 'HIGH').length;
  const activeTrucksCount = vehicles.filter((v) => v.status === 'ON_ROUTE' || v.status === 'COLLECTING').length;
  const dumpingAlertsCount = incidents.filter((i) => i.status !== 'RESOLVED').length;

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    try {
      const res = await optimizeCityCollection();
      setOptResult(res);
      setShowOptModal(true);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Enterprise Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                <Zap className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Municipal Command Operations • Hyderabad Metro
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5">
              Waste Logistics & Sensor Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Real-time synchronization across 52 IoT Smart Bins, 10 Fleet Vehicles, Citizen Requests, and AI Route Dispatch.
            </p>
          </div>

          {/* Master Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 text-sm shadow-sm transition-all"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Computing Optimal Routes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Optimize City Collection</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (6 Core Municipal Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div
          onClick={() => onNavigateTab('bins')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">Total Bins</span>
            <Trash2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{bins.length}</p>
          <span className="text-[10px] text-emerald-400 font-medium">51 Online • 1 Offline</span>
        </div>

        <div
          onClick={() => onNavigateTab('bins')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">Critical Overflows</span>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-400 font-mono">{criticalBinsCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">{highBinsCount} in High Range (&gt;75%)</span>
        </div>

        <div
          onClick={() => onNavigateTab('routes')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">Active Trucks</span>
            <Truck className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 font-mono">{activeTrucksCount} / {vehicles.length}</p>
          <span className="text-[10px] text-slate-400 font-medium">8 On Route • 2 Idle</span>
        </div>

        <div
          onClick={() => onNavigateTab('incidents')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">Dumping Alerts</span>
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-orange-400 font-mono">{dumpingAlertsCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">Hotspots Tracked</span>
        </div>

        <div
          onClick={() => onNavigateTab('analytics')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">Landfill Diverted</span>
            <Leaf className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{(envStats.divertedFromLandfillTons / 1000).toFixed(1)}k T</p>
          <span className="text-[10px] text-emerald-400 font-medium">78.5% Diversion Rate</span>
        </div>

        <div
          onClick={() => onNavigateTab('analytics')}
          className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 hover:border-slate-700 cursor-pointer transition-colors shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-medium uppercase">SLA Compliance</span>
            <ShieldCheck className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-400 font-mono">98.4%</p>
          <span className="text-[10px] text-slate-400 font-medium">&lt; 28 min Avg Pickup</span>
        </div>

      </div>

      {/* GIS City Map */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">Metropolitan Smart GIS Command Map</h2>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs text-slate-400 font-mono hidden sm:block">
            Click on any sensor bin, truck, or facility to inspect live telemetry
          </p>
        </div>

        <CityMap heightClass="h-[480px]" />
      </div>

      {/* Row 2: AI Priority Engine Matrix + Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: AI Priority Engine */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Priority Detection Engine</h3>
                <p className="text-[11px] text-slate-400">Autonomous urgency scoring with full explainability</p>
              </div>
            </div>
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300 border border-slate-700">
              {priorityItems.length} Ranked
            </span>
          </div>

          <div className="space-y-2.5">
            {priorityItems.map((item) => {
              const badgeClass =
                item.priority === 'CRITICAL'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : item.priority === 'HIGH'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/30';

              const isSelected = selectedPriority?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPriority(isSelected ? null : item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-slate-850 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeClass}`}>
                          {item.priority} ({item.score}/100)
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{item.timeSensitivity}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-100 mt-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.location}</p>
                    </div>

                    <button className="text-[11px] text-emerald-400 font-medium hover:underline shrink-0 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      <span>{isSelected ? 'Hide' : 'Why this score?'}</span>
                    </button>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-2 animate-fade-in bg-slate-950 p-3 rounded-lg">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">AI Reasoning:</span>
                        <p className="text-xs text-slate-200 mt-0.5">{item.reason}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400 uppercase font-mono">Recommended Autonomous Action:</span>
                        <p className="text-xs text-emerald-300 mt-0.5 font-medium">{item.recommendedAction}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Real-time Alerts Feed */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Real-time Operational Alerts</span>
            </h3>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="space-y-3">
            
            <div className="p-3 rounded-xl border border-red-500/20 bg-red-950/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase">IoT OVERFLOW ALERT</span>
                <span className="text-[10px] text-slate-400">2m ago</span>
              </div>
              <p className="text-xs font-semibold text-slate-100">
                Bin B-101 (Cyber Towers) reached 96% fill level.
              </p>
              <p className="text-[11px] text-slate-300">
                Weekend commercial lunchtime fill rate is +3.4x higher than standard Tuesday baseline.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-950/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">DEMAND FORECAST</span>
                <span className="text-[10px] text-slate-400">14m ago</span>
              </div>
              <p className="text-xs font-semibold text-slate-100">
                Zone 4 (Jubilee Hills) demand expected to rise +45% tomorrow.
              </p>
              <p className="text-[11px] text-slate-300">
                Tech Cultural Festival at HITEX Exhibition Center scheduled.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-950/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">FLEET NOTIFICATION</span>
                <span className="text-[10px] text-slate-400">22m ago</span>
              </div>
              <p className="text-xs font-semibold text-slate-100">
                Truck T-01 has 84% battery charge and 4,620kg current load.
              </p>
              <p className="text-[11px] text-slate-300">
                On schedule for Weighbridge arrival at GreenTech MRF Hub.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Optimize Modal */}
      <OptimizeModal
        isOpen={showOptModal}
        onClose={() => setShowOptModal(false)}
        result={optResult || lastOptimization}
      />

    </div>
  );
};
