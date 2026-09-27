import React from 'react';
import {
  TrendingUp,
  Download,
  DollarSign,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Building,
  Award
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useAppState } from '../../context/AppStateContext';

export const MunicipalAnalyticsView: React.FC = () => {
  const { envStats } = useAppState();

  const monthlyCostTrends = [
    { month: 'Apr', costWithoutAI: 48200, costWithWasteFlow: 34100, savings: 14100 },
    { month: 'May', costWithoutAI: 51000, costWithWasteFlow: 35800, savings: 15200 },
    { month: 'Jun', costWithoutAI: 49500, costWithWasteFlow: 33900, savings: 15600 },
    { month: 'Jul', costWithoutAI: 53200, costWithWasteFlow: 36200, savings: 17000 },
    { month: 'Aug', costWithoutAI: 54800, costWithWasteFlow: 37100, savings: 17700 },
    { month: 'Sep', costWithoutAI: 52000, costWithWasteFlow: 35000, savings: 17000 }
  ];

  const zonePerformance = [
    { zone: 'Hitec City - Zone 1', efficiency: 98.4, slaBreaches: 0, costPerPickup: '$4.20', score: 'A+' },
    { zone: 'Gachibowli - Zone 2', efficiency: 96.1, slaBreaches: 1, costPerPickup: '$4.45', score: 'A' },
    { zone: 'Madhapur - Zone 3', efficiency: 97.2, slaBreaches: 0, costPerPickup: '$4.30', score: 'A+' },
    { zone: 'Jubilee Hills - Zone 4', efficiency: 94.8, slaBreaches: 2, costPerPickup: '$4.80', score: 'A-' },
    { zone: 'Banjara Hills - Zone 5', efficiency: 95.5, slaBreaches: 1, costPerPickup: '$4.60', score: 'A' },
    { zone: 'Kukatpally - Zone 6', efficiency: 92.0, slaBreaches: 3, costPerPickup: '$5.10', score: 'B+' }
  ];

  const contractorRankings = [
    { rank: 1, name: 'EcoTransit Fleet Solutions Ltd.', fleetSize: 18, rating: 4.96, onTimeRate: '99.1%' },
    { rank: 2, name: 'Hyderabad CleanLogistics LLP', fleetSize: 14, rating: 4.88, onTimeRate: '97.5%' },
    { rank: 3, name: 'GreenCircle Sanitation Services', fleetSize: 10, rating: 4.79, onTimeRate: '96.2%' }
  ];

  const handleExportCSV = () => {
    alert('Exporting Municipal Circular Operations & SLA Dataset (CSV format)...');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/80 border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-slate-950 font-bold">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Municipal Operations & SLA Performance Intelligence</h2>
            <span className="rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              Q3 2026 Audit Certified
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Fleet cost accounting, SLA compliance benchmarks, fuel burn reductions, contractor performance scorecards, and verifiable environmental diversion ledgers.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 text-xs font-semibold shadow-md transition-colors"
        >
          <Download className="h-4 w-4 text-brand-400" />
          <span>Export Audit Report (CSV)</span>
        </button>
      </div>

      {/* 4 Financial & Operational Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase">Cost Per Doorstep Pickup</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">$4.38</p>
          <span className="text-[10px] text-emerald-400 font-semibold">-31.4% vs Unoptimized Municipal Baseline</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase">Fleet Fuel Conserved</span>
            <Fuel className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-blue-400 font-mono">114,500 L</p>
          <span className="text-[10px] text-blue-300 font-semibold">$143,125 Fuel Spend Saved</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase">Average SLA Response Time</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400 font-mono">26.4 Mins</p>
          <span className="text-[10px] text-amber-300 font-semibold">98.4% Pickups Within Time Window</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase">Avoided Redundant Trips</span>
            <Truck className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-purple-400 font-mono">3,890 Trips</p>
          <span className="text-[10px] text-purple-300 font-semibold">Sensor-triggered Dynamic Dispatch</span>
        </div>
      </div>

      {/* Monthly Cost Comparison Chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Municipal Waste Hauling Cost ($ USD)</h3>
            <p className="text-xs text-slate-400 font-mono">Historical Fixed Routes vs AI-Optimized Dynamic WasteFlow</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
            -$17,000 / Month Net Savings
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCostTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" $" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend />
              <Bar dataKey="costWithoutAI" name="Legacy Static Route Cost ($)" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="costWithWasteFlow" name="WasteFlow AI Optimized Cost ($)" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Zone Performance Table + Contractor Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Zone Performance Table */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
            Zone SLA Compliance Scorecard
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3 font-mono">Zone Name</th>
                  <th className="py-2.5 px-3">Collection Efficiency</th>
                  <th className="py-2.5 px-3">SLA Breaches</th>
                  <th className="py-2.5 px-3">Cost / Pickup</th>
                  <th className="py-2.5 px-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {zonePerformance.map((z) => (
                  <tr key={z.zone} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold">{z.zone}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-mono font-bold">{z.efficiency}%</td>
                    <td className="py-2.5 px-3 font-mono">{z.slaBreaches} Breaches</td>
                    <td className="py-2.5 px-3 font-mono">{z.costPerPickup}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                        {z.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Contractor Ranking */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <span>Authorized Fleet Contractor Ranking</span>
          </h3>

          <div className="space-y-3">
            {contractorRankings.map((c) => (
              <div
                key={c.name}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">#{c.rank} {c.name}</h4>
                  <span className="text-xs font-mono font-bold text-amber-400">★ {c.rating}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Fleet Size: <b>{c.fleetSize} Haulers</b></span>
                  <span>On-Time SLA: <b className="text-emerald-400">{c.onTimeRate}</b></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
