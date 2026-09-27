import React, { useState, useMemo } from 'react';
import { Search, X, Trash2, Truck, AlertTriangle, Building, FileText, ArrowRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity?: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectEntity }) => {
  const [query, setQuery] = useState('');
  const { bins, vehicles, pickups, incidents, facilities } = useAppState();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matches: { id: string; type: 'bin' | 'vehicle' | 'pickup' | 'incident' | 'facility'; title: string; subtitle: string; tag: string }[] = [];

    // Search Bins
    bins.forEach((b) => {
      if (b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q) || b.location.zone.toLowerCase().includes(q)) {
        matches.push({
          id: b.id,
          type: 'bin',
          title: `${b.code} — ${b.name}`,
          subtitle: `${b.location.zone} • Fill: ${b.currentFillLevel}% • ${b.category}`,
          tag: b.status
        });
      }
    });

    // Search Vehicles
    vehicles.forEach((v) => {
      if (v.plateNumber.toLowerCase().includes(q) || v.name.toLowerCase().includes(q) || v.driverName.toLowerCase().includes(q)) {
        matches.push({
          id: v.id,
          type: 'vehicle',
          title: `${v.plateNumber} — ${v.name}`,
          subtitle: `Driver: ${v.driverName} • Load: ${v.currentLoadKg}kg • ${v.status}`,
          tag: v.fuelType
        });
      }
    });

    // Search Pickups
    pickups.forEach((p) => {
      if (p.requestNumber.toLowerCase().includes(q) || p.citizenName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        matches.push({
          id: p.id,
          type: 'pickup',
          title: `${p.requestNumber} — ${p.citizenName}`,
          subtitle: `${p.category} (${p.estimatedWeightKg}kg) • ${p.location.address}`,
          tag: p.status
        });
      }
    });

    // Search Incidents
    incidents.forEach((inc) => {
      if (inc.incidentNumber.toLowerCase().includes(q) || inc.description.toLowerCase().includes(q) || inc.type.toLowerCase().includes(q)) {
        matches.push({
          id: inc.id,
          type: 'incident',
          title: `${inc.incidentNumber} — ${inc.type}`,
          subtitle: `${inc.location.zone} • Severity: ${inc.severity}`,
          tag: inc.status
        });
      }
    });

    // Search Facilities
    facilities.forEach((f) => {
      if (f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q)) {
        matches.push({
          id: f.id,
          type: 'facility',
          title: f.name,
          subtitle: `${f.type} • Capacity: ${f.totalCapacityTonsDay} T/day`,
          tag: f.operationalStatus
        });
      }
    });

    return matches.slice(0, 12);
  }, [query, bins, vehicles, pickups, incidents, facilities]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-brand-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bin ID, Vehicle Plate, Pickup #, Incident, Citizen..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-1">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 hover:text-white border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 px-4 py-2 border-b border-slate-800/60 bg-slate-950/40 text-[11px] overflow-x-auto">
          <span className="text-slate-500 py-1">Quick Filters:</span>
          {['BIN-101', 'T-01', 'REQ-8801', 'Illegal Dumping', 'E-Waste', 'Hitec City'].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-brand-500/20 hover:text-brand-300 border border-slate-700/60 transition-colors whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-400">
              <Search className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <p className="text-sm font-medium">Type to search across municipal assets & incidents</p>
              <p className="text-xs text-slate-500 mt-1">Smart Bins, Trucks, Pickup manifests, Dump sites, and Recycling facilities</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm">No matching records found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching with a partial code e.g. "101", "Zone", "Req", "T-01"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => {
                let Icon = FileText;
                let iconColor = 'text-blue-400 bg-blue-950/60';
                if (item.type === 'bin') {
                  Icon = Trash2;
                  iconColor = 'text-emerald-400 bg-emerald-950/60';
                } else if (item.type === 'vehicle') {
                  Icon = Truck;
                  iconColor = 'text-amber-400 bg-amber-950/60';
                } else if (item.type === 'incident') {
                  Icon = AlertTriangle;
                  iconColor = 'text-red-400 bg-red-950/60';
                } else if (item.type === 'facility') {
                  Icon = Building;
                  iconColor = 'text-purple-400 bg-purple-950/60';
                }

                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      if (onSelectEntity) onSelectEntity(item.type, item.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-brand-300 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700">
                        {item.tag}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
