import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ZONES } from '../../data/mockData';

export const PredictiveDemandView: React.FC = () => {
  const [forecastHorizon, setForecastHorizon] = useState<'today' | 'tomorrow' | '7d' | '30d'>('7d');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');

  // Forecast data for 7-day projection
  const sevenDayTrend = [
    { day: 'Mon', actualTons: 18.2, predictedTons: 18.0, criticalBins: 4 },
    { day: 'Tue', actualTons: 19.4, predictedTons: 19.1, criticalBins: 5 },
    { day: 'Wed', actualTons: 20.1, predictedTons: 20.5, criticalBins: 6 },
    { day: 'Thu', actualTons: 21.8, predictedTons: 21.6, criticalBins: 7 },
    { day: 'Fri', actualTons: 25.4, predictedTons: 25.8, criticalBins: 11 },
    { day: 'Sat (Surge)', predictedTons: 31.2, criticalBins: 16 },
    { day: 'Sun (Surge)', predictedTons: 29.5, criticalBins: 14 }
  ];

  // 30-day projection
  const thirtyDayTrend = Array.from({ length: 30 }, (_, i) => {
    const isWeekend = i % 7 === 5 || i % 7 === 6;
    const base = isWeekend ? 28 : 19;
    const noise = Math.sin(i * 0.8) * 3;
    return {
      day: `Day ${i + 1}`,
      predictedTons: Number((base + noise).toFixed(1)),
      utilizationPct: Math.min(96, Math.round(65 + noise * 4 + (isWeekend ? 18 : 0)))
    };
  });

  // Zone demand breakdown
  const zoneDemandData = [
    { zone: 'Hitec City', currentTons: 28.4, predictedTons: 34.2, growth: '+20.4%' },
    { zone: 'Gachibowli', currentTons: 24.1, predictedTons: 27.5, growth: '+14.1%' },
    { zone: 'Madhapur', currentTons: 22.8, predictedTons: 29.0, growth: '+27.1%' },
    { zone: 'Jubilee Hills', currentTons: 19.5, predictedTons: 22.0, growth: '+12.8%' },
    { zone: 'Banjara Hills', currentTons: 18.0, predictedTons: 19.8, growth: '+10.0%' },
    { zone: 'Kukatpally', currentTons: 21.2, predictedTons: 24.5, growth: '+15.5%' }
  ];

  // Category composition
  const categoryData = [
    { name: 'Wet / Organic', value: 42, color: '#22c55e' },
    { name: 'Dry Recyclable', value: 24, color: '#3b82f6' },
    { name: 'Plastics', value: 16, color: '#06b6d4' },
    { name: 'Paper & Boxes', value: 10, color: '#eab308' },
    { name: 'E-Waste', value: 5, color: '#a855f7' },
    { name: 'Hazardous', value: 3, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-purple-950/80 border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500 text-slate-950 font-bold">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-white">AI Demand & Generation Forecasting</h2>
            <span className="rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 text-xs font-mono font-bold">
              Prophet + LSTM Neural Model
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Predictive demand curves based on historical weight manifests, weather telemetry, calendar festival events, and IoT fill acceleration.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex rounded-xl bg-slate-950 border border-slate-700 p-1">
          {(['today', 'tomorrow', '7d', '30d'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setForecastHorizon(h)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                forecastHorizon === h ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {h === '7d' ? '7 Days' : h === '30d' ? '30 Days' : h}
            </button>
          ))}
        </div>
      </div>

      {/* Main Predictive Volume Trend Chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <span>Projected Waste Generation Volume (Metric Tons / Day)</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">Actual Ingestion vs Neural Predicted Trajectory</p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="ALL">All Zones Aggregated</option>
              {ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastHorizon === '30d' ? thirtyDayTrend : sevenDayTrend}>
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" textAnchor="end" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" T" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="actualTons" name="Actual Baseline (Tons)" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#actualGrad)" />
              <Area type="monotone" dataKey="predictedTons" name="AI Predicted Demand (Tons)" stroke="#8b5cf6" strokeWidth={3} strokeDasharray={forecastHorizon === '30d' ? '4 4' : undefined} fillOpacity={1} fill="url(#predictedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Zone Demand Heatmap Breakdown + Waste Composition Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Zone Demand Growth */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Zone-wise Peak Surge Forecast</span>
            <span className="text-xs text-purple-400 font-mono">Next 72 Hours</span>
          </h3>

          <div className="space-y-3">
            {zoneDemandData.map((item) => (
              <div
                key={item.zone}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{item.zone}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Baseline: {item.currentTons} T → Predicted: <b>{item.predictedTons} T</b>
                  </p>
                </div>

                <div className="text-right">
                  <span className="flex items-center gap-0.5 text-xs font-bold font-mono text-amber-400">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {item.growth}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">Surge Alert</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Waste Category Distribution */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-brand-400" />
            <span>Projected Waste Fraction (%)</span>
          </h3>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="truncate">{cat.name}: <b>{cat.value}%</b></span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
