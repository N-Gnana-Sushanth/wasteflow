import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AccessDeniedProps {
  attemptedPath: string;
  onNavigateToAuthorized: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  attemptedPath,
  onNavigateToAuthorized
}) => {
  const { currentUser, activeRole, logout } = useAuth();

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Municipal Administrator';
      case 'driver':
        return 'Collection Fleet Driver';
      case 'facility':
        return 'Material Recovery Facility Operator';
      default:
        return 'Citizen Resident';
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-slate-900/95 p-8 text-center shadow-2xl backdrop-blur-md">
        
        {/* Security Shield Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 mb-6 shadow-lg shadow-red-950/50">
          <ShieldAlert className="h-8 w-8" />
        </div>

        {/* Title & Status */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-300 font-mono text-[11px] font-bold mb-3">
          <Lock className="h-3 w-3" />
          <span>HTTP 403: ACCESS FORBIDDEN</span>
        </div>

        <h1 className="text-2xl font-bold text-white tracking-tight">
          Restricted Municipal Area
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Your authenticated account (<span className="text-white font-semibold">{currentUser?.name || 'User'}</span>, role:{' '}
          <span className="text-emerald-400 font-mono font-semibold">{getRoleTitle(activeRole)}</span>) is not authorized to access <code className="text-red-300 bg-red-950/60 px-1.5 py-0.5 rounded font-mono text-xs">{attemptedPath}</code>.
        </p>

        <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
          <button
            onClick={onNavigateToAuthorized}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs shadow-lg shadow-emerald-950 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Your {getRoleTitle(activeRole)} Portal</span>
          </button>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 hover:bg-slate-750 text-slate-300 hover:text-white font-medium py-2 text-xs transition-colors"
          >
            <span>Sign Out / Switch Account</span>
          </button>
        </div>

      </div>
    </div>
  );
};
