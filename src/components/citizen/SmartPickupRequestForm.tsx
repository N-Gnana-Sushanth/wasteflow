import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Scale,
  FileText,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { WasteCategory, PickupRequest } from '../../types';
import { ZONES } from '../../data/mockData';

interface SmartPickupRequestFormProps {
  initialCategory?: WasteCategory;
  initialItemName?: string;
  onSuccessCreated?: (pickup: PickupRequest) => void;
}

export const SmartPickupRequestForm: React.FC<SmartPickupRequestFormProps> = ({
  initialCategory = 'Dry',
  initialItemName = '',
  onSuccessCreated
}) => {
  const { currentUser } = useAuth();
  const { addPickupRequest } = useAppState();

  const [category, setCategory] = useState<WasteCategory>(initialCategory);
  const [estimatedWeight, setEstimatedWeight] = useState<number>(12);
  const [itemCount, setItemCount] = useState<number>(3);
  const [address, setAddress] = useState<string>(currentUser.address || 'Flat 402, Green Meadows, Cyber Hills, Hitec City');
  const [zone, setZone] = useState<string>(currentUser.zone || ZONES[0]);
  const [preferredDate, setPreferredDate] = useState<string>('2026-09-28');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [notes, setNotes] = useState<string>(initialItemName ? `Item for pickup: ${initialItemName}` : 'Segregated household recyclables ready in sealed container.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdPickup, setCreatedPickup] = useState<PickupRequest | null>(null);

  const categories: { name: WasteCategory; icon: string; desc: string }[] = [
    { name: 'E-Waste', icon: '⚡', desc: 'Laptops, chargers, batteries' },
    { name: 'Plastic', icon: '🧴', desc: 'Bottles, HDPE tubs, polymers' },
    { name: 'Paper', icon: '📦', desc: 'Cardboard, books, newspaper' },
    { name: 'Dry', icon: '♻️', desc: 'Mixed clean dry recyclables' },
    { name: 'Wet', icon: '🥗', desc: 'Organic kitchen food scraps' },
    { name: 'Glass', icon: '🫙', desc: 'Bottles, clean glass jars' },
    { name: 'Metal', icon: '🥫', desc: 'Beverage cans, tin, wires' },
    { name: 'Hazardous', icon: '☣️', desc: 'Paints, chemicals, solvents' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newReq = await addPickupRequest({
        citizenId: currentUser.id,
        citizenName: currentUser.name,
        citizenPhone: currentUser.phone || '+91 98490 12345',
        category,
        estimatedWeightKg: estimatedWeight,
        itemCount,
        location: {
          lat: 17.4490,
          lng: 78.3830,
          address,
          zone
        },
        preferredDate,
        preferredTimeSlot: timeSlot,
        notes,
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500'
      });

      setCreatedPickup(newReq);
      if (onSuccessCreated) onSuccessCreated(newReq);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Schedule Doorstep Pickup</span>
            <span className="rounded bg-slate-800 text-emerald-400 text-[10px] px-2 py-0.5 border border-slate-700 font-mono">
              SLA Assured
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Book municipal collection with OTP verification and automated route dispatch.
          </p>
        </div>
      </div>

      {createdPickup ? (
        <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4 animate-fade-in text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
              REQUEST CONFIRMED (BACKEND STORED)
            </span>
            <h4 className="text-base font-bold text-white mt-1">
              Pickup Request #{createdPickup.requestNumber}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Scheduled for <b>{createdPickup.preferredDate}</b> ({createdPickup.preferredTimeSlot}).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-xs mx-auto text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Your Handover OTP:</span>
            <div className="text-2xl font-bold font-mono tracking-widest text-emerald-400">
              {createdPickup.verificationOtp}
            </div>
            <p className="text-[10px] text-slate-400">Share with driver upon arrival.</p>
          </div>

          <button
            onClick={() => setCreatedPickup(null)}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2 text-xs transition-colors"
          >
            Schedule Another Pickup
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Waste Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => setCategory(c.name)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === c.name
                      ? 'border-emerald-500 bg-slate-850 shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base block">{c.icon}</span>
                  <span className="text-xs font-semibold text-white block mt-1">{c.name}</span>
                  <span className="text-[10px] text-slate-400 truncate block mt-0.5">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Item Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Scale className="h-3.5 w-3.5 text-slate-400" />
                <span>Estimated Total Weight (kg):</span>
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>Number of Bags/Boxes:</span>
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Date & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Preferred Date:</span>
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Preferred Time Slot:</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option>08:00 AM - 10:00 AM</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>02:00 PM - 04:00 PM</option>
                <option>04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          {/* Address & Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Pickup Address:</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Municipal Zone:
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Instructions / Notes for Driver:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 text-xs shadow-sm transition-colors"
          >
            <Truck className="h-4 w-4" />
            <span>{isSubmitting ? 'Scheduling via Server...' : 'Submit Pickup Request'}</span>
          </button>

        </form>
      )}

    </div>
  );
};
