import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, TrendingDown, Fuel, Clock, MapPin, DollarSign, ShieldAlert, X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

interface OptimizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
}

export const OptimizeModal: React.FC<OptimizeModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const { summaryBefore, summaryAfter, deltaSavings } = result;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-brand-500/40 bg-slate-900 p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-500/30 text-brand-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                City Route Optimization Complete
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 border border-emerald-500/30">
                  AI Applied
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Multi-constraint TSP, vehicle load balancing & traffic heuristic solver
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Delta Highlights Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/30 p-3 text-center">
            <TrendingDown className="mx-auto h-5 w-5 text-emerald-400 mb-1" />
            <p className="text-[11px] text-slate-400 uppercase font-mono">Distance Saved</p>
            <p className="text-base font-bold text-emerald-300">-{deltaSavings.distanceSavedKm} km</p>
            <span className="text-[10px] text-emerald-400 font-medium">({deltaSavings.distanceSavedPercent}% drop)</span>
          </div>

          <div className="rounded-xl border border-blue-800/40 bg-blue-950/30 p-3 text-center">
            <Fuel className="mx-auto h-5 w-5 text-blue-400 mb-1" />
            <p className="text-[11px] text-slate-400 uppercase font-mono">Fuel Conserved</p>
            <p className="text-base font-bold text-blue-300">-{deltaSavings.fuelSavedLiters} L</p>
            <span className="text-[10px] text-blue-400 font-medium">{deltaSavings.co2SavedKg}kg CO₂ cut</span>
          </div>

          <div className="rounded-xl border border-amber-800/40 bg-amber-950/30 p-3 text-center">
            <Clock className="mx-auto h-5 w-5 text-amber-400 mb-1" />
            <p className="text-[11px] text-slate-400 uppercase font-mono">Time Reduction</p>
            <p className="text-base font-bold text-amber-300">-{deltaSavings.timeSavedMin} mins</p>
            <span className="text-[10px] text-amber-400 font-medium">Across all fleets</span>
          </div>

          <div className="rounded-xl border border-purple-800/40 bg-purple-950/30 p-3 text-center">
            <DollarSign className="mx-auto h-5 w-5 text-purple-400 mb-1" />
            <p className="text-[11px] text-slate-400 uppercase font-mono">Cost Savings</p>
            <p className="text-base font-bold text-purple-300">${deltaSavings.costSavedUSD}</p>
            <span className="text-[10px] text-purple-400 font-medium">Per dispatch shift</span>
          </div>
        </div>

        {/* Detailed Before vs After Comparison Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-left">
                <th className="py-2.5 px-3">Performance Dimension</th>
                <th className="py-2.5 px-3 text-slate-400">Legacy Sequence</th>
                <th className="py-2.5 px-3 text-brand-300">AI Optimized</th>
                <th className="py-2.5 px-3 text-right">Net Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="py-2 px-3 font-medium">Total Route Distance</td>
                <td className="py-2 px-3 text-slate-400">{summaryBefore.totalDistanceKm} km</td>
                <td className="py-2 px-3 text-emerald-300 font-semibold">{summaryAfter.totalDistanceKm} km</td>
                <td className="py-2 px-3 text-right text-emerald-400">-{deltaSavings.distanceSavedKm} km</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Fleet Transit Time</td>
                <td className="py-2 px-3 text-slate-400">{summaryBefore.totalDurationMin} mins</td>
                <td className="py-2 px-3 text-emerald-300 font-semibold">{summaryAfter.totalDurationMin} mins</td>
                <td className="py-2 px-3 text-right text-emerald-400">-{deltaSavings.timeSavedMin} mins</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Critical Bins Addressed</td>
                <td className="py-2 px-3 text-red-400">{summaryBefore.criticalBinsAddressed} Bins</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">{summaryAfter.criticalBinsAddressed} Bins (100%)</td>
                <td className="py-2 px-3 text-right text-emerald-400">Zero Overflows</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Estimated Fuel Burn</td>
                <td className="py-2 px-3 text-slate-400">{summaryBefore.fuelLiters} L</td>
                <td className="py-2 px-3 text-emerald-300 font-semibold">{summaryAfter.fuelLiters} L</td>
                <td className="py-2 px-3 text-right text-emerald-400">-{deltaSavings.fuelSavedLiters} L</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            <span>Dispatched live manifests to 8 active fleet drivers</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-4 py-2 text-xs transition-colors shadow-lg shadow-brand-500/20"
          >
            Acknowledge & Sync Fleet
          </button>
        </div>

      </div>
    </div>
  );
};
