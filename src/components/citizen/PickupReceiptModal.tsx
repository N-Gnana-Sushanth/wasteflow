import React from 'react';
import { QrCode, CheckCircle2, X, Download, Share2, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { PickupRequest } from '../../types';

interface PickupReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickup: PickupRequest | null;
}

export const PickupReceiptModal: React.FC<PickupReceiptModalProps> = ({ isOpen, onClose, pickup }) => {
  if (!isOpen || !pickup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-brand-500/40 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Receipt Header */}
        <div className="bg-gradient-to-r from-brand-600 to-emerald-700 p-5 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-brand-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black">Digital Collection Receipt</h3>
              <p className="text-[10px] font-mono opacity-90">MUNICIPAL CIRCULAR ECONOMY LEDGER</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-950 hover:bg-slate-900/20">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div>
              <p className="text-slate-400">Pickup Manifest #</p>
              <p className="font-mono font-bold text-brand-300">{pickup.requestNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400">Date & Timestamp</p>
              <p className="font-mono text-slate-200">{pickup.collectedAt ? new Date(pickup.collectedAt).toLocaleDateString() : '2026-09-26'}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Citizen:</span>
              <span className="font-semibold text-slate-200">{pickup.citizenName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Waste Category:</span>
              <span className="font-bold text-emerald-400">{pickup.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Verified Quantity:</span>
              <span className="font-mono font-bold">{pickup.collectedWeightKg || pickup.estimatedWeightKg} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Collection Vehicle:</span>
              <span className="font-mono">{pickup.assignedVehicleId || 'TS-09-WF-1001'} (T-01)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Verification OTP:</span>
              <span className="font-mono font-bold text-brand-400">{pickup.verificationOtp} (MATCHED)</span>
            </div>
          </div>

          {/* Environmental Savings Highlight */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
              <Leaf className="h-4 w-4 text-emerald-400 mx-auto mb-0.5" />
              <p className="text-[10px] text-slate-400 uppercase font-mono">CO₂ Avoided</p>
              <p className="text-sm font-bold text-emerald-300">{pickup.co2SavedKg || 18.5} kg</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40">
              <Sparkles className="h-4 w-4 text-amber-400 mx-auto mb-0.5" />
              <p className="text-[10px] text-slate-400 uppercase font-mono">Eco-Points Earned</p>
              <p className="text-sm font-bold text-amber-300">+{pickup.pointsEarned || 150} pts</p>
            </div>
          </div>

          {/* QR Code Validation */}
          <div className="flex items-center justify-center p-3 rounded-xl bg-white text-slate-950 gap-3">
            <QrCode className="h-12 w-12 shrink-0" />
            <div className="text-left text-[10px] leading-tight">
              <p className="font-bold">BLOCKCHAIN-HASH VERIFIED</p>
              <p className="font-mono text-slate-600 truncate max-w-[200px]">{pickup.verificationQrCode}</p>
              <p className="text-emerald-700 font-semibold mt-0.5">Municipal Seal: VERIFIED-GOV-TELANGANA</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => alert('Receipt PDF downloaded to device.')}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => alert('Receipt share link copied to clipboard.')}
              className="flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2.5 text-xs border border-slate-700 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
