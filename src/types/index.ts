export type UserRole = 'citizen' | 'admin' | 'driver' | 'facility';

export type LanguageCode = 'en' | 'te' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  address?: string;
  zone?: string;
  points?: number;
  badge?: string;
  level?: number;
}

export type WasteCategory =
  | 'Wet'
  | 'Dry'
  | 'Plastic'
  | 'Paper'
  | 'Glass'
  | 'Metal'
  | 'E-Waste'
  | 'Hazardous'
  | 'Mixed';

export type BinStatus = 'NORMAL' | 'FILLING' | 'HIGH' | 'CRITICAL' | 'OFFLINE';

export interface SmartBin {
  id: string;
  code: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    zone: string;
    ward: string;
  };
  category: WasteCategory;
  capacityLiters: number;
  currentFillLevel: number; // 0 to 100 percentage
  fillWeightKg: number;
  temperatureCelsius: number;
  batteryLevel: number; // percentage
  sensorStatus: 'HEALTHY' | 'WARNING' | 'ANOMALY' | 'OFFLINE';
  lastCommunication: string;
  lastCollectionTime: string;
  predictedOverflowMinutes: number;
  status: BinStatus;
  trend: 'stable' | 'rising_slow' | 'rising_fast' | 'critical_spike';
  tiltAngle?: number;
  odorIndex?: number; // 0 to 100
}

export type VehicleStatus = 'IDLE' | 'ON_ROUTE' | 'COLLECTING' | 'MAINTENANCE' | 'OFFLINE';

export interface Vehicle {
  id: string;
  plateNumber: string;
  name: string;
  type: 'Compact Compactor' | 'Heavy Compactor' | 'E-Trike Collector' | 'Hazardous Transport' | 'Recyclables Van';
  capacityKg: number;
  currentLoadKg: number;
  fuelBatteryLevel: number; // %
  fuelType: 'Electric' | 'CNG' | 'Diesel';
  status: VehicleStatus;
  driverId: string;
  driverName: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  heading: number;
  assignedZone: string;
  mileageKm: number;
  healthScore: number;
  maintenanceAlert?: string;
  routeId?: string;
}

export type PickupStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'ASSIGNED'
  | 'DRIVER_EN_ROUTE'
  | 'ARRIVED'
  | 'COLLECTED'
  | 'VERIFIED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface PickupStatusLog {
  status: PickupStatus;
  timestamp: string;
  note?: string;
  actorId?: string;
}

export interface PickupRequest {
  id: string;
  requestNumber: string;
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  category: WasteCategory;
  estimatedWeightKg: number;
  itemCount?: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    zone: string;
  };
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  imageUrl?: string;
  status: PickupStatus;
  createdAt: string;
  updatedAt: string;
  assignedVehicleId?: string;
  assignedDriverName?: string;
  verificationOtp: string;
  verificationQrCode: string;
  collectedAt?: string;
  collectedWeightKg?: number;
  pointsEarned?: number;
  co2SavedKg?: number;
  statusHistory?: PickupStatusLog[];
}

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface PriorityItem {
  id: string;
  entityType: 'BIN' | 'PICKUP' | 'INCIDENT' | 'EVENT';
  entityId: string;
  title: string;
  location: string;
  priority: PriorityLevel;
  score: number; // 0-100
  reason: string;
  recommendedAction: string;
  timeSensitivity: string;
  zone: string;
}

export type IncidentType =
  | 'Illegal Dumping'
  | 'Bin Overflow'
  | 'Vehicle Breakdown'
  | 'Road Obstruction'
  | 'Sensor Malfunction'
  | 'Hazardous Spill'
  | 'Missed Pickup SLA';

export type IncidentStatus = 'REPORTED' | 'UNDER_REVIEW' | 'ASSIGNED' | 'CLEANING' | 'RESOLVED' | 'REJECTED';

export interface Incident {
  id: string;
  incidentNumber: string;
  type: IncidentType;
  reportedBy: string;
  reporterType: 'CITIZEN' | 'AI_CAMERA' | 'IOT_SENSOR' | 'DRIVER' | 'MUNICIPAL_PATROL';
  location: {
    lat: number;
    lng: number;
    address: string;
    zone: string;
  };
  category?: WasteCategory;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: IncidentStatus;
  imageUrl?: string;
  description: string;
  aiDetectionConfidence?: number;
  reportedAt: string;
  resolvedAt?: string;
  assignedCrew?: string;
  repeatHotspot: boolean;
  repeatIncidentCount?: number;
}

export interface Facility {
  id: string;
  name: string;
  type: 'Material Recovery (MRF)' | 'Compost & Bio-Methanation' | 'E-Waste Refining' | 'Plastic Pyrolysis' | 'Refuse Derived Fuel (RDF)';
  location: {
    lat: number;
    lng: number;
    address: string;
    zone: string;
  };
  acceptedCategories: WasteCategory[];
  totalCapacityTonsDay: number;
  currentProcessingTonsDay: number;
  recycledOutputTonsMonth: number;
  operationalStatus: 'OPERATIONAL' | 'HIGH_CAPACITY' | 'MAINTENANCE';
  contactPerson: string;
  contactPhone: string;
  efficiencyScore: number;
  materialBreakdown?: {
    recycledTons: number;
    compostedTons: number;
    biogasM3: number;
    eWasteKg: number;
    rdfTons: number;
  };
}

export interface RouteStop {
  id: string;
  order: number;
  type: 'BIN' | 'PICKUP' | 'INCIDENT' | 'FACILITY';
  targetId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  estimatedWeightKg: number;
  status: 'PENDING' | 'ARRIVED' | 'COLLECTED' | 'SKIPPED';
  etaMinutes: number;
  timeWindow: string;
  category: WasteCategory;
}

export interface OptimizedRoute {
  id: string;
  vehicleId: string;
  vehicleName: string;
  driverName: string;
  zone: string;
  stops: RouteStop[];
  totalDistanceKm: number;
  estimatedDurationMin: number;
  estimatedFuelLiters: number;
  co2ReductionKg: number;
  capacityUtilizationPercent: number;
  totalLoadKg: number;
  status: 'ACTIVE' | 'COMPLETED' | 'REROUTED';
  generatedAt: string;
}

export interface AIWasteAnalysisResult {
  detectedCategory: WasteCategory;
  confidence: number;
  itemName: string;
  binColor: string;
  binHex: string;
  recommendation: string;
  whyCategory: string[];
  recyclabilityRate: number;
  hazardLevel: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedCo2AvoidancePerKg: number;
  specialInstructions: string;
  isSimulated?: boolean;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'pickup' | 'emergency' | 'route' | 'bin' | 'ai' | 'rewards' | 'facility';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
}

export interface RewardItem {
  id: string;
  name: string;
  pointsCost: number;
  category: 'VOUCHER' | 'COMMUNITY' | 'PLANT_TREE' | 'TAX_REBATE';
  description: string;
  imageUrl: string;
  claimed?: boolean;
}

export interface CitizenBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  progress: number;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  type: 'TRUCK_BREAKDOWN' | 'ROAD_CLOSURE' | 'HEAVY_TRAFFIC' | 'WASTE_SURGE' | 'DRIVER_UNAVAILABLE' | 'BIN_OVERFLOW' | 'FACILITY_OUTAGE' | 'FESTIVAL_EVENT';
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  impacts: {
    vehiclesAffected: number;
    pickupsDelayed: number;
    additionalFuelLiters: number;
    additionalTimeMin: number;
    estimatedCostDeltaUSD: number;
    mitigationStrategy: string;
  };
}

export interface EnvironmentalStats {
  totalWasteCollectedTons: number;
  divertedFromLandfillTons: number;
  recyclingVolumeTons: number;
  compostGeneratedTons: number;
  eWasteRecoveredKg: number;
  co2ReductionTons: number;
  fuelSavedLiters: number;
  tripsAvoidedCount: number;
  equivalentTreesPlanted: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  entity: string;
  ipAddress: string;
  status: 'SUCCESS' | 'ALERT' | 'FAILED';
  details: string;
}
