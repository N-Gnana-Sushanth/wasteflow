import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Navigation,
  Clock,
  ShieldCheck,
  Phone,
  QrCode,
  Camera,
  AlertTriangle,
  ArrowRight,
  Battery,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { RouteStop } from '../../types';
import { DriverStopDetailModal } from './DriverStopDetailModal';
import { DriverVehicleHealthView } from './DriverVehicleHealthView';

export const DriverDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { vehicles, activeRoutes } = useAppState();

  const [activeTab, setActiveTab] = useState<'manifest' | 'health'>('manifest');
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Match driver's vehicle (T-01)
  const currentVehicle = vehicles.find((v) => v.driverId === currentUser.id) || vehicles[0];
  const assignedRoute = activeRoutes.find((r) => r.vehicleId === currentVehicle.id) || activeRoutes[0];

  const stops = assignedRoute?.stops || [];
  const completedCount = stops.filter((s) => s.status === 'COLLECTED').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Driver Header Banner */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{currentVehicle.name}</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-[10px] font-mono font-medium border border-emerald-800/60">
                  ON SHIFT
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Driver: <b>{currentVehicle.driverName}</b> • Plate: <span className="font-mono">{currentVehicle.plateNumber}</span>
              </p>
            </div>
          </div>

          {/* Status & Battery */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isOfflineMode
                  ? 'bg-red-950/40 border-red-800/60 text-red-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {isOfflineMode ? <WifiOff className="h-3.5 w-3.5" /> : <Wifi className="h-3.5 w-3.5 text-emerald-400" />}
              <span>{isOfflineMode ? 'Offline Mode' : '5G Connected'}</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Battery className="h-3.5 w-3.5 text-emerald-400" />
              <span>{currentVehicle.fuelBatteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('manifest')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'manifest'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Today's Route Manifest ({stops.length} Stops)
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'health'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Vehicle Telematics (Score: {currentVehicle.healthScore})
          </button>
        </div>
      </div>

      {activeTab === 'health' ? (
        <DriverVehicleHealthView vehicle={currentVehicle} />
      ) : (
        <>
          {/* Capacity Utilization Progress Bar */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Truck Payload Capacity:</span>
              <span className="font-mono font-semibold text-emerald-400">
                {currentVehicle.currentLoadKg} / {currentVehicle.capacityKg} kg ({Math.round((currentVehicle.currentLoadKg / currentVehicle.capacityKg) * 100)}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, (currentVehicle.currentLoadKg / currentVehicle.capacityKg) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>{completedCount} of {stops.length} Stops Completed</span>
              <span>Estimated Finish: 16:30</span>
            </div>
          </div>

          {/* Stops List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Assigned Stop Sequence:
            </h3>

            {stops.map((stop, idx) => {
              const isFirstPending = stops.findIndex((s) => s.status === 'PENDING') === idx;

              return (
                <div
                  key={stop.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isFirstPending
                      ? 'border-emerald-500/80 bg-slate-900 shadow-sm ring-1 ring-emerald-500/30'
                      : stop.status === 'COLLECTED'
                      ? 'border-slate-800/80 bg-slate-950/40 opacity-70'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold text-xs shrink-0 ${
                        stop.status === 'COLLECTED'
                          ? 'bg-emerald-600 text-white'
                          : isFirstPending
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {stop.status === 'COLLECTED' ? <CheckCircle2 className="h-4 w-4" /> : stop.order}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-white">{stop.name}</h4>
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-300 border border-slate-800">
                            {stop.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{stop.address}</p>
                        
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 font-mono">
                          <span>Payload: <b className="text-slate-200">~{stop.estimatedWeightKg} kg</b></span>
                          <span>Category: <b>{stop.category}</b></span>
                          <span>Time Slot: <b>{stop.timeWindow}</b></span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono font-medium text-emerald-400 block">
                        ETA: ~{stop.etaMinutes}m
                      </span>
                      <button
                        onClick={() => setSelectedStop(stop)}
                        className={`mt-2 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isFirstPending
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <span>{stop.status === 'COLLECTED' ? 'View Details' : 'Perform Action'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Stop Detail / OTP Collection Verification Modal */}
      <DriverStopDetailModal
        isOpen={!!selectedStop}
        onClose={() => setSelectedStop(null)}
        stop={selectedStop}
      />

    </div>
  );
};
