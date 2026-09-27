import React, { useState } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Scale,
  Sparkles,
  AlertCircle,
  Phone,
  Navigation
} from 'lucide-react';
import { RouteStop } from '../../types';
import { useAppState } from '../../context/AppStateContext';
import confetti from 'canvas-confetti';

interface DriverStopDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stop: RouteStop | null;
}

export const DriverStopDetailModal: React.FC<DriverStopDetailModalProps> = ({ isOpen, onClose, stop }) => {
  const { verifyPickupOtp, pickups } = useAppState();

  const [stage, setStage] = useState<'arrived' | 'verify' | 'completed'>('arrived');
  const [actualWeight, setActualWeight] = useState<number>(stop?.estimatedWeightKg || 14);
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successResult, setSuccessResult] = useState<any>(null);

  if (!isOpen || !stop) return null;

  const matchedPickup = pickups.find((p) => p.id === stop.targetId || p.requestNumber.includes(stop.targetId));

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    try {
      const targetPickupId = matchedPickup ? matchedPickup.id : 'req-01';
      const res = await verifyPickupOtp(targetPickupId, enteredOtp);

      if (res.success) {
        setSuccessResult(res);
        setStage('completed');
        stop.status = 'COLLECTED';

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification error occurred.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAutoFillDemoOtp = () => {
    const targetOtp = matchedPickup ? matchedPickup.verificationOtp : '7492';
    setEnteredOtp(targetOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider opacity-90">
              Stop #{stop.order} Action Manifest
            </span>
            <h3 className="text-base font-bold">{stop.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-white hover:bg-slate-900/20">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{stop.address}</span>
            </div>
            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
              <span>Category: <b className="text-emerald-400">{stop.category}</b></span>
              <span>Estimated: <b className="text-white">{stop.estimatedWeightKg} kg</b></span>
            </div>
          </div>

          {stage === 'arrived' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => alert('GPS Guidance launched for this stop.')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 p-2.5 text-xs font-semibold"
                >
                  <Navigation className="h-4 w-4 text-blue-400" />
                  <span>Turn-by-Turn GPS</span>
                </button>

                <a
                  href="tel:+919849012345"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 p-2.5 text-xs font-semibold"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>Call Citizen</span>
                </a>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Scale className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Verified Scale Weight (kg):</span>
                </label>
                <input
                  type="number"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Photo Proof */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-emerald-400" />
                  <span className="text-slate-300">Bag Photo Proof Attached</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">VERIFIED ✓</span>
              </div>

              <button
                onClick={() => setStage('verify')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs shadow-sm transition-all"
              >
                <span>Proceed to OTP / QR Verification</span>
                <ShieldCheck className="h-4 w-4" />
              </button>
            </div>
          ) : stage === 'verify' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <p className="text-xs font-medium text-slate-300">
                  Enter 4-digit citizen OTP verification code:
                </p>
                <div className="my-3">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="7492"
                    className="w-44 mx-auto text-center rounded-xl bg-slate-950 border border-emerald-500 px-3 py-2.5 text-xl font-bold font-mono tracking-widest text-emerald-400 focus:outline-none"
                    autoFocus
                  />
                </div>
                
                <button
                  type="button"
                  onClick={handleAutoFillDemoOtp}
                  className="text-[11px] text-emerald-400 hover:underline font-mono"
                >
                  ⚡ Fill Citizen OTP ({matchedPickup?.verificationOtp || '7492'})
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStage('arrived')}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 text-xs shadow-sm transition-all"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isVerifying ? 'Verifying on Server...' : 'Verify & Complete Stop'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3 animate-fade-in">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Stop Collection Completed & Logged</h4>
              <p className="text-xs text-slate-300">
                Digital collection receipt generated on backend. Citizen awarded eco-points.
              </p>
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs"
              >
                Proceed to Next Stop
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
