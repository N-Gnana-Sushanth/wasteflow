import React from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  UserCheck,
  Cpu,
  Truck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';

export interface ShowcaseStepInfo {
  step: number;
  title: string;
  roleTarget: 'citizen' | 'admin' | 'driver' | 'facility';
  targetTab?: string;
  shortDesc: string;
  actionHint: string;
}

export const SHOWCASE_STEPS: ShowcaseStepInfo[] = [
  {
    step: 1,
    title: '1. Citizen Uploads Waste Image',
    roleTarget: 'citizen',
    targetTab: 'scanner',
    shortDesc: 'Ananya Sharma takes a photo of obsolete electronics or packaging materials.',
    actionHint: 'Observe the neural scan interface ready to ingest image inputs.'
  },
  {
    step: 2,
    title: '2. AI Identifies Waste & Rules',
    roleTarget: 'citizen',
    targetTab: 'scanner',
    shortDesc: 'AI Neural Classifier detects E-Waste (97.4% confidence), explains why, and gives bin rules.',
    actionHint: 'Notice category recommendation, fire hazard avoidance, and recycling explanation.'
  },
  {
    step: 3,
    title: '3. Citizen Requests Doorstep Pickup',
    roleTarget: 'citizen',
    targetTab: 'pickups',
    shortDesc: 'Citizen books slot (10:00 AM) and receives tamper-proof verification OTP #7492.',
    actionHint: 'Request REQ-2026-8801 is created in the municipal ingestion queue.'
  },
  {
    step: 4,
    title: '4. Admin Command Center Ingestion',
    roleTarget: 'admin',
    targetTab: 'dashboard',
    shortDesc: 'Municipal AI Command Center receives request and plots citizen coordinate on GIS map.',
    actionHint: 'Command Center shows pending pickup badge and active fleet radar.'
  },
  {
    step: 5,
    title: '5. Smart Bin Reaches Critical Fill',
    roleTarget: 'admin',
    targetTab: 'bins',
    shortDesc: 'IoT Ultrasonic Sensor on Bin B-101 at Cyber Towers triggers emergency overflow alert.',
    actionHint: 'Sensor pings 96% fill, odor index, and 14-minute overflow countdown.'
  },
  {
    step: 6,
    title: '6. AI Priority Engine Ranks B-101',
    roleTarget: 'admin',
    targetTab: 'dashboard',
    shortDesc: 'AI Priority Engine assigns 98/100 score due to high foot-traffic lunchtime surge.',
    actionHint: 'Item moves to #1 Critical slot with explainability reason.'
  },
  {
    step: 7,
    title: '7. Admin Clicks "OPTIMIZE CITY COLLECTION"',
    roleTarget: 'admin',
    targetTab: 'routes',
    shortDesc: 'Master optimizer reconciles 52 bins, 30 pickups, 10 trucks, traffic, and capacities.',
    actionHint: 'Engine computes multi-stop TSP path and cuts 27.5% of redundant travel distance.'
  },
  {
    step: 8,
    title: '8. Dynamic Routes Dispatched to Fleet',
    roleTarget: 'admin',
    targetTab: 'routes',
    shortDesc: 'Optimized manifest sent to Compactor T-01 with stops ordered by urgency & proximity.',
    actionHint: 'T-01 receives sequential stop list: Bin 101 -> Doorstep Pickup -> MRF Facility.'
  },
  {
    step: 9,
    title: '9. Truck T-01 Mechanical Breakdown',
    roleTarget: 'admin',
    targetTab: 'whatif',
    shortDesc: 'Unexpected breakdown simulated on primary hauler T-01 in peak traffic.',
    actionHint: 'System flags vehicle outage and triggers What-If Resiliency Sandbox.'
  },
  {
    step: 10,
    title: '10. What-If Engine Auto-Reroutes',
    roleTarget: 'admin',
    targetTab: 'whatif',
    shortDesc: 'Autonomous recovery dynamically splits stops between backup T-05 and T-02.',
    actionHint: 'Pickups re-sequenced preserving 100% SLA with minimal cost delta.'
  },
  {
    step: 11,
    title: '11. Driver Arrives at Doorstep',
    roleTarget: 'driver',
    targetTab: 'driver_route',
    shortDesc: 'Driver Ramesh navigates via mobile app to Citizen Ananya’s doorstep address.',
    actionHint: 'Driver clicks "Perform Action" and requests OTP confirmation.'
  },
  {
    step: 12,
    title: '12. QR / OTP Collection Verified',
    roleTarget: 'driver',
    targetTab: 'driver_route',
    shortDesc: 'Driver inputs OTP #7492. Digital receipt generated; citizen gets +140 eco-points.',
    actionHint: 'Collection logged, duplicate prevention locked, and CO2 savings recorded.'
  },
  {
    step: 13,
    title: '13. Waste Reaches GreenTech MRF Hub',
    roleTarget: 'facility',
    targetTab: 'facility_inflow',
    shortDesc: 'Truck arrives at Material Recovery weighbridge. 4.6 tons ingested and sorted.',
    actionHint: 'Automated weighbridge logs hauler manifest and allocates processing line.'
  },
  {
    step: 14,
    title: '14. Circular Material Recovery',
    roleTarget: 'facility',
    targetTab: 'facility_inflow',
    shortDesc: 'High-purity sorting achieves 96% recovery rate across MRF, Biogas, and E-Waste lines.',
    actionHint: 'Mass balance flow visualizes 11,210 tons diverted from regional landfill.'
  },
  {
    step: 15,
    title: '15. Environmental Dashboard Impact',
    roleTarget: 'citizen',
    targetTab: 'rewards',
    shortDesc: 'City-wide & citizen dashboards reflect +11,210 Tons diverted, 18,450T CO2 saved!',
    actionHint: 'Full circular loop closed with verified municipal impact metrics.'
  }
];

export const HackathonTourBar: React.FC<{ onNavigateTab?: (tab: string) => void }> = ({ onNavigateTab }) => {
  const {
    showcaseActive,
    showcaseStep,
    nextShowcaseStep,
    prevShowcaseStep,
    jumpToShowcaseStep,
    exitShowcaseTour
  } = useAppState();
  const { setRole } = useAuth();

  if (!showcaseActive) return null;

  const current = SHOWCASE_STEPS[showcaseStep - 1] || SHOWCASE_STEPS[0];

  const handleStepJump = (st: number) => {
    const target = SHOWCASE_STEPS[st - 1];
    if (target) {
      setRole(target.roleTarget);
      if (onNavigateTab && target.targetTab) {
        onNavigateTab(target.targetTab);
      }
    }
    jumpToShowcaseStep(st);
  };

  const handleNext = () => {
    const nextSt = showcaseStep + 1;
    if (nextSt <= 15) {
      handleStepJump(nextSt);
    } else {
      exitShowcaseTour();
    }
  };

  const handlePrev = () => {
    const prevSt = showcaseStep - 1;
    if (prevSt >= 1) {
      handleStepJump(prevSt);
    }
  };

  let RoleIcon = UserCheck;
  if (current.roleTarget === 'admin') RoleIcon = Cpu;
  if (current.roleTarget === 'driver') RoleIcon = Truck;
  if (current.roleTarget === 'facility') RoleIcon = Building2;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl animate-fade-in">
      <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <span>Guided Hackathon Showcase</span>
              <span className="rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-800/60">
                Step {showcaseStep} of 15
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] font-medium bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 text-slate-300">
              <RoleIcon className="h-3 w-3 text-emerald-400" />
              <span className="capitalize">{current.roleTarget}</span>
            </div>

            <button
              onClick={exitShowcaseTour}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Exit Tour"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-emerald-400">{current.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{current.shortDesc}</p>
            <p className="text-[11px] text-amber-300 font-mono mt-1 flex items-center gap-1">
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span>{current.actionHint}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 md:col-span-1">
            <button
              onClick={handlePrev}
              disabled={showcaseStep === 1}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-750 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all"
            >
              <span>{showcaseStep === 15 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Mini Step Progress Line */}
        <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-800/80">
          {SHOWCASE_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => handleStepJump(s.step)}
              className={`h-1 flex-1 rounded-full transition-all ${
                s.step === showcaseStep
                  ? 'bg-emerald-400 ring-2 ring-emerald-400/40'
                  : s.step < showcaseStep
                  ? 'bg-emerald-700'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
