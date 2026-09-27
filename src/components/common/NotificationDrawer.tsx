import React from 'react';
import { X, Bell, CheckCheck, AlertCircle, Trash2, Truck, Sparkles, Award } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useAppState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-brand-400" />
              <h2 className="text-lg font-bold text-white">System Feed & Alerts</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <CheckCheck className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                <p className="text-sm">All caught up! No unread notifications.</p>
              </div>
            ) : (
              notifications.map((n) => {
                let Icon = Bell;
                let borderClass = 'border-slate-800';
                let iconBg = 'bg-slate-800 text-slate-300';

                if (n.priority === 'CRITICAL') {
                  Icon = AlertCircle;
                  borderClass = 'border-red-500/40 bg-red-950/20';
                  iconBg = 'bg-red-900/60 text-red-300';
                } else if (n.type === 'bin') {
                  Icon = Trash2;
                  iconBg = 'bg-emerald-950/60 text-emerald-300';
                } else if (n.type === 'pickup' || n.type === 'route') {
                  Icon = Truck;
                  iconBg = 'bg-blue-950/60 text-blue-300';
                } else if (n.type === 'ai') {
                  Icon = Sparkles;
                  iconBg = 'bg-purple-950/60 text-purple-300';
                } else if (n.type === 'rewards') {
                  Icon = Award;
                  iconBg = 'bg-amber-950/60 text-amber-300';
                }

                return (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      n.read ? 'bg-slate-900/60 border-slate-800/80 opacity-70' : `${borderClass} bg-slate-850 shadow-md`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${iconBg} shrink-0 mt-0.5`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-100 truncate">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {n.type}
                          </span>
                          {!n.read && (
                            <span className="flex items-center gap-1 text-[10px] text-brand-400 font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                              Unread
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Channels Status */}
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Push WebSockets:</span>
              <span className="text-emerald-400">ONLINE (24ms)</span>
            </div>
            <div className="flex justify-between">
              <span>SMS Gateway:</span>
              <span className="text-emerald-400">READY (Twilio/Mock)</span>
            </div>
            <div className="flex justify-between">
              <span>Gov Email Relays:</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
