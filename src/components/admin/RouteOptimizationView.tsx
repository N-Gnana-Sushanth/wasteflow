import React, { useState } from 'react';
import {
  Sparkles,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Fuel,
  TrendingDown,
  Navigation,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { OptimizedRoute, RouteStop } from '../../types';

export const RouteOptimizationView: React.FC = () => {
  const { activeRoutes, optimizeCityCollection, lastOptimization } = useAppState();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(activeRoutes[0]?.id || '');

  const selectedRoute = activeRoutes.find((r) => r.id === selectedRouteId) || activeRoutes[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950/80 border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-slate-950 font-bold">
              <Navigation className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Dynamic Route Planning & Manifest Dispatch</h2>
            <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              {activeRoutes.length} Active Fleet Routes
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Multi-constraint TSP solver factoring in sensor urgency, vehicle weight limits, live traffic congestion, and destination MRF capacity.
          </p>
        </div>

        <button
          onClick={() => optimizeCityCollection()}
          className="flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-4 py-2.5 text-xs shadow-lg shadow-brand-500/20 transition-all"
        >
          <Sparkles className="h-4 w-4 fill-current" />
          <span>Recalculate AI Dispatch</span>
        </button>
      </div>

      {/* Grid: Route List + Selected Manifest Stops */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Vehicle Manifests */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Fleet Manifests:
          </h3>

          {activeRoutes.map((route) => {
            const isSelected = selectedRoute?.id === route.id;
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-400 bg-slate-850 shadow-xl'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{route.vehicleName}</h4>
                      <p className="text-[11px] text-slate-400">Driver: <b>{route.driverName}</b></p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    route.status === 'REROUTED' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {route.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 font-mono">
                  <div>
                    <span className="text-slate-500 text-[9px] block">DISTANCE</span>
                    <span className="font-bold">{route.totalDistanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">EST. TIME</span>
                    <span className="font-bold">{route.estimatedDurationMin} min</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">STOPS</span>
                    <span className="font-bold text-brand-400">{route.stops.length} Waypoints</span>
                  </div>
                </div>

                {/* Capacity utilization bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Payload: {route.totalLoadKg} kg</span>
                    <span className="font-bold">{route.capacityUtilizationPercent}% Utilized</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-400 rounded-full"
                      style={{ width: `${Math.min(100, route.capacityUtilizationPercent)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Manifest Detailed Waypoints */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-brand-400 uppercase">Selected Turn-by-Turn Manifest</span>
              <h3 className="text-base font-bold text-white">{selectedRoute?.vehicleName} ({selectedRoute?.zone})</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Generated: {new Date(selectedRoute?.generatedAt || Date.now()).toLocaleTimeString()}
            </span>
          </div>

          <div className="space-y-3">
            {selectedRoute?.stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-slate-950 font-bold text-xs shrink-0 mt-0.5">
                  {stop.order}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{stop.name}</h4>
                    <span className="text-[10px] font-mono text-amber-400 font-semibold">ETA: ~{stop.etaMinutes}m</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stop.address}</p>

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-mono">
                    <span>Type: <b className="text-brand-300">{stop.type}</b></span>
                    <span>Category: <b>{stop.category}</b></span>
                    <span>Load: <b>{stop.estimatedWeightKg} kg</b></span>
                    <span>Time Window: <b>{stop.timeWindow}</b></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
