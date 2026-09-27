import React from 'react';
import {
  Wrench,
  Battery,
  Activity,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { Vehicle } from '../../types';

export const DriverVehicleHealthView: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Health Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Vehicle Diagnostics & Telemetry</h3>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                SIMULATED TELEMETRY
              </span>
            </div>
            <p className="text-xs text-slate-400">CAN bus telemetry & fleet operation parameters</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-xl font-bold font-mono text-emerald-400">{vehicle.healthScore} / 100</span>
            <p className="text-[10px] text-slate-400 font-mono">Status: OPTIMAL</p>
          </div>
        </div>
      </div>

      {/* Diagnostics Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-center space-y-1">
          <Battery className="h-4 w-4 text-emerald-400 mx-auto" />
          <p className="text-[10px] text-slate-400 uppercase font-mono">Fuel / Battery</p>
          <p className="text-base font-bold font-mono text-white">{vehicle.fuelBatteryLevel}%</p>
          <span className="text-[10px] text-slate-400 font-mono">{vehicle.fuelType}</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-center space-y-1">
          <Activity className="h-4 w-4 text-blue-400 mx-auto" />
          <p className="text-[10px] text-slate-400 uppercase font-mono">Odometer</p>
          <p className="text-base font-bold font-mono text-white">{(vehicle.mileageKm / 1000).toFixed(1)}k km</p>
          <span className="text-[10px] text-emerald-400 font-mono">Service OK</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-center space-y-1">
          <Gauge className="h-4 w-4 text-amber-400 mx-auto" />
          <p className="text-[10px] text-slate-400 uppercase font-mono">Tire Pressure</p>
          <p className="text-base font-bold font-mono text-white">32.4 PSI</p>
          <span className="text-[10px] text-slate-400 font-mono">All 6 Wheels</span>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-center space-y-1">
          <Wrench className="h-4 w-4 text-purple-400 mx-auto" />
          <p className="text-[10px] text-slate-400 uppercase font-mono">Brake Pads</p>
          <p className="text-base font-bold font-mono text-white">88% Life</p>
          <span className="text-[10px] text-emerald-400 font-mono">Next: 12,000km</span>
        </div>
      </div>

      {/* Vehicle Status Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center gap-3 text-xs text-slate-300">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
        <span>All telematics, hydraulic actuators, and emission sensors are operating within certified municipal standards.</span>
      </div>

    </div>
  );
};
