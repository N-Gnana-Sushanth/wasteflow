import bcrypt from 'bcryptjs';
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

export const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('Password@123', 10);
export const CITIZEN_PASSWORD_HASH = bcrypt.hashSync('Citizen@123', 10);
export const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Admin@123', 10);
export const DRIVER_PASSWORD_HASH = bcrypt.hashSync('Driver@123', 10);
export const FACILITY_PASSWORD_HASH = bcrypt.hashSync('Facility@123', 10);

export const SEED_USERS: User[] = [
  // Primary Demo Accounts
  {
    id: 'user-c1',
    name: 'Ananya Sharma',
    email: 'citizen@wasteflow.in',
    passwordHash: CITIZEN_PASSWORD_HASH,
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 12345',
    address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
    zone: 'Hitec City - Zone 1',
    points: 1240,
    badge: 'Eco Champion',
    level: 4,
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'user-a1',
    name: 'Dr. Vikramaditya Rao',
    email: 'admin@wasteflow.gov.in',
    passwordHash: ADMIN_PASSWORD_HASH,
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 99999',
    address: 'Municipal Command Operations Wing, Floor 6',
    zone: 'Metropolitan HQ',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'user-d1',
    name: 'Ramesh Kumar',
    email: 'driver@wasteflow-fleet.in',
    passwordHash: DRIVER_PASSWORD_HASH,
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 54321',
    address: 'Depot 3, Gachibowli Logistics Park',
    zone: 'Gachibowli - Zone 2',
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  {
    id: 'user-f1',
    name: 'GreenTech Bio-Circular Hub',
    email: 'facility@greentech.org',
    passwordHash: FACILITY_PASSWORD_HASH,
    role: 'facility',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 77777',
    address: 'Circular Economy Industrial Park, ORR Exit 7',
    zone: 'Industrial Eco-Zone',
    createdAt: '2026-01-02T08:00:00.000Z'
  },

  // Additional 19 Citizens (Total 20 Citizens)
  ...Array.from({ length: 19 }, (_, i) => {
    const idx = i + 2;
    const names = [
      'Priya Nair', 'Rajesh Varma', 'Sneha Reddy', 'Karthik Subbaraj', 'Deepika Rao',
      'Arun Kumar', 'Meera Krishnan', 'Aditya Joshi', 'Kavita Menon', 'Siddharth Roy',
      'Neha Gupta', 'Rohan Deshmukh', 'Pooja Hegde', 'Manoj Bajpayee', 'Sunita Rao',
      'Harish Patel', 'Divya Iyer', 'Naveen Polishetty', 'Shreya Ghoshal'
    ];
    const zones = [
      'Hitec City - Zone 1', 'Gachibowli - Zone 2', 'Madhapur - Zone 3', 'Jubilee Hills - Zone 4',
      'Banjara Hills - Zone 5', 'Kukatpally - Zone 6', 'Financial District - Zone 7', 'Secunderabad - Zone 8'
    ];
    return {
      id: `user-c${idx}`,
      name: names[i] || `Citizen User ${idx}`,
      email: `citizen${idx}@wasteflow.in`,
      passwordHash: DEFAULT_PASSWORD_HASH,
      role: 'citizen' as const,
      avatar: `https://images.unsplash.com/photo-${1530000000000 + idx * 10000}?w=150&auto=format&fit=crop&q=80`,
      phone: `+91 98490 ${10000 + idx * 111}`,
      address: `Apt ${100 + idx * 5}, Tower ${String.fromCharCode(65 + (idx % 4))}, Smart Colony`,
      zone: zones[idx % zones.length],
      points: 200 + (idx * 65),
      badge: idx % 3 === 0 ? 'Eco Warrior' : idx % 2 === 0 ? 'Zero Waste Pioneer' : 'Green Citizen',
      level: 1 + (idx % 5),
      createdAt: '2026-01-15T08:00:00.000Z'
    };
  }),

  // Additional 4 Drivers (Total 5 Drivers)
  ...Array.from({ length: 4 }, (_, i) => {
    const idx = i + 2;
    const driverNames = ['Suresh Babu', 'Venkat Reddy', 'Mohammed Ali', 'Kishore Goud'];
    return {
      id: `user-d${idx}`,
      name: driverNames[i],
      email: `driver${idx}@wasteflow-fleet.in`,
      passwordHash: DRIVER_PASSWORD_HASH,
      role: 'driver' as const,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + idx * 15000}?w=150&auto=format&fit=crop&q=80`,
      phone: `+91 98490 ${50000 + idx * 111}`,
      address: `Depot ${idx}, Logistics Base ${idx}`,
      zone: `Zone ${idx}`,
      createdAt: '2026-01-06T08:00:00.000Z'
    };
  })
];

// 10 Vehicles
export const SEED_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    plateNumber: 'TS-09-WF-1001',
    name: 'EcoCompactor Alpha (T-01)',
    type: 'Heavy Compactor',
    capacityKg: 8000,
    currentLoadKg: 4620,
    fuelBatteryLevel: 84,
    fuelType: 'CNG',
    status: 'ON_ROUTE',
    driverId: 'user-d1',
    driverName: 'Ramesh Kumar',
    currentLocation: { lat: 17.4435, lng: 78.3792 },
    heading: 42,
    assignedZone: 'Hitec City - Zone 1',
    mileageKm: 42800,
    healthScore: 92,
    routeId: 'route-01'
  },
  {
    id: 'veh-02',
    plateNumber: 'TS-09-WF-1002',
    name: 'ElectroClean Trike 02',
    type: 'E-Trike Collector',
    capacityKg: 1500,
    currentLoadKg: 1100,
    fuelBatteryLevel: 72,
    fuelType: 'Electric',
    status: 'COLLECTING',
    driverId: 'user-d2',
    driverName: 'Suresh Babu',
    currentLocation: { lat: 17.4478, lng: 78.3512 },
    heading: 115,
    assignedZone: 'Gachibowli - Zone 2',
    mileageKm: 14200,
    healthScore: 96,
    routeId: 'route-02'
  },
  {
    id: 'veh-03',
    plateNumber: 'TS-09-WF-1003',
    name: 'BioWaste Express 03',
    type: 'Compact Compactor',
    capacityKg: 5000,
    currentLoadKg: 3890,
    fuelBatteryLevel: 61,
    fuelType: 'CNG',
    status: 'ON_ROUTE',
    driverId: 'user-d3',
    driverName: 'Venkat Reddy',
    currentLocation: { lat: 17.4332, lng: 78.3894 },
    heading: 260,
    assignedZone: 'Madhapur - Zone 3',
    mileageKm: 61200,
    healthScore: 84,
    routeId: 'route-03'
  },
  {
    id: 'veh-04',
    plateNumber: 'TS-09-WF-1004',
    name: 'HazardShield Unit 04',
    type: 'Hazardous Transport',
    capacityKg: 3000,
    currentLoadKg: 850,
    fuelBatteryLevel: 90,
    fuelType: 'Electric',
    status: 'IDLE',
    driverId: 'user-d4',
    driverName: 'Mohammed Ali',
    currentLocation: { lat: 17.4210, lng: 78.4320 },
    heading: 0,
    assignedZone: 'Banjara Hills - Zone 5',
    mileageKm: 28400,
    healthScore: 98
  },
  {
    id: 'veh-05',
    plateNumber: 'TS-09-WF-1005',
    name: 'RecycleVan Delta 05',
    type: 'Recyclables Van',
    capacityKg: 4000,
    currentLoadKg: 2950,
    fuelBatteryLevel: 68,
    fuelType: 'Electric',
    status: 'ON_ROUTE',
    driverId: 'user-d5',
    driverName: 'Kishore Goud',
    currentLocation: { lat: 17.4310, lng: 78.4080 },
    heading: 180,
    assignedZone: 'Jubilee Hills - Zone 4',
    mileageKm: 33100,
    healthScore: 89
  },
  ...Array.from({ length: 5 }, (_, i) => {
    const idx = i + 6;
    return {
      id: `veh-0${idx}`,
      plateNumber: `TS-09-WF-100${idx}`,
      name: `City Compactor Unit 0${idx}`,
      type: 'Compact Compactor' as const,
      capacityKg: 5000,
      currentLoadKg: 1200 + (idx * 300),
      fuelBatteryLevel: 80 - (idx * 4),
      fuelType: 'CNG' as const,
      status: (idx % 2 === 0 ? 'COLLECTING' : 'IDLE') as any,
      driverId: `user-d${(idx % 5) + 1}`,
      driverName: `Driver Specialist 0${idx}`,
      currentLocation: { lat: 17.4200 + (idx * 0.008), lng: 78.3600 + (idx * 0.008) },
      heading: (idx * 45) % 360,
      assignedZone: `Zone ${idx % 8 + 1}`,
      mileageKm: 20000 + (idx * 4500),
      healthScore: 90
    };
  })
];

// 52 Smart Bins
const BASE_BIN_SPECS = [
  { name: 'Cyber Towers Quad A', cat: 'Plastic' as const, lat: 17.4504, lng: 78.3808, zone: 'Hitec City - Zone 1', ward: 'Ward 101' },
  { name: 'Mindspace Gate 3 Hub', cat: 'Dry' as const, lat: 17.4428, lng: 78.3822, zone: 'Hitec City - Zone 1', ward: 'Ward 101' },
  { name: 'Inorbit Mall Food Court Rear', cat: 'Wet' as const, lat: 17.4344, lng: 78.3867, zone: 'Madhapur - Zone 3', ward: 'Ward 102' },
  { name: 'Durgam Cheruvu Walkway', cat: 'Plastic' as const, lat: 17.4312, lng: 78.3915, zone: 'Madhapur - Zone 3', ward: 'Ward 102' },
  { name: 'Knowledge City Tower B', cat: 'Paper' as const, lat: 17.4398, lng: 78.3754, zone: 'Hitec City - Zone 1', ward: 'Ward 103' },
  { name: 'Gachibowli Stadium North Gate', cat: 'Mixed' as const, lat: 17.4485, lng: 78.3490, zone: 'Gachibowli - Zone 2', ward: 'Ward 104' },
  { name: 'IIIT Hyderabad Campus Hub', cat: 'E-Waste' as const, lat: 17.4452, lng: 78.3498, zone: 'Gachibowli - Zone 2', ward: 'Ward 104' },
  { name: 'ISB Road Commercial Bin 12', cat: 'Glass' as const, lat: 17.4285, lng: 78.3582, zone: 'Gachibowli - Zone 2', ward: 'Ward 105' },
  { name: 'Financial District Circular Hub', cat: 'Wet' as const, lat: 17.4180, lng: 78.3420, zone: 'Financial District - Zone 7', ward: 'Ward 106' },
  { name: 'Nanakramguda Junction Point', cat: 'Dry' as const, lat: 17.4150, lng: 78.3475, zone: 'Financial District - Zone 7', ward: 'Ward 106' },
  { name: 'Jubilee Hills Checkpost Metro', cat: 'Plastic' as const, lat: 17.4289, lng: 78.4110, zone: 'Jubilee Hills - Zone 4', ward: 'Ward 107' },
  { name: 'Road No 36 Commercial Strip', cat: 'Paper' as const, lat: 17.4340, lng: 78.4060, zone: 'Jubilee Hills - Zone 4', ward: 'Ward 107' },
  { name: 'Road No 45 Flyover Terminal', cat: 'Mixed' as const, lat: 17.4390, lng: 78.4010, zone: 'Jubilee Hills - Zone 4', ward: 'Ward 108' },
  { name: 'Banjara Hills Road 12 Center', cat: 'Hazardous' as const, lat: 17.4195, lng: 78.4350, zone: 'Banjara Hills - Zone 5', ward: 'Ward 109' },
  { name: 'KBR Park Perimeter 4', cat: 'Dry' as const, lat: 17.4240, lng: 78.4210, zone: 'Banjara Hills - Zone 5', ward: 'Ward 109' },
  { name: 'Kukatpally Y-Junction Plaza', cat: 'Wet' as const, lat: 17.4840, lng: 78.4120, zone: 'Kukatpally - Zone 6', ward: 'Ward 110' },
  { name: 'KPHB Colony 4th Phase Hub', cat: 'Metal' as const, lat: 17.4920, lng: 78.3980, zone: 'Kukatpally - Zone 6', ward: 'Ward 110' },
  { name: 'Forum Sujana Mall Exterior', cat: 'Plastic' as const, lat: 17.4870, lng: 78.3880, zone: 'Kukatpally - Zone 6', ward: 'Ward 111' },
  { name: 'Secunderabad Station East Plaza', cat: 'Mixed' as const, lat: 17.4344, lng: 78.5010, zone: 'Secunderabad - Zone 8', ward: 'Ward 112' },
  { name: 'Paradise Circle Terminal', cat: 'Wet' as const, lat: 17.4420, lng: 78.4870, zone: 'Secunderabad - Zone 8', ward: 'Ward 112' }
];

export const SEED_BINS: SmartBin[] = Array.from({ length: 52 }, (_, i) => {
  const base = BASE_BIN_SPECS[i % BASE_BIN_SPECS.length];
  const binNum = 101 + i;
  const isCritical = i === 0 || i === 4; // Bin B-101 and B-105 critical for demo
  const isHigh = i === 7 || i === 12;
  const fillLevel = isCritical ? 96 : isHigh ? 82 : Math.floor(25 + ((i * 17) % 55));

  let status: SmartBin['status'] = 'NORMAL';
  if (fillLevel >= 90) status = 'CRITICAL';
  else if (fillLevel >= 75) status = 'HIGH';
  else if (fillLevel >= 50) status = 'FILLING';

  return {
    id: `bin-${binNum}`,
    code: `BIN-${binNum}`,
    name: `${base.name} #${Math.floor(i / BASE_BIN_SPECS.length) + 1}`,
    location: {
      lat: Number((base.lat + (Math.sin(i) * 0.004)).toFixed(5)),
      lng: Number((base.lng + (Math.cos(i) * 0.004)).toFixed(5)),
      address: `${base.name}, ${base.zone}`,
      zone: base.zone,
      ward: base.ward
    },
    category: base.cat,
    capacityLiters: 1100,
    currentFillLevel: fillLevel,
    fillWeightKg: Math.round(fillLevel * 4.2),
    temperatureCelsius: 28 + (i % 8),
    batteryLevel: 94 - (i % 25),
    sensorStatus: i === 19 ? 'WARNING' : 'HEALTHY',
    lastCommunication: '2m ago',
    lastCollectionTime: `${4 + (i % 12)} hours ago`,
    predictedOverflowMinutes: isCritical ? 14 : isHigh ? 42 : 180 + (i * 12),
    status,
    trend: isCritical ? 'critical_spike' : isHigh ? 'rising_fast' : 'stable',
    tiltAngle: 1.2,
    odorIndex: Math.floor(fillLevel * 0.7)
  };
});

// 30 Pickup Requests
export const SEED_PICKUPS: PickupRequest[] = [
  {
    id: 'req-01',
    requestNumber: 'REQ-2026-8801',
    citizenId: 'user-c1',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    category: 'E-Waste',
    estimatedWeightKg: 14,
    itemCount: 3,
    location: {
      lat: 17.4490,
      lng: 78.3830,
      address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
      zone: 'Hitec City - Zone 1'
    },
    preferredDate: '2026-09-28',
    preferredTimeSlot: '10:00 AM - 12:00 PM',
    notes: 'Old CPU cabinet, printer cartridges and laptop chargers.',
    status: 'ASSIGNED',
    createdAt: '2026-09-27T08:30:00Z',
    updatedAt: '2026-09-27T09:15:00Z',
    assignedVehicleId: 'veh-01',
    assignedDriverName: 'Ramesh Kumar',
    verificationOtp: '7492',
    verificationQrCode: 'WF-VERIFY-REQ-2026-8801-OTP7492',
    pointsEarned: 140,
    co2SavedKg: 19.6,
    statusHistory: [
      { status: 'REQUESTED', timestamp: '2026-09-27T08:30:00Z', note: 'Created by citizen' },
      { status: 'APPROVED', timestamp: '2026-09-27T09:00:00Z', note: 'Admin automated review' },
      { status: 'ASSIGNED', timestamp: '2026-09-27T09:15:00Z', note: 'Assigned to EcoCompactor Alpha (T-01)' }
    ]
  },
  {
    id: 'req-02',
    requestNumber: 'REQ-2026-8802',
    citizenId: 'user-c2',
    citizenName: 'Priya Nair',
    citizenPhone: '+91 98490 10111',
    category: 'Plastic',
    estimatedWeightKg: 22,
    itemCount: 4,
    location: {
      lat: 17.4412,
      lng: 78.3840,
      address: 'Plot 44, Silicon Valley Enclave, Madhapur',
      zone: 'Madhapur - Zone 3'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '02:00 PM - 04:00 PM',
    notes: 'Clean crushed PET water bottles and HDPE containers.',
    status: 'REQUESTED',
    createdAt: '2026-09-27T09:00:00Z',
    updatedAt: '2026-09-27T09:00:00Z',
    verificationOtp: '3819',
    verificationQrCode: 'WF-VERIFY-REQ-2026-8802-OTP3819',
    pointsEarned: 110,
    co2SavedKg: 15.4
  },
  {
    id: 'req-03',
    requestNumber: 'REQ-2026-8803',
    citizenId: 'user-c3',
    citizenName: 'Rajesh Varma',
    citizenPhone: '+91 98490 10222',
    category: 'Paper',
    estimatedWeightKg: 35,
    itemCount: 6,
    location: {
      lat: 17.4440,
      lng: 78.3520,
      address: 'Villa 18, Rolling Hills, Gachibowli',
      zone: 'Gachibowli - Zone 2'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '11:00 AM - 01:00 PM',
    notes: 'Flattened corrugated shipping cartons.',
    status: 'DRIVER_EN_ROUTE',
    createdAt: '2026-09-27T07:45:00Z',
    updatedAt: '2026-09-27T09:30:00Z',
    assignedVehicleId: 'veh-02',
    assignedDriverName: 'Suresh Babu',
    verificationOtp: '5128',
    verificationQrCode: 'WF-VERIFY-REQ-2026-8803-OTP5128',
    pointsEarned: 160,
    co2SavedKg: 24.5
  },
  {
    id: 'req-04',
    requestNumber: 'REQ-2026-8804',
    citizenId: 'user-c1',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    category: 'Dry',
    estimatedWeightKg: 8,
    itemCount: 2,
    location: {
      lat: 17.4490,
      lng: 78.3830,
      address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
      zone: 'Hitec City - Zone 1'
    },
    preferredDate: '2026-09-25',
    preferredTimeSlot: '10:00 AM - 12:00 PM',
    status: 'COMPLETED',
    createdAt: '2026-09-25T08:00:00Z',
    updatedAt: '2026-09-25T11:20:00Z',
    assignedVehicleId: 'veh-01',
    assignedDriverName: 'Ramesh Kumar',
    verificationOtp: '9921',
    verificationQrCode: 'WF-VERIFY-REQ-2026-8804-OTP9921',
    collectedAt: '2026-09-25T11:20:00Z',
    collectedWeightKg: 8.5,
    pointsEarned: 120,
    co2SavedKg: 11.9
  },
  ...Array.from({ length: 26 }, (_, i) => {
    const idx = i + 5;
    const categories: PickupRequest['category'][] = ['Dry', 'Wet', 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Hazardous'];
    const statuses: PickupRequest['status'][] = ['REQUESTED', 'APPROVED', 'ASSIGNED', 'DRIVER_EN_ROUTE', 'ARRIVED', 'COLLECTED', 'VERIFIED', 'COMPLETED'];
    const cat = categories[idx % categories.length];
    const stat = statuses[idx % statuses.length];
    const otp = `${Math.floor(1000 + (idx * 271) % 9000)}`;
    const weight = 5 + (idx * 3);

    return {
      id: `req-${idx < 10 ? '0' + idx : idx}`,
      requestNumber: `REQ-2026-${8800 + idx}`,
      citizenId: `user-c${(idx % 19) + 1}`,
      citizenName: `Citizen Specialist ${idx}`,
      citizenPhone: `+91 98490 ${11000 + idx}`,
      category: cat,
      estimatedWeightKg: weight,
      itemCount: 1 + (idx % 5),
      location: {
        lat: 17.4300 + (idx * 0.002),
        lng: 78.3700 + (idx * 0.002),
        address: `Residential Complex ${idx}, Zone ${(idx % 8) + 1}`,
        zone: `Zone ${(idx % 8) + 1}`
      },
      preferredDate: '2026-09-28',
      preferredTimeSlot: '10:00 AM - 12:00 PM',
      notes: 'Scheduled via WasteFlow Smart App.',
      status: stat,
      createdAt: '2026-09-26T10:00:00Z',
      updatedAt: '2026-09-27T08:00:00Z',
      assignedVehicleId: stat !== 'REQUESTED' ? `veh-0${(idx % 5) + 1}` : undefined,
      assignedDriverName: stat !== 'REQUESTED' ? `Driver ${(idx % 5) + 1}` : undefined,
      verificationOtp: otp,
      verificationQrCode: `WF-VERIFY-REQ-2026-${8800 + idx}-OTP${otp}`,
      pointsEarned: weight * 10,
      co2SavedKg: Number((weight * 1.4).toFixed(1))
    };
  })
];

// 10 Facilities
export const SEED_FACILITIES: Facility[] = [
  {
    id: 'fac-01',
    name: 'GreenTech MRF & Circular Hub',
    type: 'Material Recovery (MRF)',
    location: {
      lat: 17.4120,
      lng: 78.3210,
      address: 'Plot 10, Financial District Circular Corridor, ORR Exit 7',
      zone: 'Financial District - Zone 7'
    },
    acceptedCategories: ['Dry', 'Plastic', 'Paper', 'Metal', 'Glass'],
    totalCapacityTonsDay: 350,
    currentProcessingTonsDay: 260,
    recycledOutputTonsMonth: 7200,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'Dr. Srinivas Murthy',
    contactPhone: '+91 98490 77771',
    efficiencyScore: 96.4,
    materialBreakdown: {
      recycledTons: 180,
      compostedTons: 0,
      biogasM3: 0,
      eWasteKg: 0,
      rdfTons: 80
    }
  },
  {
    id: 'fac-02',
    name: 'BioMethan Mega Composting Hub',
    type: 'Compost & Bio-Methanation',
    location: {
      lat: 17.4620,
      lng: 78.4320,
      address: 'Agro-Eco Zone, Balanagar Industrial Strip',
      zone: 'Kukatpally - Zone 6'
    },
    acceptedCategories: ['Wet'],
    totalCapacityTonsDay: 200,
    currentProcessingTonsDay: 165,
    recycledOutputTonsMonth: 4800,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'K. V. Ramana',
    contactPhone: '+91 98490 77772',
    efficiencyScore: 94.0,
    materialBreakdown: {
      recycledTons: 0,
      compostedTons: 120,
      biogasM3: 45000,
      eWasteKg: 0,
      rdfTons: 45
    }
  },
  {
    id: 'fac-03',
    name: 'CircuitCycle E-Waste Refinery',
    type: 'E-Waste Refining',
    location: {
      lat: 17.4780,
      lng: 78.3680,
      address: 'Electronic City Phase 2, Kukatpally',
      zone: 'Kukatpally - Zone 6'
    },
    acceptedCategories: ['E-Waste'],
    totalCapacityTonsDay: 50,
    currentProcessingTonsDay: 38,
    recycledOutputTonsMonth: 950,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'T. Hariprasad',
    contactPhone: '+91 98490 77773',
    efficiencyScore: 98.2,
    materialBreakdown: {
      recycledTons: 0,
      compostedTons: 0,
      biogasM3: 0,
      eWasteKg: 38000,
      rdfTons: 0
    }
  },
  ...Array.from({ length: 7 }, (_, i) => {
    const idx = i + 4;
    const types: Facility['type'][] = [
      'Material Recovery (MRF)',
      'Plastic Pyrolysis',
      'Refuse Derived Fuel (RDF)',
      'Compost & Bio-Methanation',
      'Material Recovery (MRF)',
      'E-Waste Refining',
      'Plastic Pyrolysis'
    ];
    return {
      id: `fac-0${idx}`,
      name: `Metro Eco Processing Center 0${idx}`,
      type: types[i],
      location: {
        lat: 17.4000 + (idx * 0.01),
        lng: 78.3500 + (idx * 0.01),
        address: `Industrial Substation ${idx}, Hyderabad Outer Ring`,
        zone: `Zone ${idx % 8 + 1}`
      },
      acceptedCategories: ['Dry', 'Plastic', 'Wet', 'Metal'] as any,
      totalCapacityTonsDay: 150 + (idx * 20),
      currentProcessingTonsDay: 110 + (idx * 15),
      recycledOutputTonsMonth: 3000 + (idx * 400),
      operationalStatus: 'OPERATIONAL' as const,
      contactPerson: `Facility Officer 0${idx}`,
      contactPhone: `+91 98490 7777${idx}`,
      efficiencyScore: 92.5
    };
  })
];

// 10 Illegal Dumping Incidents
export const SEED_INCIDENTS: Incident[] = [
  {
    id: 'inc-01',
    incidentNumber: 'INC-2026-4401',
    type: 'Illegal Dumping',
    reportedBy: 'AI Smart CCTV Cam #14',
    reporterType: 'AI_CAMERA',
    location: {
      lat: 17.4350,
      lng: 78.3810,
      address: 'Service Lane near Cyber Gateway, Hitec City',
      zone: 'Hitec City - Zone 1'
    },
    category: 'Mixed',
    severity: 'HIGH',
    status: 'ASSIGNED',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
    description: 'Commercial debris & construction plaster dumped unauthorized at flyover ramp.',
    aiDetectionConfidence: 94.8,
    reportedAt: '2026-09-27T07:15:00Z',
    assignedCrew: 'Rapid Clean Squad #2',
    repeatHotspot: true,
    repeatIncidentCount: 4
  },
  {
    id: 'inc-02',
    incidentNumber: 'INC-2026-4402',
    type: 'Illegal Dumping',
    reportedBy: 'Citizen Ananya Sharma',
    reporterType: 'CITIZEN',
    location: {
      lat: 17.4245,
      lng: 78.4230,
      address: 'KBR Park Gate 3 Walking Track Perimeter',
      zone: 'Banjara Hills - Zone 5'
    },
    category: 'Plastic',
    severity: 'MEDIUM',
    status: 'REPORTED',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    description: 'Discarded beverage cups and single-use plastic waste near park trail.',
    aiDetectionConfidence: 91.2,
    reportedAt: '2026-09-27T08:45:00Z',
    repeatHotspot: false,
    repeatIncidentCount: 1
  },
  ...Array.from({ length: 8 }, (_, i) => {
    const idx = i + 3;
    const types: Incident['type'][] = ['Illegal Dumping', 'Bin Overflow', 'Road Obstruction', 'Hazardous Spill'];
    return {
      id: `inc-0${idx}`,
      incidentNumber: `INC-2026-${4400 + idx}`,
      type: types[i % types.length],
      reportedBy: idx % 2 === 0 ? `Patrol Officer ${idx}` : `Citizen ${idx}`,
      reporterType: (idx % 2 === 0 ? 'MUNICIPAL_PATROL' : 'CITIZEN') as any,
      location: {
        lat: 17.4200 + (idx * 0.006),
        lng: 78.3600 + (idx * 0.006),
        address: `Roadway Junction ${idx}, Metro Sub-zone`,
        zone: `Zone ${(idx % 8) + 1}`
      },
      category: 'Dry' as const,
      severity: (idx % 3 === 0 ? 'CRITICAL' : idx % 2 === 0 ? 'HIGH' : 'MEDIUM') as any,
      status: (idx % 2 === 0 ? 'CLEANING' : 'REPORTED') as any,
      imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
      description: `Reported municipal sanitation incident at Zone ${(idx % 8) + 1}.`,
      aiDetectionConfidence: 90 + (idx % 8),
      reportedAt: '2026-09-26T12:00:00Z',
      repeatHotspot: idx % 3 === 0,
      repeatIncidentCount: idx % 3 === 0 ? 3 : 1
    };
  })
];

// 20 Notifications
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-c1',
    title: 'Collection Vehicle Assigned',
    message: 'Driver Ramesh Kumar (T-01) is assigned to your E-Waste pickup. OTP: 7492.',
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
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const idx = i + 4;
    return {
      id: `notif-${idx}`,
      userId: `user-c${(idx % 4) + 1}`,
      title: `System Alert: Zone ${idx % 8 + 1} Status Update`,
      message: `Fleet telemetry and collection update for sector ${idx}.`,
      type: (idx % 3 === 0 ? 'route' : idx % 2 === 0 ? 'rewards' : 'facility') as any,
      timestamp: `${idx * 15}m ago`,
      read: idx % 2 === 0,
      priority: (idx % 4 === 0 ? 'HIGH' : 'NORMAL') as any
    };
  })
];

// Priority Items
export const SEED_PRIORITY_ITEMS: PriorityItem[] = [
  {
    id: 'prio-01',
    entityType: 'BIN',
    entityId: 'bin-101',
    title: 'Smart Bin B-101 Critical Fill (96%)',
    location: 'Cyber Towers Quad A, Hitec City',
    priority: 'CRITICAL',
    score: 98,
    reason: 'Fill rate spiked +3.4x higher than standard Tuesday baseline. Overflow predicted in 14 minutes.',
    recommendedAction: 'Dispatch Truck T-01 on priority override sequence.',
    timeSensitivity: '< 15 mins',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-02',
    entityType: 'INCIDENT',
    entityId: 'inc-01',
    title: 'Illegal Dumping: Mixed Construction Debris',
    location: 'Service Lane near Cyber Gateway, Hitec City',
    priority: 'HIGH',
    score: 91,
    reason: 'AI CCTV Camera #14 verified volume ~1.4 tons. Located along high-density VIP arterial route.',
    recommendedAction: 'Assign Rapid Clean Squad #2 with loader attachment.',
    timeSensitivity: '< 45 mins',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-03',
    entityType: 'PICKUP',
    entityId: 'req-01',
    title: 'High-Value E-Waste Handover (14 kg)',
    location: 'Flat 402, Green Meadows, Cyber Hills',
    priority: 'MEDIUM',
    score: 78,
    reason: 'Contains lithium batteries and PCB boards. Citizen selected morning slot SLA.',
    recommendedAction: 'Verify OTP 7492 upon driver arrival and deliver to CircuitCycle Refinery.',
    timeSensitivity: 'Within Slot (10am-12pm)',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-04',
    entityType: 'BIN',
    entityId: 'bin-105',
    title: 'Smart Bin B-105 High Fill (94%)',
    location: 'Knowledge City Tower B, Hitec City',
    priority: 'HIGH',
    score: 88,
    reason: 'Continuous commercial paper inflow. Sensor battery healthy at 92%.',
    recommendedAction: 'Append to Route 01 manifest stop #2.',
    timeSensitivity: '< 30 mins',
    zone: 'Hitec City - Zone 1'
  }
];

// What-If Scenarios
export const SEED_SCENARIOS: WhatIfScenario[] = [
  {
    id: 'scen-1',
    name: 'Truck T-01 Hydraulic Failure',
    description: 'Simulates mechanical failure of primary heavy compactor T-01 in Hitec City during peak collection shift.',
    type: 'TRUCK_BREAKDOWN',
    severity: 'SEVERE',
    impacts: {
      vehiclesAffected: 3,
      pickupsDelayed: 12,
      additionalFuelLiters: 18.5,
      additionalTimeMin: 45,
      estimatedCostDeltaUSD: 140,
      mitigationStrategy: 'Dynamically partition stops between T-02 (E-Trike) and T-05 (RecycleVan). Re-route overflow bins to closest operational truck.'
    }
  },
  {
    id: 'scen-2',
    name: 'Cyber Towers Flyover Road Closure',
    description: 'Simulates sudden construction blockage on main arterial junction affecting Madhapur & Hitec City access.',
    type: 'ROAD_CLOSURE',
    severity: 'MODERATE',
    impacts: {
      vehiclesAffected: 4,
      pickupsDelayed: 8,
      additionalFuelLiters: 14.2,
      additionalTimeMin: 30,
      estimatedCostDeltaUSD: 95,
      mitigationStrategy: 'Reroute via Durgam Cheruvu cable bridge arterial corridor with adjusted waypoint sequencing.'
    }
  },
  {
    id: 'scen-3',
    name: 'HITEX Tech Expo Waste Surge (+250%)',
    description: 'Simulates massive 3-day convention producing 45 tons of packaging and food waste per day.',
    type: 'WASTE_SURGE',
    severity: 'SEVERE',
    impacts: {
      vehiclesAffected: 5,
      pickupsDelayed: 0,
      additionalFuelLiters: 32.0,
      additionalTimeMin: 60,
      estimatedCostDeltaUSD: 310,
      mitigationStrategy: 'Deploy 2 standby reserve electric haulers and establish temporary mobile weighbridge staging station.'
    }
  }
];

// Rewards Catalog
export const SEED_REWARDS: RewardItem[] = [
  {
    id: 'rew-01',
    name: 'Hyderabad Metro Green Commute Pass (1 Month)',
    pointsCost: 500,
    category: 'VOUCHER',
    description: 'Unlimited off-peak transit on Hyderabad Metro Blue & Red lines.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'rew-02',
    name: 'Plant 5 Urban Miyawaki Trees in Your Name',
    pointsCost: 350,
    category: 'PLANT_TREE',
    description: 'Municipal afforestation certificate with GPS coordinates of your planted saplings.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'rew-03',
    name: '5% Municipal Property Tax Green Rebate',
    pointsCost: 1000,
    category: 'TAX_REBATE',
    description: 'Direct credit voucher applied to GHMC municipal property tax assessment.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80'
  }
];

// Citizen Badges
export const SEED_BADGES: CitizenBadge[] = [
  {
    id: 'bdg-01',
    name: 'Segregation Master',
    icon: 'Sparkles',
    description: 'Achieved 95%+ purity across 10 consecutive doorstep pickups.',
    unlockedAt: '2026-08-14',
    progress: 100
  },
  {
    id: 'bdg-02',
    name: 'E-Waste Champion',
    icon: 'Zap',
    description: 'Diverted 25kg+ electronic hazardous hardware from municipal landfills.',
    unlockedAt: '2026-09-02',
    progress: 100
  },
  {
    id: 'bdg-03',
    name: 'Civic Watch Guardian',
    icon: 'Shield',
    description: 'Submitted 3 verified illegal dumping reports resolved by municipal crews.',
    progress: 66
  }
];

// Environmental Stats Baseline
export const INITIAL_ENV_STATS: EnvironmentalStats = {
  totalWasteCollectedTons: 14280.5,
  divertedFromLandfillTons: 11210.2,
  recyclingVolumeTons: 6420.0,
  compostGeneratedTons: 4180.0,
  eWasteRecoveredKg: 610200,
  co2ReductionTons: 18450.8,
  fuelSavedLiters: 42100,
  tripsAvoidedCount: 3840,
  equivalentTreesPlanted: 84200
};

// Audit Logs
export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    timestamp: '2026-09-27T08:00:00Z',
    userId: 'user-a1',
    userName: 'Dr. Vikramaditya Rao',
    role: 'admin',
    action: 'DISPATCH_OPTIMIZATION',
    entity: 'Master Route Dispatcher',
    ipAddress: '10.14.22.101',
    status: 'SUCCESS',
    details: 'Triggered city-wide dynamic vehicle re-routing across 8 zones.'
  },
  {
    id: 'aud-02',
    timestamp: '2026-09-27T07:15:00Z',
    userId: 'system',
    userName: 'AI CCTV Camera #14',
    role: 'admin',
    action: 'DETECT_ILLEGAL_DUMP',
    entity: 'INC-2026-4401',
    ipAddress: '10.14.88.14',
    status: 'ALERT',
    details: 'Commercial dumping detected on Hitec City flyover ramp.'
  },
  {
    id: 'aud-03',
    timestamp: '2026-09-27T06:30:00Z',
    userId: 'user-d1',
    userName: 'Ramesh Kumar',
    role: 'driver',
    action: 'DRIVER_SHIFT_START',
    entity: 'TS-09-WF-1001 (T-01)',
    ipAddress: '10.14.50.12',
    status: 'SUCCESS',
    details: 'Logged vehicle inspection pass & began morning route manifest.'
  }
];
