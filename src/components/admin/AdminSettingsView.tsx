import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  FileText,
  UserCheck,
  Server,
  Lock,
  CheckCircle2,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { ZONES } from '../../data/mockData';

export const AdminSettingsView: React.FC = () => {
  const { auditLogs, resetAllDemoData } = useAppState();

  const [slaMinutes, setSlaMinutes] = useState<number>(45);
  const [criticalFillThreshold, setCriticalFillThreshold] = useState<number>(90);
  const [autoDispatchEnabled, setAutoDispatchEnabled] = useState<boolean>(true);
  const [aiConfidenceCutoff, setAiConfidenceCutoff] = useState<number>(85);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 border border-slate-700 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-slate-950 font-bold">
              <Sliders className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">System Administration & Security Policies</h2>
            <span className="rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              Municipal SLA Engine v4.2
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Configure automated IoT trigger thresholds, SLA breach penalties, AI vision confidence cutoffs, and inspect immutable audit logs.
          </p>
        </div>

        <button
          onClick={resetAllDemoData}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 px-3.5 py-2 text-xs font-semibold transition-colors"
        >
          <RefreshCw className="h-4 w-4 text-amber-400" />
          <span>Reset Demo Environment</span>
        </button>
      </div>

      {saveToast && (
        <div className="rounded-xl bg-emerald-950/80 border border-emerald-500/50 p-3 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Municipal system configuration updated & propagated across IoT gateways!</span>
        </div>
      )}

      {/* Grid: Config Form + Audit Logs Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: SLA & Engine Configuration */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 mb-4 flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-400" />
            <span>Autonomous Dispatch & SLA Rules</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Maximum Pickup SLA Response Target:</span>
                <span className="text-brand-400 font-mono font-bold">{slaMinutes} Minutes</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={slaMinutes}
                onChange={(e) => setSlaMinutes(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-slate-500">Pickups exceeding {slaMinutes}m automatically trigger supervisor alerts</span>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Smart Bin Emergency Overflow Threshold:</span>
                <span className="text-red-400 font-mono font-bold">{criticalFillThreshold}% Fill</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={criticalFillThreshold}
                onChange={(e) => setCriticalFillThreshold(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>AI Vision Classifier Auto-Accept Cutoff:</span>
                <span className="text-purple-400 font-mono font-bold">{aiConfidenceCutoff}% Confidence</span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                value={aiConfidenceCutoff}
                onChange={(e) => setAiConfidenceCutoff(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <p className="font-bold text-slate-200">Autonomous Re-Routing</p>
                <p className="text-[11px] text-slate-400">Allow AI engine to automatically recalculate TSP upon 98% bin spikes</p>
              </div>
              <input
                type="checkbox"
                checked={autoDispatchEnabled}
                onChange={(e) => setAutoDispatchEnabled(e.target.checked)}
                className="h-4 w-4 accent-brand-500 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-2.5 text-xs transition-colors shadow-lg shadow-brand-500/20"
            >
              Save & Apply SLA Parameters
            </button>
          </form>
        </div>

        {/* Right: Immutable Security Audit Logs */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span>Immutable System Audit Logs</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">SOC-2 / Gov Cert</span>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2 text-xs">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1 font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-300">{log.action}</span>
                  <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>User: {log.userName}</span>
                  <span>IP: {log.ipAddress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
