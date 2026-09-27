import React, { useState } from 'react';
import {
  Building2,
  Leaf,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Factory,
  Truck,
  Flame,
  Zap
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const FacilityDashboard: React.FC = () => {
  const { facilities, envStats } = useAppState();
  const [activeTab, setActiveTab] = useState<'inflow' | 'flow'>('inflow');

  const mainFacility = facilities[0] || {
    id: 'fac-01',
    name: 'GreenTech MRF & Circular Hub',
    type: 'Material Recovery (MRF)',
    totalCapacityTonsDay: 350,
    currentProcessingTonsDay: 260,
    recycledOutputTonsMonth: 7200,
    contactPerson: 'Dr. Srinivas Murthy',
    efficiencyScore: 96.4
  };

  const incomingTrucks = [
    { plate: 'TS-09-WF-1001 (T-01)', driver: 'Ramesh Kumar', category: 'Dry / Recyclables', loadKg: 4620, eta: '8 mins', status: 'APPROACHING' },
    { plate: 'TS-09-WF-1002 (T-02)', driver: 'Suresh Babu', category: 'Plastics (PET/HDPE)', loadKg: 2100, eta: '24 mins', status: 'IN_TRANSIT' },
    { plate: 'TS-09-WF-1005 (T-05)', driver: 'Kishore Goud', category: 'Paper & Cardboard', loadKg: 3400, eta: '45 mins', status: 'COLLECTING' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                <Factory className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Recycling & MRF Processing Terminal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {mainFacility.name}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Weighbridge telematics, optical material sorting lines, and circular mass-balance accounting for municipal recovery.
            </p>
          </div>

          {/* Processing Capacity Metric */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-right shrink-0 w-full lg:w-auto">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Daily Processing Throughput</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              {mainFacility.currentProcessingTonsDay} / {mainFacility.totalCapacityTonsDay} Tons
            </div>
            <p className="text-[11px] text-slate-300 font-medium mt-0.5">74.3% Capacity • 96.4% Recovery Rate</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('inflow')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'inflow'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Weighbridge Inflow Queue
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'flow'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Circular Material Recovery Flow
          </button>
        </div>
      </div>

      {activeTab === 'flow' ? (
        /* Circular Material Flow */
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-400" />
                <span>Circular Economy Mass Balance Flow</span>
              </h3>
              <p className="text-xs text-slate-400">Zero-Waste Material Lifecycle Tracking</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
              11,210 Tons Diverted
            </span>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase">1. Ingestion & Pre-Sort</span>
              <h4 className="text-sm font-bold text-white">14,280 Tons Collected</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Doorstep citizen pickups + 52 Smart IoT Bins with optical NIR segregation.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-300 font-mono">
                Purity Index: <b>94.2%</b>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <span className="text-[10px] font-mono font-semibold text-purple-400 uppercase">2. Advanced Recovery (MRF)</span>
              <h4 className="text-sm font-bold text-white">6,420 Tons Recycled</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hydrapulper paper slurry, PET/HDPE pelletizing lines & magnetic metal separation.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-purple-300 font-mono">
                Recovery Rate: <b>96.0%</b>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">3. Bio-Methanation & Compost</span>
              <h4 className="text-sm font-bold text-white">4,180 Tons Organic</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anaerobic digesters produce clean municipal biogas + compost for urban agriculture.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 font-mono">
                Biogas Output: <b>180,000 m³</b>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
              <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase">4. E-Waste & Precious Metals</span>
              <h4 className="text-sm font-bold text-white">610,200 kg Recovered</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hydrometallurgical extraction of lithium, copper, gold, and aluminum from PCB components.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
                Refining Purity: <b>98.2%</b>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Weighbridge Inflow Queue */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Manifests Table */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white pb-2.5 border-b border-slate-800 flex items-center justify-between">
              <span>Incoming Hauler Weighbridge Manifests</span>
              <span className="text-xs text-emerald-400 font-mono">3 Haulers Inbound</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5">Vehicle</th>
                    <th className="px-3 py-2.5">Driver</th>
                    <th className="px-3 py-2.5">Category</th>
                    <th className="px-3 py-2.5">Est. Load</th>
                    <th className="px-3 py-2.5">ETA</th>
                    <th className="px-3 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {incomingTrucks.map((truck) => (
                    <tr key={truck.plate} className="hover:bg-slate-850 transition-colors">
                      <td className="px-3 py-3 font-mono font-semibold text-white">{truck.plate}</td>
                      <td className="px-3 py-3 text-slate-200">{truck.driver}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                          {truck.category}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono font-medium text-emerald-400">{truck.loadKg} kg</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {truck.eta}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => alert(`Weighbridge Bay auto-assigned to ${truck.plate}`)}
                          className="text-xs text-emerald-400 hover:underline font-medium"
                        >
                          Assign Bay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Facility Operating Parameters */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white pb-2.5 border-b border-slate-800">
              Facility Operating Parameters
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Operational Sort Lines:</span>
                <span className="font-semibold text-white">4 Sort Lines (Optical NIR)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Monthly Recycled Output:</span>
                <span className="font-bold text-emerald-400">{mainFacility.recycledOutputTonsMonth} Tons</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Contact Person:</span>
                <span className="text-slate-200">{mainFacility.contactPerson}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Compliance Standard:</span>
                <span className="font-mono text-emerald-400">ISO-14001 Certified</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
