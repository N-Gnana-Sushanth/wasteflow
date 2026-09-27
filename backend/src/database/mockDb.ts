import {
  User,
  SmartBin,
  Vehicle,
  PickupRequest,
  Facility,
  Incident,
  PriorityItem,
  WhatIfScenario,
  RewardItem,
  CitizenBadge,
  EnvironmentalStats,
  AuditLog,
  NotificationItem,
  WasteScanRecord,
  OptimizedRoute
} from '../types';
import {
  SEED_USERS,
  SEED_BINS,
  SEED_VEHICLES,
  SEED_PICKUPS,
  SEED_FACILITIES,
  SEED_INCIDENTS,
  SEED_NOTIFICATIONS,
  SEED_PRIORITY_ITEMS,
  SEED_SCENARIOS,
  SEED_REWARDS,
  SEED_BADGES,
  INITIAL_ENV_STATS,
  SEED_AUDIT_LOGS
} from './seedData';

export class MockDatabase {
  public users: User[] = [];
  public bins: SmartBin[] = [];
  public vehicles: Vehicle[] = [];
  public pickups: PickupRequest[] = [];
  public facilities: Facility[] = [];
  public incidents: Incident[] = [];
  public priorityItems: PriorityItem[] = [];
  public scenarios: WhatIfScenario[] = [];
  public rewards: RewardItem[] = [];
  public badges: CitizenBadge[] = [];
  public envStats: EnvironmentalStats = { ...INITIAL_ENV_STATS };
  public notifications: NotificationItem[] = [];
  public auditLogs: AuditLog[] = [];
  public wasteScans: WasteScanRecord[] = [];
  public routes: OptimizedRoute[] = [];

  constructor() {
    this.seed();
  }

  public seed(): void {
    // Deep clone seeds to avoid mutated reference leaks on resets
    this.users = JSON.parse(JSON.stringify(SEED_USERS));
    this.bins = JSON.parse(JSON.stringify(SEED_BINS));
    this.vehicles = JSON.parse(JSON.stringify(SEED_VEHICLES));
    this.pickups = JSON.parse(JSON.stringify(SEED_PICKUPS));
    this.facilities = JSON.parse(JSON.stringify(SEED_FACILITIES));
    this.incidents = JSON.parse(JSON.stringify(SEED_INCIDENTS));
    this.priorityItems = JSON.parse(JSON.stringify(SEED_PRIORITY_ITEMS));
    this.scenarios = JSON.parse(JSON.stringify(SEED_SCENARIOS));
    this.rewards = JSON.parse(JSON.stringify(SEED_REWARDS));
    this.badges = JSON.parse(JSON.stringify(SEED_BADGES));
    this.envStats = JSON.parse(JSON.stringify(INITIAL_ENV_STATS));
    this.notifications = JSON.parse(JSON.stringify(SEED_NOTIFICATIONS));
    this.auditLogs = JSON.parse(JSON.stringify(SEED_AUDIT_LOGS));
    this.wasteScans = [];
    this.routes = [];
  }

  public reset(): void {
    this.seed();
  }
}

// Singleton database instance
export const db = new MockDatabase();
