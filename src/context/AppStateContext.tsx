import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SmartBin,
  Vehicle,
  PickupRequest,
  Facility,
  Incident,
  PriorityItem,
  OptimizedRoute,
  WhatIfScenario,
  RewardItem,
  CitizenBadge,
  EnvironmentalStats,
  NotificationItem,
  AuditLog,
  PickupStatus
} from '../types';
import {
  binApi,
  pickupApi,
  vehicleApi,
  facilityApi,
  reportApi,
  routeApi,
  scenarioApi,
  rewardApi,
  notificationApi,
  analyticsApi
} from '../services/api';
import {
  MOCK_BINS,
  MOCK_VEHICLES,
  MOCK_PICKUP_REQUESTS,
  MOCK_FACILITIES,
  MOCK_INCIDENTS,
  MOCK_PRIORITY_ITEMS,
  MOCK_WHAT_IF_SCENARIOS,
  MOCK_REWARDS,
  MOCK_BADGES,
  INITIAL_ENV_STATS,
  MOCK_AUDIT_LOGS
} from '../data/mockData';
import { generateOptimizedCityRoutes, executeWhatIfSimulation } from '../services/routingService';

interface OptimizationResult {
  routes: OptimizedRoute[];
  summaryBefore: any;
  summaryAfter: any;
  deltaSavings: any;
  appliedAt: string;
}

interface AppStateContextType {
  bins: SmartBin[];
  vehicles: Vehicle[];
  pickups: PickupRequest[];
  facilities: Facility[];
  incidents: Incident[];
  priorityItems: PriorityItem[];
  rewards: RewardItem[];
  badges: CitizenBadge[];
  envStats: EnvironmentalStats;
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  activeRoutes: OptimizedRoute[];
  lastOptimization: OptimizationResult | null;
  activeScenario: WhatIfScenario | null;
  scenarioImpactResult: any | null;
  isLoading: boolean;
  apiError: string | null;
  
  // Real-time Simulation Controls
  isSimulating: boolean;
  simulationSpeed: number;
  toggleSimulation: () => void;
  setSimSpeed: (speed: number) => void;
  
  // Showcase Tour
  showcaseActive: boolean;
  showcaseStep: number;
  startShowcaseTour: () => void;
  nextShowcaseStep: () => void;
  prevShowcaseStep: () => void;
  jumpToShowcaseStep: (step: number) => void;
  exitShowcaseTour: () => void;

  // Actions
  addPickupRequest: (req: Partial<PickupRequest>) => Promise<PickupRequest>;
  updatePickupStatus: (pickupId: string, newStatus: PickupStatus, extra?: any) => Promise<boolean>;
  verifyPickupOtp: (pickupId: string, enteredOtp: string) => Promise<{ success: boolean; message: string; pointsEarned?: number; receipt?: any }>;
  addIncidentReport: (inc: Partial<Incident>) => Promise<Incident>;
  updateIncidentStatus: (incId: string, status: Incident['status'], crew?: string) => Promise<void>;
  optimizeCityCollection: () => Promise<OptimizationResult>;
  runWhatIfScenario: (scenarioId: string) => Promise<any>;
  clearWhatIfScenario: () => void;
  claimReward: (rewardId: string) => Promise<boolean>;
  markNotificationRead: (id: string) => Promise<void>;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  triggerQuickScenario: (type: 'overflow' | 'breakdown' | 'traffic' | 'dumping' | 'surge') => void;
  resetAllDemoData: () => Promise<void>;
  refreshAllData: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bins, setBins] = useState<SmartBin[]>(MOCK_BINS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [pickups, setPickups] = useState<PickupRequest[]>(MOCK_PICKUP_REQUESTS);
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>(MOCK_PRIORITY_ITEMS);
  const [rewards, setRewards] = useState<RewardItem[]>(MOCK_REWARDS);
  const [badges, setBadges] = useState<CitizenBadge[]>(MOCK_BADGES);
  const [envStats, setEnvStats] = useState<EnvironmentalStats>(INITIAL_ENV_STATS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [activeRoutes, setActiveRoutes] = useState<OptimizedRoute[]>([]);
  const [lastOptimization, setLastOptimization] = useState<OptimizationResult | null>(null);
  
  const [activeScenario, setActiveScenario] = useState<WhatIfScenario | null>(null);
  const [scenarioImpactResult, setScenarioImpactResult] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);

  // Showcase state
  const [showcaseActive, setShowcaseActive] = useState<boolean>(false);
  const [showcaseStep, setShowcaseStep] = useState<number>(1);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Collection Vehicle Assigned',
      message: 'Driver Ramesh Kumar (T-01) is en route to your doorstep for E-Waste pickup.',
      type: 'pickup',
      timestamp: '10m ago',
      read: false,
      priority: 'HIGH'
    },
    {
      id: 'notif-2',
      title: 'Smart Bin B-101 Critical Warning',
      message: 'Fill level reached 96% at Cyber Towers Quad A. Auto-dispatched override vehicle.',
      type: 'bin',
      timestamp: '25m ago',
      read: false,
      priority: 'CRITICAL'
    },
    {
      id: 'notif-3',
      title: 'AI Illegal Dumping Verified',
      message: 'CCTV Camera #14 confirmed mixed debris dump at Hitec City ramp.',
      type: 'ai',
      timestamp: '40m ago',
      read: true,
      priority: 'HIGH'
    }
  ]);

  // Initial Data Load from Backend REST API
  const refreshAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      const [
        binsRes,
        pickupsRes,
        vehiclesRes,
        facilitiesRes,
        incidentsRes,
        routesRes,
        rewardsRes,
        envRes,
        prioritiesRes,
        notifsRes,
        logsRes
      ] = await Promise.allSettled([
        binApi.getAll(),
        pickupApi.getAll(),
        vehicleApi.getAll(),
        facilityApi.getAll(),
        reportApi.getAll(),
        routeApi.getAll(),
        rewardApi.getAll(),
        analyticsApi.getEnvironmentalImpact(),
        analyticsApi.getPriorities(),
        notificationApi.getAll(),
        analyticsApi.getAuditLogs()
      ]);

      if (binsRes.status === 'fulfilled' && binsRes.value) setBins(binsRes.value);
      if (pickupsRes.status === 'fulfilled' && pickupsRes.value) setPickups(pickupsRes.value);
      if (vehiclesRes.status === 'fulfilled' && vehiclesRes.value) setVehicles(vehiclesRes.value);
      if (facilitiesRes.status === 'fulfilled' && facilitiesRes.value) setFacilities(facilitiesRes.value);
      if (incidentsRes.status === 'fulfilled' && incidentsRes.value) setIncidents(incidentsRes.value);
      if (routesRes.status === 'fulfilled' && routesRes.value && routesRes.value.length > 0) {
        setActiveRoutes(routesRes.value);
      } else {
        const initRoutes = generateOptimizedCityRoutes(MOCK_BINS, MOCK_PICKUP_REQUESTS, MOCK_VEHICLES, MOCK_FACILITIES);
        setActiveRoutes(initRoutes.routes);
      }
      if (rewardsRes.status === 'fulfilled' && rewardsRes.value) {
        if (rewardsRes.value.rewards) setRewards(rewardsRes.value.rewards);
        if (rewardsRes.value.badges) setBadges(rewardsRes.value.badges);
      }
      if (envRes.status === 'fulfilled' && envRes.value) setEnvStats(envRes.value);
      if (prioritiesRes.status === 'fulfilled' && prioritiesRes.value) setPriorityItems(prioritiesRes.value);
      if (notifsRes.status === 'fulfilled' && notifsRes.value && notifsRes.value.length > 0) setNotifications(notifsRes.value);
      if (logsRes.status === 'fulfilled' && logsRes.value) setAuditLogs(logsRes.value);

    } catch (err: any) {
      console.warn('[AppState] Failed to fetch backend state, using local baseline:', err.message);
      setApiError('Connected in local mode. Backend server syncing...');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const addNotification = useCallback((notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newItem, ...prev]);
  }, []);

  const markNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await notificationApi.markRead(id);
    } catch (e) {
      // Handled silently
    }
  };

  // Real-time IoT & GPS simulation ticker
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.max(1000, Math.floor(4000 / simulationSpeed));

    const timer = setInterval(() => {
      // 1. Move vehicles along small heading steps
      setVehicles(prevVehicles =>
        prevVehicles.map(v => {
          if (v.status !== 'ON_ROUTE' && v.status !== 'COLLECTING') return v;
          
          const deltaLat = (Math.sin(Date.now() / 15000 + Number(v.id.replace('veh-', '').replace('0', '') || 1)) * 0.0004);
          const deltaLng = (Math.cos(Date.now() / 15000 + Number(v.id.replace('veh-', '').replace('0', '') || 1)) * 0.0004);
          
          const newLat = Number((v.currentLocation.lat + deltaLat).toFixed(5));
          const newLng = Number((v.currentLocation.lng + deltaLng).toFixed(5));
          const newHeading = (v.heading + 5) % 360;
          
          return {
            ...v,
            currentLocation: { lat: newLat, lng: newLng },
            heading: newHeading,
            fuelBatteryLevel: Math.max(12, v.fuelBatteryLevel - (Math.random() > 0.8 ? 1 : 0))
          };
        })
      );

      // 2. Increment bin fill levels slowly
      setBins(prevBins =>
        prevBins.map((bin) => {
          if (bin.status === 'OFFLINE') return bin;
          
          const shouldIncrement = Math.random() > 0.75;
          const incAmount = shouldIncrement ? Math.floor(1 + Math.random() * 2) : 0;
          const newFill = Math.min(100, bin.currentFillLevel + incAmount);
          
          let newStatus = bin.status;
          if (newFill >= 90) newStatus = 'CRITICAL';
          else if (newFill >= 75) newStatus = 'HIGH';
          else if (newFill >= 50) newStatus = 'FILLING';

          const newPred = Math.max(5, bin.predictedOverflowMinutes - (shouldIncrement ? 3 : 1));

          return {
            ...bin,
            currentFillLevel: newFill,
            fillWeightKg: Math.round(newFill * 4.2),
            status: newStatus,
            predictedOverflowMinutes: newPred,
            lastCommunication: 'Just now'
          };
        })
      );
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed]);

  const toggleSimulation = () => setIsSimulating(prev => !prev);
  const setSimSpeed = (speed: number) => setSimulationSpeed(speed);

  // Actions
  const addPickupRequest = async (req: Partial<PickupRequest>): Promise<PickupRequest> => {
    try {
      const created = await pickupApi.create(req);
      setPickups(prev => [created, ...prev]);
      addNotification({
        title: 'Pickup Request Scheduled',
        message: `Pickup ${created.requestNumber} for ${created.category} waste scheduled. Verification OTP: ${created.verificationOtp}`,
        type: 'pickup',
        priority: 'NORMAL'
      });
      return created;
    } catch (err: any) {
      console.warn('[AddPickup] API failed, creating locally:', err.message);
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
      const reqNum = `REQ-2026-${Math.floor(8810 + Math.random() * 900)}`;
      const localReq: PickupRequest = {
        id: `req-${Date.now()}`,
        requestNumber: reqNum,
        citizenId: req.citizenId || 'user-c1',
        citizenName: req.citizenName || 'Ananya Sharma',
        citizenPhone: req.citizenPhone || '+91 98490 12345',
        category: req.category || 'Dry',
        estimatedWeightKg: req.estimatedWeightKg || 10,
        itemCount: req.itemCount || 1,
        location: req.location || {
          lat: 17.4490,
          lng: 78.3830,
          address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
          zone: 'Hitec City - Zone 1'
        },
        preferredDate: req.preferredDate || new Date().toISOString().split('T')[0],
        preferredTimeSlot: req.preferredTimeSlot || '10:00 AM - 12:00 PM',
        notes: req.notes || '',
        imageUrl: req.imageUrl || '',
        status: 'REQUESTED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        verificationOtp: randomOtp,
        verificationQrCode: `WF-VERIFY-${reqNum}-OTP${randomOtp}`,
        pointsEarned: 100
      };
      setPickups(prev => [localReq, ...prev]);
      return localReq;
    }
  };

  const updatePickupStatus = async (pickupId: string, newStatus: PickupStatus, extra?: any): Promise<boolean> => {
    try {
      await pickupApi.updateStatus(pickupId, newStatus, extra?.notes, extra?.collectedWeightKg);
    } catch (e) {
      // Local fallback
    }

    setPickups(prev =>
      prev.map(p => {
        if (p.id === pickupId) {
          return {
            ...p,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            ...(extra || {})
          };
        }
        return p;
      })
    );

    addNotification({
      title: `Pickup Status: ${newStatus.replace('_', ' ')}`,
      message: `Request ID ${pickupId} updated to ${newStatus}.`,
      type: 'pickup',
      priority: 'NORMAL'
    });
    return true;
  };

  const verifyPickupOtp = async (pickupId: string, enteredOtp: string): Promise<{ success: boolean; message: string; pointsEarned?: number; receipt?: any }> => {
    try {
      const res = await pickupApi.verifyOtp(pickupId, enteredOtp);
      if (res.success) {
        setPickups(prev => prev.map(p => p.id === pickupId ? res.pickup : p));
        setEnvStats(prev => ({
          ...prev,
          divertedFromLandfillTons: Number((prev.divertedFromLandfillTons + ((res.pickup.estimatedWeightKg || 10) / 1000)).toFixed(3)),
          co2ReductionTons: Number((prev.co2ReductionTons + ((res.co2SavedKg || 14) / 1000)).toFixed(3))
        }));
        return {
          success: true,
          message: 'Verification successful! Collection logged and digital receipt issued.',
          pointsEarned: res.pointsEarned,
          receipt: res.receipt
        };
      }
    } catch (err: any) {
      // Fallback local check
      const pickup = pickups.find(p => p.id === pickupId);
      if (!pickup) return { success: false, message: 'Pickup request not found.' };
      if (pickup.status === 'VERIFIED' || pickup.status === 'COMPLETED') {
        return { success: false, message: 'Pickup is already verified.' };
      }
      if (pickup.verificationOtp.trim() !== enteredOtp.trim()) {
        return { success: false, message: 'Invalid OTP code! Please verify with citizen.' };
      }

      const earned = pickup.pointsEarned || 120;
      const co2Avoided = Number(((pickup.estimatedWeightKg || 12) * 1.4).toFixed(1));

      updatePickupStatus(pickupId, 'VERIFIED', {
        collectedAt: new Date().toISOString(),
        collectedWeightKg: pickup.estimatedWeightKg,
        co2SavedKg: co2Avoided
      });

      return { success: true, message: 'Verification successful!', pointsEarned: earned };
    }

    return { success: false, message: 'Verification failed.' };
  };

  const addIncidentReport = async (inc: Partial<Incident>): Promise<Incident> => {
    try {
      const created = await reportApi.create(inc);
      setIncidents(prev => [created, ...prev]);
      return created;
    } catch (e) {
      const incNum = `INC-2026-${Math.floor(4410 + Math.random() * 900)}`;
      const localInc: Incident = {
        id: `inc-${Date.now()}`,
        incidentNumber: incNum,
        type: inc.type || 'Illegal Dumping',
        reportedBy: inc.reportedBy || 'Ananya Sharma (Citizen)',
        reporterType: inc.reporterType || 'CITIZEN',
        location: inc.location || {
          lat: 17.4350,
          lng: 78.3810,
          address: 'Service Lane near Cyber Gateway, Hitec City',
          zone: 'Hitec City - Zone 1'
        },
        category: inc.category || 'Mixed',
        severity: inc.severity || 'HIGH',
        status: 'REPORTED',
        imageUrl: inc.imageUrl || 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
        description: inc.description || 'Illegal debris dump reported.',
        aiDetectionConfidence: 94.8,
        reportedAt: new Date().toISOString(),
        repeatHotspot: true,
        repeatIncidentCount: 3
      };
      setIncidents(prev => [localInc, ...prev]);
      return localInc;
    }
  };

  const updateIncidentStatus = async (incId: string, status: Incident['status'], crew?: string) => {
    try {
      await reportApi.updateStatus(incId, status, crew);
    } catch (e) {
      // Local fallback
    }
    setIncidents(prev =>
      prev.map(inc => (inc.id === incId ? { ...inc, status, assignedCrew: crew || inc.assignedCrew } : inc))
    );
  };

  const optimizeCityCollection = async (): Promise<OptimizationResult> => {
    try {
      const res = await routeApi.optimize();
      if (res.data?.routes) {
        setActiveRoutes(res.data.routes);
        const optPayload: OptimizationResult = {
          ...res.data,
          appliedAt: new Date().toLocaleTimeString()
        };
        setLastOptimization(optPayload);
        return optPayload;
      }
    } catch (e) {
      // Local fallback algorithm
    }

    const result = generateOptimizedCityRoutes(bins, pickups, vehicles, facilities);
    setActiveRoutes(result.routes);
    const optPayload: OptimizationResult = {
      ...result,
      appliedAt: new Date().toLocaleTimeString()
    };
    setLastOptimization(optPayload);
    return optPayload;
  };

  const runWhatIfScenario = async (scenarioId: string) => {
    try {
      const res = await scenarioApi.simulate(scenarioId);
      if (res.data) {
        setActiveScenario(res.data.scenario);
        setScenarioImpactResult(res.data);
        setActiveRoutes(res.data.recalculatedRoutes);
        return res.data;
      }
    } catch (e) {
      // Local fallback
    }

    const scenario = MOCK_WHAT_IF_SCENARIOS.find(s => s.id === scenarioId) || MOCK_WHAT_IF_SCENARIOS[0];
    setActiveScenario(scenario);
    const simResult = executeWhatIfSimulation(scenario, activeRoutes);
    setScenarioImpactResult(simResult);
    setActiveRoutes(simResult.recalculatedRoutes);
    return simResult;
  };

  const clearWhatIfScenario = () => {
    setActiveScenario(null);
    setScenarioImpactResult(null);
    const standard = generateOptimizedCityRoutes(bins, pickups, vehicles, facilities);
    setActiveRoutes(standard.routes);
  };

  const claimReward = async (rewardId: string): Promise<boolean> => {
    try {
      await rewardApi.claim(rewardId);
    } catch (e) {
      // Local fallback
    }

    setRewards(prev =>
      prev.map(r => (r.id === rewardId ? { ...r, claimed: true } : r))
    );
    addNotification({
      title: 'Reward Redeemed Successfully',
      message: 'Your green credit certificate has been activated.',
      type: 'rewards',
      priority: 'NORMAL'
    });
    return true;
  };

  const triggerQuickScenario = (type: 'overflow' | 'breakdown' | 'traffic' | 'dumping' | 'surge') => {
    switch (type) {
      case 'overflow':
        setBins(prev =>
          prev.map((b, i) => (i === 0 || i === 4 ? { ...b, currentFillLevel: 96, status: 'CRITICAL', predictedOverflowMinutes: 12 } : b))
        );
        addNotification({
          title: 'Simulated Overflow: B-101 at 96%',
          message: 'Ultrasonic sensor triggered emergency overflow threshold.',
          type: 'bin',
          priority: 'CRITICAL'
        });
        break;
      case 'breakdown':
        setVehicles(prev =>
          prev.map(v => (v.id === 'veh-01' ? { ...v, status: 'MAINTENANCE', healthScore: 40 } : v))
        );
        runWhatIfScenario('scen-1');
        break;
      case 'traffic':
        runWhatIfScenario('scen-2');
        break;
      case 'dumping':
        addIncidentReport({
          type: 'Illegal Dumping',
          category: 'Plastic',
          description: 'Sudden unauthorized plastics dumping detected by AI Camera.',
          severity: 'CRITICAL'
        });
        break;
      case 'surge':
        runWhatIfScenario('scen-3');
        break;
    }
  };

  // 15-Step Showcase Tour
  const startShowcaseTour = () => {
    setShowcaseActive(true);
    setShowcaseStep(1);
  };

  const exitShowcaseTour = () => {
    setShowcaseActive(false);
  };

  const jumpToShowcaseStep = (step: number) => {
    setShowcaseStep(step);
    switch (step) {
      case 3:
        updatePickupStatus('req-01', 'REQUESTED');
        break;
      case 5:
        triggerQuickScenario('overflow');
        break;
      case 7:
        optimizeCityCollection();
        break;
      case 9:
        triggerQuickScenario('breakdown');
        break;
      case 11:
        updatePickupStatus('req-01', 'ARRIVED');
        break;
      case 12:
        verifyPickupOtp('req-01', '7492');
        break;
    }
  };

  const nextShowcaseStep = () => {
    if (showcaseStep < 15) {
      jumpToShowcaseStep(showcaseStep + 1);
    } else {
      setShowcaseActive(false);
    }
  };

  const prevShowcaseStep = () => {
    if (showcaseStep > 1) {
      jumpToShowcaseStep(showcaseStep - 1);
    }
  };

  const resetAllDemoData = async () => {
    try {
      await analyticsApi.resetDemoData();
      await refreshAllData();
    } catch (e) {
      // Local reset
      setBins(MOCK_BINS);
      setVehicles(MOCK_VEHICLES);
      setPickups(MOCK_PICKUP_REQUESTS);
      setFacilities(MOCK_FACILITIES);
      setIncidents(MOCK_INCIDENTS);
      setPriorityItems(MOCK_PRIORITY_ITEMS);
      setRewards(MOCK_REWARDS);
      setBadges(MOCK_BADGES);
      setEnvStats(INITIAL_ENV_STATS);
      setActiveScenario(null);
      setScenarioImpactResult(null);
      const standard = generateOptimizedCityRoutes(MOCK_BINS, MOCK_PICKUP_REQUESTS, MOCK_VEHICLES, MOCK_FACILITIES);
      setActiveRoutes(standard.routes);
      setLastOptimization(null);
    }

    setShowcaseActive(false);
    setShowcaseStep(1);
    addNotification({
      title: 'Demo Environment Reset',
      message: 'All smart bins, vehicles, routes, and requests restored to baseline state.',
      type: 'ai',
      priority: 'NORMAL'
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        bins,
        vehicles,
        pickups,
        facilities,
        incidents,
        priorityItems,
        rewards,
        badges,
        envStats,
        notifications,
        auditLogs,
        activeRoutes,
        lastOptimization,
        activeScenario,
        scenarioImpactResult,
        isLoading,
        apiError,
        isSimulating,
        simulationSpeed,
        toggleSimulation,
        setSimSpeed,
        showcaseActive,
        showcaseStep,
        startShowcaseTour,
        nextShowcaseStep,
        prevShowcaseStep,
        jumpToShowcaseStep,
        exitShowcaseTour,
        addPickupRequest,
        updatePickupStatus,
        verifyPickupOtp,
        addIncidentReport,
        updateIncidentStatus,
        optimizeCityCollection,
        runWhatIfScenario,
        clearWhatIfScenario,
        claimReward,
        markNotificationRead,
        addNotification,
        triggerQuickScenario,
        resetAllDemoData,
        refreshAllData
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
