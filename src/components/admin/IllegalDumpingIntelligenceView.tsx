import React, { useState } from 'react';
import {
  Flame,
  AlertTriangle,
  Camera,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { Incident } from '../../types';

export const IllegalDumpingIntelligenceView: React.FC = () => {
  const { incidents, updateIncidentStatus } = useAppState();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');

  const selectedInc = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const handleAssignCrew = (crew: string) => {
    if (selectedInc) {
      updateIncidentStatus(selectedInc.id, 'ASSIGNED', crew);
    }
  };

  const handleResolve = () => {
    if (selectedInc) {
      updateIncidentStatus(selectedInc.id, 'RESOLVED');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-orange-950/80 border border-red-500/30 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500 text-slate-950 font-bold">
              <Flame className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Autonomous Illegal Dumping Intelligence</h2>
            <span className="rounded-full bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              AI Vision & Hotspot Clustering
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            CCTV optical surveillance feeds, drone sweeps, and citizen geotagged reports with automatic repeat-hotspot recognition and rapid squad dispatch.
          </p>
        </div>
      </div>

      {/* Main Grid: Incident Tickets List + Detailed Evidence Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Incidents List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Dumping Incidents & AI Detections:
          </h3>

          {incidents.map((inc) => {
            const isSelected = selectedInc?.id === inc.id;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncidentId(inc.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'border-red-400 bg-slate-850 shadow-xl ring-1 ring-red-400'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{inc.incidentNumber}</span>
                    {inc.repeatHotspot && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        🔥 HOTSPOT ({inc.repeatIncidentCount}x)
                      </span>
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {inc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-200 line-clamp-2">{inc.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
                  <span>{inc.location.zone}</span>
                  <span className="text-brand-400">AI Conf: {inc.aiDetectionConfidence || 92}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Evidence & Dispatch Inspector */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-5">
          {selectedInc ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-red-400 uppercase">Evidence Inspector</span>
                  <h3 className="text-base font-bold text-white mt-0.5">Ticket #{selectedInc.incidentNumber}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/40">
                  {selectedInc.severity} SEVERITY
                </span>
              </div>

              {/* Photo Evidence with AI Bounding Box Simulation */}
              <div className="h-60 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img src={selectedInc.imageUrl} alt="Evidence" className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 bg-slate-950/90 border border-red-500/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-red-300">
                  AI TARGET: Mixed Debris & Polythene (Confidence {selectedInc.aiDetectionConfidence || 94}%)
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono">Report Source:</span>
                  <p className="font-semibold text-slate-200">{selectedInc.reportedBy}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono">Timestamp:</span>
                  <p className="font-mono text-slate-200">{new Date(selectedInc.reportedAt).toLocaleString()}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono">Exact Address:</span>
                  <p className="font-medium text-slate-200">{selectedInc.location.address}</p>
                </div>
              </div>

              {/* Dispatch Action Panel */}
              <div className="pt-2 space-y-3">
                <p className="text-xs font-semibold text-slate-300">Mobilize Rapid Clean Squad:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAssignCrew('Rapid Clean Squad #1 (T-08)')}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 py-2.5 text-xs font-semibold"
                  >
                    <Truck className="h-4 w-4 text-brand-400" />
                    <span>Dispatch Squad #1 (E-Trike T-08)</span>
                  </button>

                  <button
                    onClick={() => handleAssignCrew('Heavy Recovery Squad #2 (T-09)')}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 py-2.5 text-xs font-semibold"
                  >
                    <Truck className="h-4 w-4 text-amber-400" />
                    <span>Dispatch Heavy Squad #2 (T-09)</span>
                  </button>
                </div>

                {selectedInc.status !== 'RESOLVED' && (
                  <button
                    onClick={handleResolve}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-2.5 text-xs shadow-lg shadow-brand-500/20 transition-all"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark Incident Cleared & Close Ticket</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">Select an incident to review evidence</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
