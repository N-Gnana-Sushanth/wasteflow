import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {
  Truck,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Sparkles,
  QrCode,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { PickupRequest } from '../../types';

interface LiveTrackingViewProps {
  pickupId?: string;
  onOpenReceipt?: (pickup: PickupRequest) => void;
}

export const LiveTrackingView: React.FC<LiveTrackingViewProps> = ({ pickupId = 'req-01', onOpenReceipt }) => {
  const { pickups, vehicles } = useAppState();

  const currentPickup = pickups.find((p) => p.id === pickupId) || pickups[0];
  const assignedVehicle = vehicles.find((v) => v.id === currentPickup?.assignedVehicleId) || vehicles[0];

  const citizenCoords: [number, number] = [currentPickup.location.lat, currentPickup.location.lng];
  const vehicleCoords: [number, number] = [assignedVehicle.currentLocation.lat, assignedVehicle.currentLocation.lng];

  // Create custom marker icons
  const citizenIcon = L.divIcon({
    className: 'custom-pin',
    html: `<div style="background:#22c55e;color:#052e16;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(34,197,94,0.6);border:2px solid white;">🏠</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  const truckIcon = L.divIcon({
    className: 'custom-truck-live',
    html: `<div style="background:#f59e0b;color:#451a03;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 14px rgba(245,158,11,0.6);border:2px solid white;transform:rotate(${assignedVehicle.heading}deg);">🚚</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });

  const workflowStages = [
    { label: 'REQUESTED', done: true },
    { label: 'APPROVED', done: true },
    { label: 'ASSIGNED', done: true },
    { label: 'DRIVER EN ROUTE', done: currentPickup.status !== 'REQUESTED' && currentPickup.status !== 'APPROVED' && currentPickup.status !== 'ASSIGNED' },
    { label: 'ARRIVED', done: currentPickup.status === 'ARRIVED' || currentPickup.status === 'COLLECTED' || currentPickup.status === 'VERIFIED' || currentPickup.status === 'COMPLETED' },
    { label: 'COLLECTED', done: currentPickup.status === 'COLLECTED' || currentPickup.status === 'VERIFIED' || currentPickup.status === 'COMPLETED' },
    { label: 'VERIFIED', done: currentPickup.status === 'VERIFIED' || currentPickup.status === 'COMPLETED' },
    { label: 'COMPLETED', done: currentPickup.status === 'COMPLETED' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 8-Stage Progress Timeline Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-400">Live Collection Telematics</span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{currentPickup.requestNumber}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {currentPickup.status}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Estimated Arrival:</span>
            <span className="font-mono font-bold text-amber-400 text-sm flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40">
              <Clock className="h-3.5 w-3.5" />
              11 Mins (1.8 km away)
            </span>
          </div>
        </div>

        {/* Workflow steps */}
        <div className="pt-4 overflow-x-auto">
          <div className="flex items-center min-w-[650px] justify-between relative">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-slate-800 z-0" />
            {workflowStages.map((stage, idx) => (
              <div key={stage.label} className="relative z-10 flex flex-col items-center">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    stage.done
                      ? 'bg-brand-500 text-slate-950 ring-4 ring-brand-500/20 shadow-md'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {stage.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <span className={`text-[9px] font-mono mt-1.5 uppercase ${stage.done ? 'text-brand-300 font-bold' : 'text-slate-500'}`}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Map + Driver Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map Section */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl relative">
          <div className="h-[460px] w-full">
            <MapContainer
              center={citizenCoords}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              {/* Route connecting truck to house */}
              <Polyline
                positions={[vehicleCoords, [17.4480, 78.3800], citizenCoords]}
                pathOptions={{ color: '#22c55e', weight: 5, opacity: 0.85, dashArray: '8, 8' }}
              />

              {/* Citizen Marker */}
              <Marker position={citizenCoords} icon={citizenIcon}>
                <Popup>
                  <div className="p-1 text-slate-900 font-sans">
                    <p className="font-bold text-xs">Your Pickup Location</p>
                    <p className="text-[11px] text-slate-600">{currentPickup.location.address}</p>
                    <p className="text-[10px] text-brand-600 font-bold mt-1">OTP: {currentPickup.verificationOtp}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Truck Marker */}
              <Marker position={vehicleCoords} icon={truckIcon}>
                <Popup>
                  <div className="p-1 text-slate-900 font-sans">
                    <p className="font-bold text-xs">{assignedVehicle.name}</p>
                    <p className="text-[11px] text-slate-600">Driver: {assignedVehicle.driverName}</p>
                    <p className="text-[10px] text-amber-600 font-bold mt-1">Status: En Route (ETA 11 min)</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Floating Telemetry Pill */}
          <div className="absolute top-3 right-3 z-[1000] bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl backdrop-blur-md text-xs text-slate-200 shadow-xl space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono font-bold text-emerald-400">GPS TELEMETRY ACTIVE</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Speed: 28 km/h • Heading: {assignedVehicle.heading}°</p>
          </div>
        </div>

        {/* Driver & OTP Card */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Driver Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Assigned Collection Crew
            </h4>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md">
                RK
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{assignedVehicle.driverName}</p>
                <p className="text-xs text-slate-400">{assignedVehicle.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-amber-400 font-medium">
                  <span>★ 4.98 Municipal Rating</span>
                  <span>•</span>
                  <span>1,420 Pickups</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <a
                href="tel:+919849054321"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-brand-400" />
                <span>Call Driver</span>
              </a>

              <button
                onClick={() => alert(`Vehicle Plate: ${assignedVehicle.plateNumber}\nAssigned Depot: Gachibowli Logistics Park\nVehicle Type: ${assignedVehicle.type}`)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                <span>Fleet Info</span>
              </button>
            </div>
          </div>

          {/* Verification Code Box */}
          <div className="rounded-2xl border border-brand-500/40 bg-slate-950 p-5 shadow-xl text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Your Handover Token</span>
            <div className="my-2 rounded-xl bg-brand-950/40 border border-brand-500/30 py-3">
              <p className="text-3xl font-black font-mono tracking-widest text-brand-400">
                {currentPickup.verificationOtp}
              </p>
            </div>
            <p className="text-[11px] text-slate-400">
              Show this code to the driver upon doorstep arrival to complete secure handover.
            </p>

            {currentPickup.status === 'COMPLETED' || currentPickup.status === 'VERIFIED' ? (
              <button
                onClick={() => onOpenReceipt && onOpenReceipt(currentPickup)}
                className="w-full mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-2 text-xs shadow-md shadow-brand-500/20"
              >
                <QrCode className="h-4 w-4" />
                <span>View Digital Receipt</span>
              </button>
            ) : null}
          </div>

        </div>

      </div>

    </div>
  );
};
