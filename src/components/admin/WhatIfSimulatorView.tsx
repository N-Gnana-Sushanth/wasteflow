import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  Flame,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Clock,
  Fuel,
  Play
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { MOCK_WHAT_IF_SCENARIOS } from '../../data/mockData';
import { WhatIfScenario } from '../../types';

export const WhatIfSimulatorView: React.FC = () => {
  const {
    activeScenario,
    scenarioImpactResult,
    runWhatIfScenario,
    clearWhatIfScenario
  } = useAppState();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(MOCK_WHAT_IF_SCENARIOS[0].id);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const selectedScenario = MOCK_WHAT_IF_SCENARIOS.find((s) => s.id === selectedScenarioId) || MOCK_WHAT_IF_SCENARIOS[0];

  const handleExecuteSim = () => {
    setIsRunning(true);
    setTimeout(() => {
      runWhatIfScenario(selectedScenarioId);
      setIsRunning(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-red-950/80 border border-amber-500/30 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold">
              <Wrench className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">What-If Resiliency & Disruption Sandbox</h2>
            <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              Predictive Stress Testing
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Simulate real-world municipal shocks: vehicle breakdowns, flash arterial road closures, unexpected waste spikes, and facility outages. Test auto-recovery heuristics without affecting live operations.
          </p>
        </div>

        {activeScenario && (
          <button
            onClick={clearWhatIfScenario}
            className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-semibold"
          >
            Clear Simulation
          </button>
        )}
      </div>

      {/* Scenario Selection Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          1. Select Disruption Scenario to Inject:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {MOCK_WHAT_IF_SCENARIOS.map((scen) => {
            const isSelected = selectedScenarioId === scen.id;
            return (
              <div
                key={scen.id}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-amber-400 bg-slate-850 shadow-xl ring-1 ring-amber-400'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{scen.type}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      {scen.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mt-2">{scen.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{scen.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Vehicles Affected: <b className="text-slate-200">{scen.impacts.vehiclesAffected}</b></span>
                  <span>Delay: <b className="text-amber-400">+{scen.impacts.additionalTimeMin}m</b></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Trigger */}
      <div className="flex justify-center">
        <button
          onClick={handleExecuteSim}
          disabled={isRunning}
          className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-95 text-slate-950 font-black px-8 py-3.5 text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Simulating Autonomous Recovery...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>RUN WHAT-IF IMPACT SIMULATION</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* Simulation Results & Mitigation Plan */}
      {scenarioImpactResult && (
        <div className="rounded-2xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Dynamic Re-routing Outcome</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{scenarioImpactResult.impactHeadline}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
              Mitigation Active
            </span>
          </div>

          {/* Delta Impact Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <Clock className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <p className="text-[10px] font-mono text-slate-400 uppercase">Total Delay Added</p>
              <p className="text-base font-bold text-amber-300">+{scenarioImpactResult.summaryChanges.timeAddedMin} Mins</p>
              <span className="text-[10px] text-slate-500 font-mono">Preserves 100% SLA</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <Fuel className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-[10px] font-mono text-slate-400 uppercase">Extra Fuel Burn</p>
              <p className="text-base font-bold text-blue-300">+{scenarioImpactResult.summaryChanges.fuelAddedLiters} Liters</p>
              <span className="text-[10px] text-slate-500 font-mono">Via ORR Arterial</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <TrendingUp className="h-5 w-5 text-purple-400 mx-auto mb-1" />
              <p className="text-[10px] font-mono text-slate-400 uppercase">Stops Re-Sequenced</p>
              <p className="text-base font-bold text-purple-300">{scenarioImpactResult.summaryChanges.reroutedStopsCount} Waypoints</p>
              <span className="text-[10px] text-emerald-400 font-mono">0 Dropped Pickups</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <DollarSign className="h-5 w-5 text-red-400 mx-auto mb-1" />
              <p className="text-[10px] font-mono text-slate-400 uppercase">Cost Delta</p>
              <p className="text-base font-bold text-red-300">+${scenarioImpactResult.summaryChanges.financialImpactUSD}</p>
              <span className="text-[10px] text-slate-500 font-mono">Estimated Shift Impact</span>
            </div>
          </div>

          {/* Autonomous Heuristic Strategy Explanation */}
          <div className="rounded-xl bg-slate-950/80 border border-emerald-500/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>AI Autonomous Self-Healing Dispatch Policy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {scenarioImpactResult.summaryChanges.mitigationSummary}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
