import React, { useState } from 'react';
import { MapPin, Navigation, Building2, Phone, CheckCircle2, Search, Filter } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { WasteCategory } from '../../types';

export const RecyclingFinder: React.FC = () => {
  const { facilities } = useAppState();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Dry', 'Plastic', 'Wet', 'E-Waste', 'Glass', 'Metal', 'Hazardous'];

  const filteredFacilities = facilities.filter((f) => {
    const matchesCat = filterCategory === 'ALL' || f.acceptedCategories.includes(filterCategory as WasteCategory);
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Recycling & Material Recovery Center Finder</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Locate authorized circular facilities, specialized e-waste refineries, bio-methanation parks, and community drop-off depots.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recycling center name or address..."
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="h-3.5 w-3.5 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{fac.type}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{fac.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {fac.operationalStatus}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>{fac.location.address}</span>
              </p>

              {/* Accepted Categories */}
              <div className="mt-3">
                <p className="text-[11px] font-semibold text-slate-300 mb-1.5">Materials Accepted:</p>
                <div className="flex flex-wrap gap-1.5">
                  {fac.acceptedCategories.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-brand-300 border border-slate-800"
                    >
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono">Daily Ingestion:</span>
                  <p className="font-bold text-slate-200">{fac.currentProcessingTonsDay} / {fac.totalCapacityTonsDay} Tons</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono">Efficiency:</span>
                  <p className="font-bold text-emerald-400">{fac.efficiencyScore}% Recovery Rate</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              <a
                href={`tel:${fac.contactPhone}`}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-brand-400" />
                <span>{fac.contactPerson}</span>
              </a>

              <button
                onClick={() => alert(`Opening GPS navigation to ${fac.name}...`)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 text-xs transition-colors"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Navigate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
