import React, { useState } from 'react';
import {
  Trash2,
  AlertTriangle,
  Battery,
  Thermometer,
  Clock,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  Activity,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { SmartBin, BinStatus, WasteCategory } from '../../types';
import { ZONES } from '../../data/mockData';

export const SmartBinIoTView: React.FC = () => {
  const { bins, triggerQuickScenario } = useAppState();

  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredBins = bins.filter((bin) => {
    const matchesZone = selectedZone === 'ALL' || bin.location.zone === selectedZone;
    const matchesStatus = selectedStatus === 'ALL' || bin.status === selectedStatus;
    const matchesCat = selectedCategory === 'ALL' || bin.category === selectedCategory;
    const matchesSearch =
      bin.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bin.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesStatus && matchesCat && matchesSearch;
  });

  const getStatusColor = (status: BinStatus) => {
    switch (status) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/60 border-red-800/60';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'FILLING':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800/60';
      case 'OFFLINE':
        return 'text-slate-400 bg-slate-900 border-slate-700';
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/80 border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-slate-950 font-bold">
              <Activity className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">IoT Smart Bin Telemetry Center</h2>
            <span className="rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              52 Live Sensors
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Live ultrasonic depth measurement, tilt sensors, internal thermal sensors, battery state-of-charge, and AI overflow velocity forecasting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerQuickScenario('overflow')}
            className="flex items-center gap-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/60 px-3 py-2 text-xs font-semibold transition-colors"
          >
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span>Trigger Spike Surge</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Bin code (e.g. 'BIN-101') or location..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Zones</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="CRITICAL">CRITICAL (&gt;90%)</option>
            <option value="HIGH">HIGH (&gt;75%)</option>
            <option value="FILLING">FILLING (50-74%)</option>
            <option value="NORMAL">NORMAL (&lt;50%)</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Waste Types</option>
            <option value="Plastic">Plastic</option>
            <option value="Dry">Dry Recyclable</option>
            <option value="Wet">Wet / Organic</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Metal">Metal</option>
            <option value="E-Waste">E-Waste</option>
            <option value="Hazardous">Hazardous</option>
          </select>

          <div className="flex rounded-lg bg-slate-950 border border-slate-700 p-0.5 ml-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBins.map((bin) => {
            const fill = bin.currentFillLevel;
            const barColor = fill >= 90 ? 'bg-red-500' : fill >= 75 ? 'bg-amber-500' : fill >= 50 ? 'bg-yellow-500' : 'bg-emerald-500';

            return (
              <div
                key={bin.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-mono text-xs font-bold text-white">{bin.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getStatusColor(bin.status)}`}>
                      {bin.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 mt-2 truncate">{bin.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{bin.location.address}</p>
                  
                  {/* Fill Gauge Bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Ultrasonic Fill Level:</span>
                      <span className="font-mono font-bold text-white">{fill}% ({bin.fillWeightKg} kg)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${fill}%` }} />
                    </div>
                  </div>

                  {/* Telemetry Row */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3.5 w-3.5 text-blue-400" />
                      <span>{bin.temperatureCelsius}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Battery className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{bin.batteryLevel}% Battery</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-red-400 font-bold">Overflow: ~{bin.predictedOverflowMinutes}m</span>
                  <span>Ping: {bin.lastCommunication}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th className="py-3 px-4 font-mono">Bin ID</th>
                <th className="py-3 px-4">Location / Zone</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Fill Level</th>
                <th className="py-3 px-4">Temp / Battery</th>
                <th className="py-3 px-4">Pred. Overflow</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredBins.map((bin) => (
                <tr key={bin.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-brand-300">{bin.code}</td>
                  <td className="py-2.5 px-4">
                    <p className="font-semibold text-white">{bin.name}</p>
                    <p className="text-[10px] text-slate-400">{bin.location.zone}</p>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono border border-slate-800">
                      {bin.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">{bin.currentFillLevel}%</span>
                      <div className="h-1.5 w-16 bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            bin.currentFillLevel >= 90 ? 'bg-red-500' : bin.currentFillLevel >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${bin.currentFillLevel}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-slate-400">
                    {bin.temperatureCelsius}°C • {bin.batteryLevel}%
                  </td>
                  <td className="py-2.5 px-4 font-mono text-red-400 font-bold">
                    in {bin.predictedOverflowMinutes} mins
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getStatusColor(bin.status)}`}>
                      {bin.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
