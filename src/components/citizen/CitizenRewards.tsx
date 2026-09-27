import React from 'react';
import { Award, Sparkles, Gift, Trophy, Leaf, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const CitizenRewards: React.FC = () => {
  const { currentUser, updateUserPoints } = useAuth();
  const { rewards, badges, claimReward } = useAppState();

  const handleClaim = (rewardId: string, cost: number) => {
    if ((currentUser.points || 0) < cost) {
      alert(`Insufficient Eco-Points! You need ${cost - (currentUser.points || 0)} more points.`);
      return;
    }

    claimReward(rewardId);
    updateUserPoints(-cost);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const leaderboard = [
    { rank: 1, name: 'Ananya Sharma (You)', zone: 'Hitec City', points: currentUser.points || 1240, level: 'Eco Champion' },
    { rank: 2, name: 'Siddharth Varma', zone: 'Gachibowli', points: 1180, level: 'Green Guardian' },
    { rank: 3, name: 'Pooja Hegde', zone: 'Jubilee Hills', points: 1050, level: 'Segregation Pro' },
    { rank: 4, name: 'Dr. Arjun Roy', zone: 'Banjara Hills', points: 940, level: 'Zero Waste Advocate' },
    { rank: 5, name: 'K. S. Narayanan', zone: 'Madhapur', points: 890, level: 'Recycle Star' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card: Eco-Wallet & Rank */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border border-amber-500/30 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                <Trophy className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Citizen Eco-Rewards & Leaderboard</h2>
              <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 text-xs font-mono font-bold">
                Level 4
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Earn Eco-Points for verified household segregation, doorstep pickups, and reporting illegal dump sites. Redeem points for metro vouchers, urban tree planting, or municipal tax credits.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-amber-500/40 p-4 text-right shrink-0 shadow-xl">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Your Eco-Points Wallet</span>
            <div className="text-3xl font-black font-mono text-amber-400 flex items-center justify-end gap-1.5 mt-0.5">
              <Sparkles className="h-6 w-6 text-amber-400 fill-current" />
              <span>{currentUser.points || 1240}</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Top 3% Citizen in Hitec City Zone</p>
          </div>
        </div>
      </div>

      {/* Grid: Badges + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Unlocked Badges */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Achievements & Badges</span>
            <span className="text-xs text-brand-400 font-mono">3 / 4 Unlocked</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  b.progress === 100
                    ? 'border-brand-500/40 bg-brand-950/20 shadow-md'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{b.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-100 truncate">{b.name}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{b.description}</p>
                  </div>
                </div>

                {b.progress === 100 ? (
                  <p className="text-[10px] font-mono text-emerald-400 font-bold mt-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Unlocked on {b.unlockedAt}</span>
                  </p>
                ) : (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Progress</span>
                      <span>{b.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{ width: `${b.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Zone Leaderboard */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Zone Leaderboard</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly Ranking</span>
          </h3>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.name}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                  user.rank === 1
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : 'border-slate-800/80 bg-slate-950/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full font-bold text-xs font-mono ${
                      user.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : user.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : user.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {user.rank}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.zone} • {user.level}</p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-amber-400">
                  {user.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Rewards Catalog */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
          <Gift className="h-5 w-5 text-amber-400" />
          <span>Redeem Eco-Points Catalog</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-all"
            >
              <div>
                <div className="h-28 w-full rounded-lg overflow-hidden bg-slate-900 mb-2">
                  <img src={r.imageUrl} alt={r.name} className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">{r.category}</span>
                <h4 className="text-xs font-bold text-slate-100 mt-0.5">{r.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{r.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {r.pointsCost} Points
                </span>

                <button
                  onClick={() => handleClaim(r.id, r.pointsCost)}
                  disabled={r.claimed}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    r.claimed
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 cursor-default'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                  }`}
                >
                  {r.claimed ? 'Redeemed ✓' : 'Redeem'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
