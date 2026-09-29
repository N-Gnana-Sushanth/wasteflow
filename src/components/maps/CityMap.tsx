import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAppState } from '../../context/AppStateContext';
import { CITY_CENTER, ZONES } from '../../data/mockData';
import { SmartBin, Vehicle, PickupRequest, Incident, Facility } from '../../types';
import { Trash2, Truck, AlertTriangle, Building, Navigation, Layers, Filter } from 'lucide-react';

// Create custom SVG markers for Leaflet
function createSvgIcon(color: string, label: string, bgDark = false) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${bgDark ? '#0f172a' : color};
        border: 2px solid ${color};
        color: ${bgDark ? color : '#0f172a'};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        transform: translate(-50%, -50%);
      ">
        ${label}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

function createTruckIcon(heading: number, color: string, name: string) {
  return L.divIcon({
    className: 'custom-truck-marker',
    html: `
      <div style="
        background: #0f172a;
        border: 2px solid ${color};
        color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        transform: translate(-50%, -50%) rotate(${heading}deg);
      ">
        🚚
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
}

interface CityMapProps {
  selectedZone?: string;
  onSelectBin?: (bin: SmartBin) => void;
  onSelectVehicle?: (veh: Vehicle) => void;
  heightClass?: string;
}

export const CityMap: React.FC<CityMapProps> = ({
  selectedZone: propZone,
  onSelectBin,
  onSelectVehicle,
  heightClass = 'h-[540px]'
}) => {
  const { bins, vehicles, pickups, incidents, facilities, activeRoutes } = useAppState();

  const [selectedZone, setSelectedZone] = useState<string>(propZone || 'ALL');
  const [showBins, setShowBins] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showPickups, setShowPickups] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  // Filtered elements
  const filteredBins = bins.filter((b) => selectedZone === 'ALL' || b.location.zone === selectedZone);
  const filteredVehicles = vehicles.filter((v) => selectedZone === 'ALL' || v.assignedZone === selectedZone);
  const filteredPickups = pickups.filter((p) => selectedZone === 'ALL' || p.location.zone === selectedZone);
  const filteredIncidents = incidents.filter((i) => selectedZone === 'ALL' || i.location.zone === selectedZone);

  const getBinColor = (bin: SmartBin) => {
    if (bin.status === 'CRITICAL') return '#ef4444';
    if (bin.status === 'HIGH') return '#f97316';
    if (bin.status === 'FILLING') return '#eab308';
    if (bin.status === 'OFFLINE') return '#64748b';
    return '#22c55e';
  };

  const routeColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
      
      {/* Floating Map Controls & Filters */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2 rounded-xl bg-slate-950/90 p-2 backdrop-blur-md border border-slate-800 text-xs shadow-xl">
        <div className="flex items-center gap-1.5 text-slate-300 mr-2">
          <Filter className="h-3.5 w-3.5 text-brand-400" />
          <span className="font-semibold text-[11px] uppercase">Zone:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="rounded-lg bg-slate-800 px-2 py-1 text-slate-200 border border-slate-700 text-xs focus:outline-none"
          >
            <option value="ALL">All Hyderabad Zones (Metro Area)</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        {/* Toggle Layer Checkboxes */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
          <button
            onClick={() => setShowBins(!showBins)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showBins ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'bg-slate-800 text-slate-500'
            }`}
          >
            🗑️ Bins ({filteredBins.length})
          </button>

          <button
            onClick={() => setShowVehicles(!showVehicles)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showVehicles ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'bg-slate-800 text-slate-500'
            }`}
          >
            🚚 Trucks ({filteredVehicles.length})
          </button>

          <button
            onClick={() => setShowPickups(!showPickups)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showPickups ? 'bg-blue-950/80 text-blue-300 border border-blue-700/60' : 'bg-slate-800 text-slate-500'
            }`}
          >
            📦 Pickups ({filteredPickups.length})
          </button>

          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showIncidents ? 'bg-red-950/80 text-red-300 border border-red-700/60' : 'bg-slate-800 text-slate-500'
            }`}
          >
            ⚠️ Hotspots ({filteredIncidents.length})
          </button>

          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
              showRoutes ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'bg-slate-800 text-slate-500'
            }`}
          >
            ⚡ AI Routes
          </button>
        </div>
      </div>

      {/* Leaflet Map Container */}
      <div className={`w-full ${heightClass}`}>
        <MapContainer
          center={[CITY_CENTER.lat, CITY_CENTER.lng]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          {/* Free Standard OpenStreetMap vector tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render Active Optimized Routes Polylines */}
          {showRoutes &&
            activeRoutes.map((route, rIdx) => {
              const positions: [number, number][] = route.stops.map((s) => [s.lat, s.lng]);
              if (positions.length < 2) return null;
              const color = routeColors[rIdx % routeColors.length];

              return (
                <Polyline
                  key={route.id}
                  positions={positions}
                  pathOptions={{
                    color,
                    weight: 4,
                    opacity: 0.85,
                    dashArray: route.status === 'REROUTED' ? '6, 8' : undefined
                  }}
                />
              );
            })}

          {/* Render Smart Bins */}
          {showBins &&
            filteredBins.map((bin) => {
              const color = getBinColor(bin);
              return (
                <Marker
                  key={bin.id}
                  position={[bin.location.lat, bin.location.lng]}
                  icon={createSvgIcon(color, `${bin.currentFillLevel}%`, true)}
                  eventHandlers={{
                    click: () => onSelectBin && onSelectBin(bin)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 min-w-[200px] text-slate-900 font-sans">
                      <div className="flex items-center justify-between pb-1 border-b">
                        <span className="font-bold text-xs">{bin.code}</span>
                        <span
                          className="px-1.5 py-0.5 text-[10px] rounded font-semibold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {bin.status}
                        </span>
                      </div>
                      <p className="font-medium text-xs mt-1">{bin.name}</p>
                      <p className="text-[11px] text-slate-600">{bin.location.address}</p>
                      
                      <div className="mt-2 space-y-1 text-[11px] bg-slate-100 p-2 rounded">
                        <div className="flex justify-between">
                          <span>Fill Level:</span>
                          <span className="font-bold">{bin.currentFillLevel}% ({bin.fillWeightKg}kg)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-semibold">{bin.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Overflow:</span>
                          <span className="font-bold text-red-600">in {bin.predictedOverflowMinutes}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Battery / Temp:</span>
                          <span>{bin.batteryLevel}% • {bin.temperatureCelsius}°C</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* Render Collection Vehicles */}
          {showVehicles &&
            filteredVehicles.map((veh) => {
              const vehColor = veh.status === 'MAINTENANCE' ? '#ef4444' : '#f59e0b';
              return (
                <Marker
                  key={veh.id}
                  position={[veh.currentLocation.lat, veh.currentLocation.lng]}
                  icon={createTruckIcon(veh.heading, vehColor, veh.name)}
                  eventHandlers={{
                    click: () => onSelectVehicle && onSelectVehicle(veh)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 min-w-[220px] text-slate-900">
                      <div className="flex items-center justify-between pb-1 border-b">
                        <span className="font-bold text-xs">{veh.plateNumber}</span>
                        <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded font-bold">
                          {veh.status}
                        </span>
                      </div>
                      <p className="font-medium text-xs mt-1">{veh.name}</p>
                      <p className="text-[11px] text-slate-600">Driver: <b>{veh.driverName}</b></p>
                      
                      <div className="mt-2 space-y-1 text-[11px] bg-amber-50 p-2 rounded border border-amber-200">
                        <div className="flex justify-between">
                          <span>Load Weight:</span>
                          <span className="font-bold">{veh.currentLoadKg} / {veh.capacityKg} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel/Battery:</span>
                          <span>{veh.fuelBatteryLevel}% ({veh.fuelType})</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assigned Zone:</span>
                          <span>{veh.assignedZone}</span>
                        </div>
                        {veh.maintenanceAlert && (
                          <p className="text-red-600 font-semibold text-[10px] mt-1 pt-1 border-t">
                            ⚠️ {veh.maintenanceAlert}
                          </p>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* Render Pickup Requests */}
          {showPickups &&
            filteredPickups.map((req) => (
              <Marker
                key={req.id}
                position={[req.location.lat, req.location.lng]}
                icon={createSvgIcon('#3b82f6', '📦')}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[200px] text-slate-900">
                    <div className="flex items-center justify-between pb-1 border-b">
                      <span className="font-bold text-xs">{req.requestNumber}</span>
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-600 text-white rounded font-bold">
                        {req.status}
                      </span>
                    </div>
                    <p className="font-medium text-xs mt-1">{req.citizenName}</p>
                    <p className="text-[11px] text-slate-600">{req.location.address}</p>
                    <div className="mt-2 space-y-1 text-[11px] bg-blue-50 p-2 rounded">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-bold">{req.category} (~{req.estimatedWeightKg}kg)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preferred Slot:</span>
                        <span>{req.preferredTimeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verification OTP:</span>
                        <span className="font-mono font-bold text-blue-700">{req.verificationOtp}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Render Illegal Dumping Incidents */}
          {showIncidents &&
            filteredIncidents.map((inc) => (
              <React.Fragment key={inc.id}>
                <Circle
                  center={[inc.location.lat, inc.location.lng]}
                  radius={180}
                  pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.25 }}
                />
                <Marker
                  position={[inc.location.lat, inc.location.lng]}
                  icon={createSvgIcon('#ef4444', '🔥')}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 min-w-[210px] text-slate-900">
                      <div className="flex items-center justify-between pb-1 border-b">
                        <span className="font-bold text-xs text-red-600">🚨 {inc.type}</span>
                        <span className="px-1.5 py-0.5 text-[10px] bg-red-600 text-white rounded font-bold">
                          {inc.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">{inc.description}</p>
                      <p className="text-[11px] text-slate-500">{inc.location.address}</p>
                      {inc.repeatHotspot && (
                        <p className="text-[10px] text-red-600 font-bold mt-1">
                          ⚠️ Repeat Offender Hotspot (Incident #{inc.repeatIncidentCount})
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}

          {/* Render Recycling & Recovery Facilities */}
          {showFacilities &&
            facilities.map((fac) => (
              <Marker
                key={fac.id}
                position={[fac.location.lat, fac.location.lng]}
                icon={createSvgIcon('#8b5cf6', '🏭')}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[210px] text-slate-900">
                    <div className="flex items-center justify-between pb-1 border-b">
                      <span className="font-bold text-xs text-purple-700">{fac.name}</span>
                      <span className="px-1.5 py-0.5 text-[10px] bg-purple-600 text-white rounded font-bold">
                        {fac.operationalStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-semibold">{fac.type}</p>
                    <p className="text-[11px] text-slate-500">{fac.location.address}</p>
                    <div className="mt-2 text-[11px] bg-purple-50 p-2 rounded space-y-1">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-bold">{fac.currentProcessingTonsDay} / {fac.totalCapacityTonsDay} T/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accepts:</span>
                        <span>{fac.acceptedCategories.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

    </div>
  );
};
