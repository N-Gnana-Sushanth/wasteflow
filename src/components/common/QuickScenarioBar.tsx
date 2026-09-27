import React from 'react';
import { AlertCircle, Wrench, Navigation, Flame, TrendingUp, Play, Pause } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const QuickScenarioBar: React.FC = () => {
  const {
    triggerQuickScenario,
    isSimulating,
    toggleSimulation,
    simulationSpeed,
    setSimSpeed
  } = useAppState();

  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 py-2">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Scenario Injection Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">DEMO</span>
            Scenarios:
          </span>

          <button
            onClick={() => triggerQuickScenario('overflow')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 px-2.5 py-1 transition-colors text-xs"
            title="Simulates Smart Bin critical overflow condition"
          >
            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
            <span>Bin Overflow</span>
          </button>

          <button
            onClick={() => triggerQuickScenario('breakdown')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 px-2.5 py-1 transition-colors text-xs"
            title="Simulates mechanical breakdown of vehicle and auto-reroutes"
          >
            <Wrench className="h-3.5 w-3.5 text-amber-400" />
            <span>Truck Breakdown</span>
          </button>

          <button
            onClick={() => triggerQuickScenario('traffic')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 px-2.5 py-1 transition-colors text-xs"
            title="Simulates traffic surge rerouting"
          >
            <Navigation className="h-3.5 w-3.5 text-blue-400" />
            <span>Traffic Surge</span>
          </button>

          <button
            onClick={() => triggerQuickScenario('dumping')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 px-2.5 py-1 transition-colors text-xs"
            title="Simulates illegal dumping incident report"
          >
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span>Illegal Dumping</span>
          </button>

          <button
            onClick={() => triggerQuickScenario('surge')}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 px-2.5 py-1 transition-colors text-xs"
            title="Simulates commercial waste volume surge"
          >
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span>Waste Surge</span>
          </button>
        </div>

        {/* Telemetry Ticker Speed Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
              isSimulating
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
            }`}
          >
            {isSimulating ? <Pause className="h-3 w-3 text-slate-400" /> : <Play className="h-3 w-3 text-emerald-400" />}
            <span>{isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}</span>
          </button>

          <div className="flex items-center bg-slate-800/70 rounded-lg border border-slate-700/80 p-0.5">
            {[1, 5, 10].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimSpeed(spd)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md ${
                  simulationSpeed === spd
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
