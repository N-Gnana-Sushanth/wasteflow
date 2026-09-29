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
  Sliders,
  CheckCircle2,
  ChevronDown,
  ExternalLink
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
  const { currentUser, activeRole, setRole, switchDemoRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const {
    notifications,
    startShowcaseTour,
    showcaseActive,
    resetAllDemoData,
    isSimulating,
    toggleSimulation
  } = useAppState();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleConfigs: { role: UserRole; label: string; icon: any }[] = [
    { role: 'citizen', label: t('role_citizen') || 'Citizen Portal', icon: UserCheck },
    { role: 'admin', label: t('role_admin') || 'Municipal Admin', icon: Cpu },
    { role: 'driver', label: t('role_driver') || 'Driver Portal', icon: Truck },
    { role: 'facility', label: t('role_facility') || 'Recycling Facility', icon: Building2 }
  ];

  const currentRoleCfg = roleConfigs.find((r) => r.role === activeRole) || roleConfigs[0];
  const CurrentIcon = currentRoleCfg.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Smart City Badge */}
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
          
          {/* Simulation Toggle */}
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

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-750 transition-all shadow-sm"
            >
              <CurrentIcon className="h-4 w-4 text-emerald-400" />
              <span className="hidden sm:inline font-medium">{currentRoleCfg.label}</span>
              <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl z-50 animate-fade-in">
                <div className="px-2.5 py-1.5 border-b border-slate-800 mb-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Persona</p>
                  <p className="text-xs text-slate-200 font-medium truncate">{currentUser.name}</p>
                </div>
                {roleConfigs.map((cfg) => {
                  const Icon = cfg.icon;
                  const isSelected = cfg.role === activeRole;
                  return (
                    <button
                      key={cfg.role}
                      onClick={async () => {
                        setShowRoleMenu(false);
                        await switchDemoRole(cfg.role);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-emerald-950/80 text-emerald-300 font-medium border border-emerald-800/60'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span className="flex-1 text-left">{cfg.label}</span>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  );
                })}
                <div className="border-t border-slate-800 mt-1.5 pt-1.5 space-y-1">
                  <button
                    onClick={() => {
                      resetAllDemoData();
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reset Mock Dataset</span>
                  </button>
                  <button
                    onClick={async () => {
                      setShowRoleMenu(false);
                      await logout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                  >
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
