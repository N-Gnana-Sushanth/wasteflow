import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import { useAppState } from './context/AppStateContext';
import { Navbar } from './components/common/Navbar';
import { QuickScenarioBar } from './components/common/QuickScenarioBar';
import { HackathonTourBar } from './components/common/HackathonTourBar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AIAssistantDrawer } from './components/citizen/AIAssistantDrawer';

// Authentication & Landing Pages
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';

// Citizen Views
import { CitizenHome } from './components/citizen/CitizenHome';
import { AIWasteScanner } from './components/citizen/AIWasteScanner';
import { SmartPickupRequestForm } from './components/citizen/SmartPickupRequestForm';
import { LiveTrackingView } from './components/citizen/LiveTrackingView';
import { CitizenRewards } from './components/citizen/CitizenRewards';
import { IllegalDumpingReporter } from './components/citizen/IllegalDumpingReporter';
import { RecyclingFinder } from './components/citizen/RecyclingFinder';
import { PickupReceiptModal } from './components/citizen/PickupReceiptModal';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SmartBinIoTView } from './components/admin/SmartBinIoTView';
import { RouteOptimizationView } from './components/admin/RouteOptimizationView';
import { WhatIfSimulatorView } from './components/admin/WhatIfSimulatorView';
import { PredictiveDemandView } from './components/admin/PredictiveDemandView';
import { MunicipalAnalyticsView } from './components/admin/MunicipalAnalyticsView';
import { IllegalDumpingIntelligenceView } from './components/admin/IllegalDumpingIntelligenceView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

// Driver Views
import { DriverDashboard } from './components/driver/DriverDashboard';

// Facility Views
import { FacilityDashboard } from './components/facility/FacilityDashboard';

import { PickupRequest, WasteCategory } from './types';

// Icons for sub-tabs
import {
  Sparkles,
  LayoutDashboard,
  Camera,
  Truck,
  Award,
  Flame,
  Building2,
  Trash2,
  Navigation,
  Wrench,
  TrendingUp,
  Sliders,
  Activity,
  Home
} from 'lucide-react';

export const App: React.FC = () => {
  const { currentUser, activeRole, isAuthenticated, setRole, switchDemoRole } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState<boolean>(false);
  const [showAssistantDrawer, setShowAssistantDrawer] = useState<boolean>(false);
  const [activeReceiptPickup, setActiveReceiptPickup] = useState<PickupRequest | null>(null);

  // Pre-fill state when jumping from AI Scanner to Pickup Form
  const [scannerCategoryHint, setScannerCategoryHint] = useState<WasteCategory | undefined>(undefined);
  const [scannerItemHint, setScannerItemHint] = useState<string>('');

  // Default initial tab on role change or login
  useEffect(() => {
    if (activeRole === 'citizen') {
      if (activeTab === 'dashboard' || activeTab === 'driver_route' || activeTab === 'facility_inflow') {
        setActiveTab('home');
      }
    } else if (activeRole === 'admin') {
      if (activeTab === 'home' || activeTab === 'driver_route' || activeTab === 'facility_inflow') {
        setActiveTab('dashboard');
      }
    } else if (activeRole === 'driver') {
      setActiveTab('driver_route');
    } else if (activeRole === 'facility') {
      setActiveTab('facility_inflow');
    }
  }, [activeRole]);

  // Define navigation subtabs per role
  const getSubTabs = () => {
    switch (activeRole) {
      case 'citizen':
        return [
          { id: 'home', label: t('nav_home') || 'Dashboard', icon: Home },
          { id: 'scanner', label: t('nav_scanner') || 'AI Scanner', icon: Camera },
          { id: 'pickups', label: t('nav_pickups') || 'Schedule Pickup', icon: Truck },
          { id: 'tracking', label: t('nav_tracking') || 'Live Tracking', icon: Navigation },
          { id: 'rewards', label: t('nav_rewards') || 'Eco Rewards', icon: Award },
          { id: 'dumping', label: t('nav_dumping') || 'Report Dumping', icon: Flame },
          { id: 'centers', label: t('nav_centers') || 'Recycling Centers', icon: Building2 },
          { id: 'landing', label: 'Public Portal', icon: LayoutDashboard }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
          { id: 'bins', label: t('nav_bins') || 'Smart Bins', icon: Trash2 },
          { id: 'routes', label: t('nav_routes') || 'Route Dispatch', icon: Navigation },
          { id: 'whatif', label: t('nav_whatif') || 'What-If Simulator', icon: Wrench },
          { id: 'predictive', label: 'AI Forecasting', icon: TrendingUp },
          { id: 'analytics', label: t('nav_analytics') || 'Analytics', icon: Activity },
          { id: 'incidents', label: t('nav_incidents') || 'Illegal Dumping', icon: Flame },
          { id: 'settings', label: t('nav_admin_settings') || 'Settings & Logs', icon: Sliders },
          { id: 'landing', label: 'Public Portal', icon: Home }
        ];
      case 'driver':
        return [
          { id: 'driver_route', label: t('nav_driver_route') || 'Driver Route & Manifest', icon: Truck },
          { id: 'landing', label: 'Public Portal', icon: Home }
        ];
      case 'facility':
        return [
          { id: 'facility_inflow', label: 'Facility Terminal', icon: Building2 },
          { id: 'landing', label: 'Public Portal', icon: Home }
        ];
      default:
        return [];
    }
  };

  const subTabs = getSubTabs();

  const handleScheduleFromScanner = (cat: WasteCategory, item: string) => {
    setScannerCategoryHint(cat);
    setScannerItemHint(item);
    setActiveTab('pickups');
  };

  const handleLocateFromScanner = () => {
    if (activeRole === 'citizen') {
      setActiveTab('home');
    } else {
      setActiveTab('bins');
    }
  };

  // If user is not authenticated: Show LoginPage or LandingPage preview
  if (!isAuthenticated) {
    if (activeTab === 'landing') {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          <header className="border-b border-slate-800 bg-slate-900/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                <Trash2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Waste<span className="text-emerald-400">Flow</span>
              </span>
            </div>
            <button
              onClick={() => setActiveTab('login')}
              className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-all shadow-md"
            >
              Sign In to Platform
            </button>
          </header>

          <main className="flex-1">
            <LandingPage
              onEnterApp={async (role) => {
                await switchDemoRole(role);
                if (role === 'citizen') setActiveTab('home');
                else if (role === 'admin') setActiveTab('dashboard');
                else if (role === 'driver') setActiveTab('driver_route');
                else if (role === 'facility') setActiveTab('facility_inflow');
              }}
            />
          </main>
        </div>
      );
    }

    return (
      <LoginPage
        onSuccessRedirect={(role) => {
          if (role === 'citizen') setActiveTab('home');
          else if (role === 'admin') setActiveTab('dashboard');
          else if (role === 'driver') setActiveTab('driver_route');
          else if (role === 'facility') setActiveTab('facility_inflow');
        }}
        onExploreLanding={() => setActiveTab('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenNotifications={() => setShowNotifDrawer(true)}
        onOpenAssistant={() => setShowAssistantDrawer(true)}
      />

      {/* Quick Scenario & Simulation Bar */}
      <QuickScenarioBar />

      {/* Sub-Navigation Tabs Bar */}
      <div className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-sm sticky top-16 z-30 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Landing Page View */}
        {activeTab === 'landing' ? (
          <LandingPage
            onEnterApp={async (role) => {
              await switchDemoRole(role);
              if (role === 'citizen') setActiveTab('home');
              else if (role === 'admin') setActiveTab('dashboard');
              else if (role === 'driver') setActiveTab('driver_route');
              else if (role === 'facility') setActiveTab('facility_inflow');
            }}
          />
        ) : activeRole === 'citizen' ? (
          /* CITIZEN PORTAL VIEWS */
          <>
            {activeTab === 'home' && (
              <CitizenHome
                onNavigateTab={(t) => setActiveTab(t)}
                onOpenReceipt={(pickup) => setActiveReceiptPickup(pickup)}
              />
            )}
            {activeTab === 'scanner' && (
              <AIWasteScanner
                onSchedulePickupWithCategory={handleScheduleFromScanner}
                onLocateBinForCategory={handleLocateFromScanner}
              />
            )}
            {activeTab === 'pickups' && (
              <SmartPickupRequestForm
                initialCategory={scannerCategoryHint}
                initialItemName={scannerItemHint}
                onSuccessCreated={() => {
                  setScannerCategoryHint(undefined);
                  setScannerItemHint('');
                }}
              />
            )}
            {activeTab === 'tracking' && (
              <LiveTrackingView
                onOpenReceipt={(pickup) => setActiveReceiptPickup(pickup)}
              />
            )}
            {activeTab === 'rewards' && <CitizenRewards />}
            {activeTab === 'dumping' && <IllegalDumpingReporter />}
            {activeTab === 'centers' && <RecyclingFinder />}
          </>
        ) : activeRole === 'admin' ? (
          /* MUNICIPAL ADMIN PORTAL VIEWS */
          <>
            {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setActiveTab(t)} />}
            {activeTab === 'bins' && <SmartBinIoTView />}
            {activeTab === 'routes' && <RouteOptimizationView />}
            {activeTab === 'whatif' && <WhatIfSimulatorView />}
            {activeTab === 'predictive' && <PredictiveDemandView />}
            {activeTab === 'analytics' && <MunicipalAnalyticsView />}
            {activeTab === 'incidents' && <IllegalDumpingIntelligenceView />}
            {activeTab === 'settings' && <AdminSettingsView />}
          </>
        ) : activeRole === 'driver' ? (
          /* DRIVER PORTAL VIEW */
          <DriverDashboard />
        ) : activeRole === 'facility' ? (
          /* FACILITY PORTAL VIEW */
          <FacilityDashboard />
        ) : null}

      </main>

      {/* Floating Guided Tour Controller */}
      <HackathonTourBar onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Global Modals & Drawers */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectEntity={(type, id) => {
          if (type === 'bin') {
            setRole('admin');
            setActiveTab('bins');
          } else if (type === 'vehicle') {
            setRole('admin');
            setActiveTab('routes');
          } else if (type === 'pickup') {
            setRole('citizen');
            setActiveTab('tracking');
          } else if (type === 'incident') {
            setRole('admin');
            setActiveTab('incidents');
          } else if (type === 'facility') {
            setRole('facility');
            setActiveTab('facility_inflow');
          }
        }}
      />

      <NotificationDrawer
        isOpen={showNotifDrawer}
        onClose={() => setShowNotifDrawer(false)}
      />

      <AIAssistantDrawer
        isOpen={showAssistantDrawer}
        onClose={() => setShowAssistantDrawer(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      <PickupReceiptModal
        isOpen={!!activeReceiptPickup}
        onClose={() => setActiveReceiptPickup(null)}
        pickup={activeReceiptPickup}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>WasteFlow © 2026 • AI-Assisted Smart Waste Logistics & Municipal Circular Platform</span>
          <span className="text-emerald-400 font-medium">Municipal Operations • SOC-2 / ISO-14001 Architecture</span>
        </div>
      </footer>

    </div>
  );
};
