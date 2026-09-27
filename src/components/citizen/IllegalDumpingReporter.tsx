import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, ShieldCheck, CheckCircle2, Flame, ArrowRight, RefreshCw } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { WasteCategory, Incident } from '../../types';
import { ZONES } from '../../data/mockData';

export const IllegalDumpingReporter: React.FC = () => {
  const { currentUser } = useAuth();
  const { addIncidentReport, incidents } = useAppState();

  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600');
  const [category, setCategory] = useState<WasteCategory>('Mixed');
  const [address, setAddress] = useState<string>('Rear service road near Hitec City Flyover');
  const [zone, setZone] = useState<string>(ZONES[0]);
  const [description, setDescription] = useState<string>('Large unsegregated commercial polythene bags and discarded broken furniture dumped along the pavement.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inc = await addIncidentReport({
        type: 'Illegal Dumping',
        reportedBy: `${currentUser.name} (Citizen)`,
        reporterType: 'CITIZEN',
        category,
        location: {
          lat: 17.4385,
          lng: 78.3710,
          address,
          zone
        },
        description,
        imageUrl,
        severity: 'HIGH'
      });
      setCreatedIncident(inc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const citizenIncidents = incidents.filter((i) => i.reporterType === 'CITIZEN');

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-orange-950/80 border border-red-500/30 p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/40">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Illegal Dumping Intelligence Hub</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Snap a photo of roadside waste piles or black spots. AI verifies volume and immediately dispatches a Rapid Clean Squad while rewarding you +100 Eco-Points.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 mb-4 flex items-center justify-between">
            <span>Report Roadside Black Spot</span>
            <span className="text-[10px] text-amber-400 font-mono">+100 Eco-Points Reward</span>
          </h3>

          {createdIncident ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Incident Dispatched to Municipal Patrol!</h4>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Ticket #{createdIncident.incidentNumber} • AI Confidence 94.8%
                </p>
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Rapid Clean Squad #2 (Vehicle T-09) has been mobilized. You will receive an SMS update once the site is cleared.
              </p>
              <button
                onClick={() => setCreatedIncident(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Photo Preview & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5 text-red-400" />
                  <span>Site Photo:</span>
                </label>
                <div className="h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                  <img src={imageUrl} alt="Dumping site" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <label className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 text-xs font-medium cursor-pointer">
                      <Camera className="h-3.5 w-3.5 text-brand-400" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setImageUrl(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Location & Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-400" />
                    <span>GPS Landmark / Street:</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Zone:</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                  >
                    {ZONES.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Incident Notes / Waste Type:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-95 text-white font-bold py-2.5 text-xs shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Image & Dispatching Patrol...</span>
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4" />
                    <span>Submit Report & Mobilize Clean Squad</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Resolution Status Tracking */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
            Recent Reports & Resolution Pipeline
          </h3>

          <div className="space-y-3">
            {incidents.slice(0, 4).map((inc) => {
              const statusColors: Record<string, string> = {
                REPORTED: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                UNDER_REVIEW: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                ASSIGNED: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                CLEANING: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
                RESOLVED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              };

              return (
                <div key={inc.id} className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-200">{inc.incidentNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColors[inc.status] || 'bg-slate-800 text-slate-300'}`}>
                      {inc.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{inc.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>{inc.location.zone}</span>
                    <span className="text-brand-400">{inc.assignedCrew || 'Patrol Assigned'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
