import React, { useState } from 'react';
import {
  Trash2,
  Cpu,
  Truck,
  Building2,
  UserCheck,
  Languages,
  Bell,
  Search,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onOpenAssistant
}) => {
  const { currentUser, activeRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const {
    notifications,
    startShowcaseTour,
    showcaseActive,
    resetAllDemoData,
    isSimulating,
    toggleSimulation
  } = useAppState();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { label: 'Municipal Admin', icon: Cpu, badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60' };
      case 'driver':
        return { label: 'Fleet Driver', icon: Truck, badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-800/60' };
      case 'facility':
        return { label: 'Facility Operator', icon: Building2, badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-800/60' };
      default:
        return { label: 'Citizen', icon: UserCheck, badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' };
    }
  };

  const roleInfo = getRoleBadge(activeRole);
  const RoleIcon = roleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Municipal SaaS Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-sm">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Waste<span className="text-emerald-400">Flow</span>
              </span>
              <span className="hidden sm:inline-flex items-center rounded-md bg-emerald-950/80 px-2 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-800/60">
                Municipal SaaS
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search & Showcase Tour */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search pickups, bins, vehicles...</span>
            <kbd className="ml-2 rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300 font-mono">⌘K</kbd>
          </button>

          <button
            onClick={startShowcaseTour}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              showcaseActive
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{showcaseActive ? 'Tour Active' : 'Guided Tour'}</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Telemetry Indicator */}
          <button
            onClick={toggleSimulation}
            title={isSimulating ? 'Simulated Telemetry Active' : 'Simulation Paused'}
            className={`hidden lg:flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors ${
              isSimulating
                ? 'border-emerald-800/60 bg-emerald-950/30 text-emerald-300'
                : 'border-slate-700 bg-slate-800/50 text-slate-400'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isSimulating ? 'bg-emerald-400' : 'bg-slate-500'}`} />
            <span className="font-mono text-[11px]">Telemetry {isSimulating ? 'Active' : 'Paused'}</span>
          </button>

          {/* AI Assistant */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-750 transition-colors"
            title="Ask WasteFlow Assistant"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">AI Help</span>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-750 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Language Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-750 transition-colors"
            >
              <Languages className="h-3.5 w-3.5 text-slate-400" />
              <span className="uppercase font-mono">{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-xl z-50 animate-fade-in">
                <button
                  onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                    language === 'en' ? 'bg-emerald-950/80 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  English
                  {language === 'en' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                </button>
                <button
                  onClick={() => { setLanguage('te'); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                    language === 'te' ? 'bg-emerald-950/80 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  తెలుగు (Telugu)
                  {language === 'te' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                    language === 'hi' ? 'bg-emerald-950/80 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  हिन्दी (Hindi)
                  {language === 'hi' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Authenticated User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 pl-2 pr-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-750 transition-all shadow-sm"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-6 w-6 rounded-full object-cover border border-emerald-500/60"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-300">
                  <UserIcon className="h-3.5 w-3.5" />
                </div>
              )}
              <div className="text-left hidden sm:block">
                <span className="block font-semibold text-xs leading-tight text-white max-w-[110px] truncate">
                  {currentUser?.name || 'User'}
                </span>
                <span className="block text-[10px] font-mono text-emerald-400 leading-none">
                  {roleInfo.label}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl z-50 animate-fade-in">
                
                {/* User Header */}
                <div className="pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="h-10 w-10 rounded-full object-cover border border-emerald-500/60"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                        <UserIcon className="h-5 w-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${roleInfo.badgeClass}`}>
                        <RoleIcon className="h-2.5 w-2.5" />
                        <span>{roleInfo.label}</span>
                      </span>
                    </div>
                  </div>

                  {currentUser.zone && (
                    <div className="mt-2.5 text-[11px] text-slate-400 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-slate-500">Zone: </span>
                      <span className="text-slate-200 font-medium">{currentUser.zone}</span>
                    </div>
                  )}

                  {activeRole === 'citizen' && currentUser.points !== undefined && (
                    <div className="mt-1.5 flex items-center justify-between text-[11px] bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg text-emerald-300">
                      <span className="flex items-center gap-1 font-medium">
                        <Award className="h-3.5 w-3.5 text-amber-400" />
                        <span>Eco-Points</span>
                      </span>
                      <span className="font-bold font-mono text-white">{currentUser.points} pts</span>
                    </div>
                  )}
                </div>

                {/* Account Actions */}
                <div className="pt-2 space-y-1">
                  <button
                    onClick={() => {
                      resetAllDemoData();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Demo Dataset</span>
                  </button>

                  <button
                    onClick={async () => {
                      setShowProfileMenu(false);
                      await logout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
