import {
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
  User
} from '../types';

// Centered around a smart tech metropolis (Hyderabad metro area: 17.44° N, 78.38° E)
export const CITY_CENTER = { lat: 17.4399, lng: 78.3850, name: 'Hyderabad Smart City Corridor' };

export const MOCK_USERS: User[] = [
  {
    id: 'user-c1',
    name: 'Ananya Sharma',
    email: 'citizen@wasteflow.gov',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 12345',
    address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
    zone: 'Hitec City - Zone 1',
    points: 1240,
    badge: 'Eco Champion',
    level: 4
  },
  {
    id: 'user-c1-alt',
    name: 'Ananya Sharma',
    email: 'citizen@wasteflow.in',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 12345',
    address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
    zone: 'Hitec City - Zone 1',
    points: 1240,
    badge: 'Eco Champion',
    level: 4
  },
  {
    id: 'user-a1',
    name: 'Dr. Vikramaditya Rao',
    email: 'admin@wasteflow.gov',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 99999',
    address: 'Municipal Command Operations Wing, Floor 6',
    zone: 'Metropolitan HQ'
  },
  {
    id: 'user-a1-alt',
    name: 'Dr. Vikramaditya Rao',
    email: 'admin@wasteflow.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 99999',
    address: 'Municipal Command Operations Wing, Floor 6',
    zone: 'Metropolitan HQ'
  },
  {
    id: 'user-d1',
    name: 'Ramesh Kumar',
    email: 'driver@wasteflow.gov',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 54321',
    address: 'Depot 3, Gachibowli Logistics Park',
    zone: 'Gachibowli - Zone 2'
  },
  {
    id: 'user-d1-alt',
    name: 'Ramesh Kumar',
    email: 'driver@wasteflow-fleet.in',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 54321',
    address: 'Depot 3, Gachibowli Logistics Park',
    zone: 'Gachibowli - Zone 2'
  },
  {
    id: 'user-f1',
    name: 'GreenTech Bio-Circular Hub',
    email: 'facility@wasteflow.gov',
    role: 'facility',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 77777',
    address: 'Circular Economy Industrial Park, ORR Exit 7',
    zone: 'Industrial Eco-Zone'
  },
  {
    id: 'user-f1-alt',
    name: 'GreenTech Bio-Circular Hub',
    email: 'facility@greentech.org',
    role: 'facility',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98490 77777',
    address: 'Circular Economy Industrial Park, ORR Exit 7',
    zone: 'Industrial Eco-Zone'
  }
];

export const ZONES = [
  'Hitec City - Zone 1',
  'Gachibowli - Zone 2',
  'Madhapur - Zone 3',
  'Jubilee Hills - Zone 4',
  'Banjara Hills - Zone 5',
  'Kukatpally - Zone 6',
  'Financial District - Zone 7',
  'Secunderabad - Zone 8'
];

// Generate 52 smart bins with realistic telemetry
const BASE_BIN_DATA = [
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

export const MOCK_BINS: SmartBin[] = Array.from({ length: 52 }, (_, i) => {
  const base = BASE_BIN_DATA[i % BASE_BIN_DATA.length];
  const offsetLat = (Math.sin(i * 1.7) * 0.022);
  const offsetLng = (Math.cos(i * 2.3) * 0.025);
  
  // Create realistic varied fill levels with 6 critical and 12 high
  let fill = Math.floor(25 + ((i * 19) % 73));
  if (i === 0 || i === 4 || i === 15 || i === 28 || i === 41 || i === 48) fill = 94 + (i % 6);
  if (i % 4 === 1 && fill < 78) fill = 82;
  
  let status: SmartBin['status'] = 'NORMAL';
  if (fill >= 90) status = 'CRITICAL';
  else if (fill >= 75) status = 'HIGH';
  else if (fill >= 50) status = 'FILLING';
  if (i === 37) status = 'OFFLINE';

  const predMinutes = status === 'CRITICAL' ? Math.floor(15 + Math.random() * 30) : Math.floor(120 + Math.random() * 400);

  return {
    id: `bin-${i + 101}`,
    code: `BIN-${(i + 101).toString().padStart(3, '0')}`,
    name: `${base.name} #${((i % 5) + 1)}`,
    location: {
      lat: Number((base.lat + offsetLat).toFixed(5)),
      lng: Number((base.lng + offsetLng).toFixed(5)),
      address: `${base.name}, ${base.zone}`,
      zone: base.zone,
      ward: base.ward
    },
    category: base.cat,
    capacityLiters: 1100,
    currentFillLevel: status === 'OFFLINE' ? 40 : fill,
    fillWeightKg: Math.round(fill * 4.2),
    temperatureCelsius: Number((26 + (Math.sin(i) * 6)).toFixed(1)),
    batteryLevel: status === 'OFFLINE' ? 4 : Math.max(18, Math.floor(98 - (i * 1.5) % 80)),
    sensorStatus: status === 'OFFLINE' ? 'OFFLINE' : (fill > 90 ? 'WARNING' : 'HEALTHY'),
    lastCommunication: `${Math.floor(1 + (i % 8))}m ago`,
    lastCollectionTime: `${Math.floor(4 + (i % 20))}h ago`,
    predictedOverflowMinutes: predMinutes,
    status,
    trend: fill > 85 ? 'rising_fast' : (fill > 60 ? 'rising_slow' : 'stable'),
    tiltAngle: Number((Math.random() * 2.5).toFixed(1)),
    odorIndex: Math.min(100, Math.floor(fill * 0.95))
  };
});

// 10+ Collection Vehicles with rich telemetry
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    plateNumber: 'TS-09-WF-1001',
    name: 'EcoCompactor Alpha (T-01)',
    type: 'Heavy Compactor',
    capacityKg: 6500,
    currentLoadKg: 4620,
    fuelBatteryLevel: 82,
    fuelType: 'CNG',
    status: 'ON_ROUTE',
    driverId: 'user-d1',
    driverName: 'Ramesh Kumar',
    currentLocation: { lat: 17.4470, lng: 78.3780 },
    heading: 65,
    assignedZone: 'Hitec City - Zone 1',
    mileageKm: 34210,
    healthScore: 94,
    routeId: 'route-active-1'
  },
  {
    id: 'veh-02',
    plateNumber: 'TS-09-WF-1002',
    name: 'ElectroHauler Beta (T-02)',
    type: 'Compact Compactor',
    capacityKg: 4000,
    currentLoadKg: 2100,
    fuelBatteryLevel: 74,
    fuelType: 'Electric',
    status: 'COLLECTING',
    driverId: 'drv-02',
    driverName: 'Suresh Babu',
    currentLocation: { lat: 17.4320, lng: 78.3890 },
    heading: 140,
    assignedZone: 'Madhapur - Zone 3',
    mileageKm: 18500,
    healthScore: 91
  },
  {
    id: 'veh-03',
    plateNumber: 'TS-09-WF-1003',
    name: 'GreenTransit Gamma (T-03)',
    type: 'Heavy Compactor',
    capacityKg: 7000,
    currentLoadKg: 5980,
    fuelBatteryLevel: 45,
    fuelType: 'CNG',
    status: 'ON_ROUTE',
    driverId: 'drv-03',
    driverName: 'Mohd. Farooq',
    currentLocation: { lat: 17.4410, lng: 78.3520 },
    heading: 210,
    assignedZone: 'Gachibowli - Zone 2',
    mileageKm: 42100,
    healthScore: 86,
    maintenanceAlert: 'Tire Pressure Sensor Warning in Rear Axle'
  },
  {
    id: 'veh-04',
    plateNumber: 'TS-09-WF-1004',
    name: 'HazardGuard Delta (T-04)',
    type: 'Hazardous Transport',
    capacityKg: 2500,
    currentLoadKg: 720,
    fuelBatteryLevel: 88,
    fuelType: 'Electric',
    status: 'IDLE',
    driverId: 'drv-04',
    driverName: 'Venkat Reddy',
    currentLocation: { lat: 17.4210, lng: 78.4310 },
    heading: 0,
    assignedZone: 'Banjara Hills - Zone 5',
    mileageKm: 12400,
    healthScore: 98
  },
  {
    id: 'veh-05',
    plateNumber: 'TS-09-WF-1005',
    name: 'BioRunner Epsilon (T-05)',
    type: 'Compact Compactor',
    capacityKg: 4500,
    currentLoadKg: 3400,
    fuelBatteryLevel: 61,
    fuelType: 'CNG',
    status: 'ON_ROUTE',
    driverId: 'drv-05',
    driverName: 'Kishore Goud',
    currentLocation: { lat: 17.4310, lng: 78.4080 },
    heading: 290,
    assignedZone: 'Jubilee Hills - Zone 4',
    mileageKm: 27900,
    healthScore: 89
  },
  {
    id: 'veh-06',
    plateNumber: 'TS-09-WF-1006',
    name: 'RecycleVan Zeta (T-06)',
    type: 'Recyclables Van',
    capacityKg: 3200,
    currentLoadKg: 1840,
    fuelBatteryLevel: 92,
    fuelType: 'Electric',
    status: 'COLLECTING',
    driverId: 'drv-06',
    driverName: 'Anil Kumar',
    currentLocation: { lat: 17.4890, lng: 78.3940 },
    heading: 110,
    assignedZone: 'Kukatpally - Zone 6',
    mileageKm: 9800,
    healthScore: 96
  },
  {
    id: 'veh-07',
    plateNumber: 'TS-09-WF-1007',
    name: 'EcoCompactor Theta (T-07)',
    type: 'Heavy Compactor',
    capacityKg: 6500,
    currentLoadKg: 5800,
    fuelBatteryLevel: 31,
    fuelType: 'Diesel',
    status: 'ON_ROUTE',
    driverId: 'drv-07',
    driverName: 'Prashanth Nair',
    currentLocation: { lat: 17.4170, lng: 78.3450 },
    heading: 180,
    assignedZone: 'Financial District - Zone 7',
    mileageKm: 51200,
    healthScore: 78,
    maintenanceAlert: 'Hydraulic Compactor Filter Replacement Due in 48h'
  },
  {
    id: 'veh-08',
    plateNumber: 'TS-09-WF-1008',
    name: 'CleanCity Iota (T-08)',
    type: 'E-Trike Collector',
    capacityKg: 1200,
    currentLoadKg: 850,
    fuelBatteryLevel: 58,
    fuelType: 'Electric',
    status: 'COLLECTING',
    driverId: 'drv-08',
    driverName: 'M. Santosh',
    currentLocation: { lat: 17.4380, lng: 78.4920 },
    heading: 45,
    assignedZone: 'Secunderabad - Zone 8',
    mileageKm: 7400,
    healthScore: 95
  },
  {
    id: 'veh-09',
    plateNumber: 'TS-09-WF-1009',
    name: 'RapidRescue Kappa (T-09)',
    type: 'Compact Compactor',
    capacityKg: 3800,
    currentLoadKg: 0,
    fuelBatteryLevel: 100,
    fuelType: 'Electric',
    status: 'IDLE',
    driverId: 'drv-09',
    driverName: 'G. Raju',
    currentLocation: { lat: 17.4450, lng: 78.3790 },
    heading: 0,
    assignedZone: 'Hitec City - Zone 1',
    mileageKm: 14100,
    healthScore: 99
  },
  {
    id: 'veh-10',
    plateNumber: 'TS-09-WF-1010',
    name: 'HeavyRecovery Lambda (T-10)',
    type: 'Heavy Compactor',
    capacityKg: 7500,
    currentLoadKg: 0,
    fuelBatteryLevel: 15,
    fuelType: 'CNG',
    status: 'MAINTENANCE',
    driverId: 'drv-10',
    driverName: 'Depot Mechanic Crew',
    currentLocation: { lat: 17.4390, lng: 78.3650 },
    heading: 0,
    assignedZone: 'Gachibowli - Zone 2',
    mileageKm: 68400,
    healthScore: 62,
    maintenanceAlert: 'Alternator Diagnostic Check in Progress'
  }
];

// 30+ Pickup requests across various workflow stages
export const MOCK_PICKUP_REQUESTS: PickupRequest[] = [
  {
    id: 'req-01',
    requestNumber: 'REQ-2026-8801',
    citizenId: 'user-c1',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    category: 'E-Waste',
    estimatedWeightKg: 14,
    itemCount: 4,
    location: {
      lat: 17.4490,
      lng: 78.3830,
      address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
      zone: 'Hitec City - Zone 1'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '10:00 AM - 12:00 PM',
    notes: '2 old laptops, 1 tablet, and assorted charger cables for safe recycling.',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80',
    status: 'DRIVER_EN_ROUTE',
    createdAt: '2026-09-26T09:15:00Z',
    updatedAt: '2026-09-26T14:30:00Z',
    assignedVehicleId: 'veh-01',
    assignedDriverName: 'Ramesh Kumar',
    verificationOtp: '7492',
    verificationQrCode: 'WF-VERIFY-REQ-8801-OTP7492',
    pointsEarned: 150,
    co2SavedKg: 18.5
  },
  {
    id: 'req-02',
    requestNumber: 'REQ-2026-8802',
    citizenId: 'c-102',
    citizenName: 'Deepak Varma',
    citizenPhone: '+91 98490 22334',
    category: 'Dry',
    estimatedWeightKg: 35,
    itemCount: 6,
    location: {
      lat: 17.4335,
      lng: 78.3882,
      address: 'Plot 88, Silicon Valley Enclave, Madhapur',
      zone: 'Madhapur - Zone 3'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '02:00 PM - 04:00 PM',
    notes: 'Bulk corrugated cardboard packing boxes and bubble wraps.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=80',
    status: 'ASSIGNED',
    createdAt: '2026-09-26T10:30:00Z',
    updatedAt: '2026-09-26T11:00:00Z',
    assignedVehicleId: 'veh-02',
    assignedDriverName: 'Suresh Babu',
    verificationOtp: '3819',
    verificationQrCode: 'WF-VERIFY-REQ-8802-OTP3819',
    pointsEarned: 85
  },
  {
    id: 'req-03',
    requestNumber: 'REQ-2026-8803',
    citizenId: 'c-103',
    citizenName: 'Pooja Hegde',
    citizenPhone: '+91 98490 33445',
    category: 'Plastic',
    estimatedWeightKg: 20,
    location: {
      lat: 17.4475,
      lng: 78.3510,
      address: 'Villa 12, Boulder Hills Golf Residences, Gachibowli',
      zone: 'Gachibowli - Zone 2'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '08:00 AM - 10:00 AM',
    notes: 'Segregated HDPE plastic containers and PET water bottles.',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80',
    status: 'ARRIVED',
    createdAt: '2026-09-26T11:45:00Z',
    updatedAt: '2026-09-26T15:10:00Z',
    assignedVehicleId: 'veh-03',
    assignedDriverName: 'Mohd. Farooq',
    verificationOtp: '9124',
    verificationQrCode: 'WF-VERIFY-REQ-8803-OTP9124',
    pointsEarned: 110
  },
  {
    id: 'req-04',
    requestNumber: 'REQ-2026-8804',
    citizenId: 'c-104',
    citizenName: 'Dr. Arjun Roy',
    citizenPhone: '+91 98490 44556',
    category: 'Hazardous',
    estimatedWeightKg: 8,
    location: {
      lat: 17.4205,
      lng: 78.4340,
      address: 'Banjara Heights Apt 3B, Road No 10, Banjara Hills',
      zone: 'Banjara Hills - Zone 5'
    },
    preferredDate: '2026-09-28',
    preferredTimeSlot: '11:00 AM - 01:00 PM',
    notes: 'Expired home pharmaceuticals and leftover solvent paint containers.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    status: 'REQUESTED',
    createdAt: '2026-09-26T13:20:00Z',
    updatedAt: '2026-09-26T13:20:00Z',
    verificationOtp: '5561',
    verificationQrCode: 'WF-VERIFY-REQ-8804-OTP5561'
  },
  {
    id: 'req-05',
    requestNumber: 'REQ-2026-8805',
    citizenId: 'user-c1',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    category: 'Glass',
    estimatedWeightKg: 18,
    location: {
      lat: 17.4490,
      lng: 78.3830,
      address: 'Flat 402, Green Meadows, Cyber Hills, Hitec City',
      zone: 'Hitec City - Zone 1'
    },
    preferredDate: '2026-09-25',
    preferredTimeSlot: '04:00 PM - 06:00 PM',
    notes: 'Assorted cleaned glass jars and beverage bottles.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80',
    status: 'COMPLETED',
    createdAt: '2026-09-25T08:00:00Z',
    updatedAt: '2026-09-25T17:40:00Z',
    assignedVehicleId: 'veh-01',
    assignedDriverName: 'Ramesh Kumar',
    verificationOtp: '8240',
    verificationQrCode: 'WF-VERIFY-REQ-8805-OTP8240',
    collectedAt: '2026-09-25T17:35:00Z',
    collectedWeightKg: 19.2,
    pointsEarned: 95,
    co2SavedKg: 14.8
  },
  {
    id: 'req-06',
    requestNumber: 'REQ-2026-8806',
    citizenId: 'c-106',
    citizenName: 'K. S. Narayanan',
    citizenPhone: '+91 98490 55667',
    category: 'Wet',
    estimatedWeightKg: 60,
    location: {
      lat: 17.4330,
      lng: 78.4050,
      address: 'Community Kitchen, Road No 36, Jubilee Hills',
      zone: 'Jubilee Hills - Zone 4'
    },
    preferredDate: '2026-09-27',
    preferredTimeSlot: '07:00 AM - 09:00 AM',
    notes: 'Segregated organic vegetable scraps and food prep peelings for composting.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
    status: 'APPROVED',
    createdAt: '2026-09-26T12:00:00Z',
    updatedAt: '2026-09-26T13:00:00Z',
    verificationOtp: '4419',
    verificationQrCode: 'WF-VERIFY-REQ-8806-OTP4419',
    pointsEarned: 130
  }
];

// 4 Major Recycling & Recovery Facilities
export const MOCK_FACILITIES: Facility[] = [
  {
    id: 'fac-01',
    name: 'GreenTech Material Recovery Facility (MRF)',
    type: 'Material Recovery (MRF)',
    location: {
      lat: 17.4620,
      lng: 78.3650,
      address: 'Plot 104, Eco-Tech Zone, ORR Exit 6, Madhapur',
      zone: 'Madhapur - Zone 3'
    },
    acceptedCategories: ['Dry', 'Plastic', 'Paper', 'Glass', 'Metal'],
    totalCapacityTonsDay: 180,
    currentProcessingTonsDay: 134,
    recycledOutputTonsMonth: 3420,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'Srinivas Murthy',
    contactPhone: '+91 98490 11223',
    efficiencyScore: 96
  },
  {
    id: 'fac-02',
    name: 'Bio-Urja Methanation & Compost Park',
    type: 'Compost & Bio-Methanation',
    location: {
      lat: 17.4050,
      lng: 78.3300,
      address: 'ORR Outer Agro Loop, Financial District Ext.',
      zone: 'Financial District - Zone 7'
    },
    acceptedCategories: ['Wet'],
    totalCapacityTonsDay: 250,
    currentProcessingTonsDay: 215,
    recycledOutputTonsMonth: 4800,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'Dr. Radhika Sen',
    contactPhone: '+91 98490 33221',
    efficiencyScore: 92
  },
  {
    id: 'fac-03',
    name: 'CircuitCycle E-Waste Refinery',
    type: 'E-Waste Refining',
    location: {
      lat: 17.4950,
      lng: 78.4050,
      address: 'Electronic Complex Road, Phase 2, Kukatpally',
      zone: 'Kukatpally - Zone 6'
    },
    acceptedCategories: ['E-Waste', 'Metal'],
    totalCapacityTonsDay: 45,
    currentProcessingTonsDay: 39,
    recycledOutputTonsMonth: 780,
    operationalStatus: 'HIGH_CAPACITY',
    contactPerson: 'Aditya Mehta',
    contactPhone: '+91 98490 44332',
    efficiencyScore: 94
  },
  {
    id: 'fac-04',
    name: 'SafeHazard Neutralization & Pyrolysis Center',
    type: 'Refuse Derived Fuel (RDF)',
    location: {
      lat: 17.4520,
      lng: 78.5120,
      address: 'Special Chemical Processing Terminal, Secunderabad',
      zone: 'Secunderabad - Zone 8'
    },
    acceptedCategories: ['Hazardous', 'Mixed', 'Plastic'],
    totalCapacityTonsDay: 120,
    currentProcessingTonsDay: 88,
    recycledOutputTonsMonth: 2100,
    operationalStatus: 'OPERATIONAL',
    contactPerson: 'T. R. Chandran',
    contactPhone: '+91 98490 88990',
    efficiencyScore: 88
  }
];

// Incidents & Illegal Dumping Reports
export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-01',
    incidentNumber: 'INC-2026-4401',
    type: 'Illegal Dumping',
    reportedBy: 'AI Smart Patrol Camera #14',
    reporterType: 'AI_CAMERA',
    location: {
      lat: 17.4385,
      lng: 78.3710,
      address: 'Vacant Plot beside Hitec City Flyover Ramp',
      zone: 'Hitec City - Zone 1'
    },
    category: 'Mixed',
    severity: 'CRITICAL',
    status: 'ASSIGNED',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
    description: 'Commercial debris and unsegregated polythene dump detected by computer vision camera feed. Repeat location score 92%.',
    aiDetectionConfidence: 96.4,
    reportedAt: '2026-09-26T08:14:00Z',
    assignedCrew: 'Rapid Clean Squad #2 (T-09)',
    repeatHotspot: true,
    repeatIncidentCount: 4
  },
  {
    id: 'inc-02',
    incidentNumber: 'INC-2026-4402',
    type: 'Bin Overflow',
    reportedBy: 'IoT Ultrasonic Sensor (BIN-101)',
    reporterType: 'IOT_SENSOR',
    location: {
      lat: 17.4504,
      lng: 78.3808,
      address: 'Cyber Towers Quad A, Hitec City - Zone 1',
      zone: 'Hitec City - Zone 1'
    },
    category: 'Plastic',
    severity: 'CRITICAL',
    status: 'CLEANING',
    imageUrl: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=600&auto=format&fit=crop&q=80',
    description: 'Ultrasonic fill sensor triggered 98% capacity with spillover risk. Dispatched high-priority compactor.',
    reportedAt: '2026-09-26T13:40:00Z',
    assignedCrew: 'EcoCompactor Alpha (T-01)',
    repeatHotspot: false
  },
  {
    id: 'inc-03',
    incidentNumber: 'INC-2026-4403',
    type: 'Illegal Dumping',
    reportedBy: 'Ananya Sharma (Citizen)',
    reporterType: 'CITIZEN',
    location: {
      lat: 17.4290,
      lng: 78.3940,
      address: 'Rear drainage canal trail, Durgam Cheruvu, Madhapur',
      zone: 'Madhapur - Zone 3'
    },
    category: 'Plastic',
    severity: 'HIGH',
    status: 'UNDER_REVIEW',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
    description: 'Multiple single-use plastic sacks and thermocol packaging dumped along lake perimeter.',
    aiDetectionConfidence: 89.2,
    reportedAt: '2026-09-26T14:22:00Z',
    repeatHotspot: true,
    repeatIncidentCount: 2
  }
];

// AI Priority Items
export const MOCK_PRIORITY_ITEMS: PriorityItem[] = [
  {
    id: 'prio-1',
    entityType: 'BIN',
    entityId: 'bin-101',
    title: 'Critical Plastic Overflow at Cyber Towers Quad A',
    location: 'Hitec City - Zone 1 (Cyber Towers)',
    priority: 'CRITICAL',
    score: 98,
    reason: 'Fill level reached 98% with rapid fill rate (18% / hour) during peak lunch rush. High pedestrian footprint.',
    recommendedAction: 'Dispatch T-01 on immediate override route within 25 minutes.',
    timeSensitivity: '< 30 mins',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-2',
    entityType: 'INCIDENT',
    entityId: 'inc-01',
    title: 'Commercial Debris Dumping Hotspot #4',
    location: 'Hitec City Flyover Ramp',
    priority: 'CRITICAL',
    score: 94,
    reason: 'AI CCTV detected active unauthorized unloading of 1.2 tons mixed construction/polythene debris.',
    recommendedAction: 'Dispatch Rapid Squad T-09 and issue municipal environmental compliance citation.',
    timeSensitivity: '< 45 mins',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-3',
    entityType: 'BIN',
    entityId: 'bin-105',
    title: 'Paper Bin Rapid Fill Surge at Knowledge City',
    location: 'Knowledge City Tower B',
    priority: 'HIGH',
    score: 87,
    reason: 'Corporate archiving cycle dump. Sensor predicts overflow in 42 minutes.',
    recommendedAction: 'Queue for next stop sequence on T-01 dispatch plan.',
    timeSensitivity: '< 1 hour',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-4',
    entityType: 'PICKUP',
    entityId: 'req-01',
    title: 'High-Value E-Waste Collection (Ananya Sharma)',
    location: 'Cyber Hills, Hitec City',
    priority: 'HIGH',
    score: 82,
    reason: 'Citizen verified appointment slot expiring in 45 mins. Contains lithium-battery hardware.',
    recommendedAction: 'Driver T-01 ETA 12 mins via route stop 3.',
    timeSensitivity: '< 1.5 hours',
    zone: 'Hitec City - Zone 1'
  },
  {
    id: 'prio-5',
    entityType: 'EVENT',
    entityId: 'evt-01',
    title: 'Evening Tech Expo Waste Surge Warning',
    location: 'HITEX Exhibition Center, Madhapur',
    priority: 'MEDIUM',
    score: 68,
    reason: 'Predictive algorithm anticipates 3.4x organic and PET bottle volume between 17:00 and 21:00.',
    recommendedAction: 'Pre-position ElectroHauler T-02 nearby.',
    timeSensitivity: 'By 16:30',
    zone: 'Madhapur - Zone 3'
  }
];

// What-If Scenarios
export const MOCK_WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    id: 'scen-1',
    name: 'Truck T-01 Mechanical Breakdown in Zone 1',
    description: 'Simulates primary compactor T-01 transmission failure while carrying 4.6 tons of critical load in peak traffic.',
    type: 'TRUCK_BREAKDOWN',
    severity: 'SEVERE',
    impacts: {
      vehiclesAffected: 3,
      pickupsDelayed: 9,
      additionalFuelLiters: 18.5,
      additionalTimeMin: 42,
      estimatedCostDeltaUSD: 145,
      mitigationStrategy: 'Dynamic auto-partition: Split remaining 14 stops between T-09 (idle backup) and T-02. Re-sequence to preserve SLA.'
    }
  },
  {
    id: 'scen-2',
    name: 'Main Arterial Road Closure (HITEC Main Flyover)',
    description: 'Simulates flash repair shutdown of key connector linking Zone 1 and Zone 3.',
    type: 'ROAD_CLOSURE',
    severity: 'MODERATE',
    impacts: {
      vehiclesAffected: 4,
      pickupsDelayed: 6,
      additionalFuelLiters: 24.0,
      additionalTimeMin: 35,
      estimatedCostDeltaUSD: 110,
      mitigationStrategy: 'Reroute via Outer Ring Road service arterial. Switch stop order to north-first sequence.'
    }
  },
  {
    id: 'scen-3',
    name: 'Sudden Weekend Commercial Surge (+65% Waste Volume)',
    description: 'Simulates simultaneous surge across 28 restaurant and mall cluster bins.',
    type: 'WASTE_SURGE',
    severity: 'SEVERE',
    impacts: {
      vehiclesAffected: 5,
      pickupsDelayed: 12,
      additionalFuelLiters: 48.0,
      additionalTimeMin: 85,
      estimatedCostDeltaUSD: 290,
      mitigationStrategy: 'Mobilize reserve electric fleet T-09, initiate mid-shift MRF weighbridge drop-off.'
    }
  },
  {
    id: 'scen-4',
    name: 'Bio-Urja Methanation Facility Outage',
    description: 'Simulates unplanned 8-hour bio-reactor maintenance lock at main compost facility.',
    type: 'FACILITY_OUTAGE',
    severity: 'MODERATE',
    impacts: {
      vehiclesAffected: 2,
      pickupsDelayed: 4,
      additionalFuelLiters: 32.0,
      additionalTimeMin: 50,
      estimatedCostDeltaUSD: 180,
      mitigationStrategy: 'Divert wet waste haulers to secondary MRF buffer silo in Industrial Zone 6.'
    }
  }
];

// Citizen Rewards & Gamification
export const MOCK_REWARDS: RewardItem[] = [
  {
    id: 'rew-01',
    name: 'Smart Metro Pass ₹250 Discount Voucher',
    pointsCost: 450,
    category: 'VOUCHER',
    description: 'Get ₹250 loaded to your Hyderabad Metro Smart Card or digital transit wallet.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'rew-02',
    name: 'Plant 2 Native Shade Trees in Urban Corridor',
    pointsCost: 600,
    category: 'PLANT_TREE',
    description: 'Municipal forestry will plant & geo-tag 2 neem/peepal saplings in your name.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'rew-03',
    name: '10% Municipal Property Tax Green Rebate',
    pointsCost: 1500,
    category: 'TAX_REBATE',
    description: 'Official municipal credit voucher applied directly to annual residential property assessment.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'rew-04',
    name: 'Organic Farm Fresh Grocery Box (5kg)',
    pointsCost: 750,
    category: 'COMMUNITY',
    description: 'Curated box of pesticide-free vegetables grown using municipal compost.',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&auto=format&fit=crop&q=80'
  }
];

export const MOCK_BADGES: CitizenBadge[] = [
  {
    id: 'badge-1',
    name: 'Segregation Master',
    icon: '✨',
    description: 'Completed 20 verified pickups with 100% proper segregation accuracy.',
    unlockedAt: '2026-08-14',
    progress: 100
  },
  {
    id: 'badge-2',
    name: 'E-Waste Guardian',
    icon: '⚡',
    description: 'Diverted 25kg+ electronic toxic components safely from landfills.',
    unlockedAt: '2026-09-02',
    progress: 100
  },
  {
    id: 'badge-3',
    name: 'Community Watchdog',
    icon: '🛡️',
    description: 'Reported 3 verified illegal dumping sites leading to immediate municipal resolution.',
    unlockedAt: '2026-09-20',
    progress: 100
  },
  {
    id: 'badge-4',
    name: 'Zero Waste Champion',
    icon: '👑',
    description: 'Achieve 90%+ recycling rate for 3 consecutive months.',
    progress: 85
  }
];

// Municipal Overall Environmental Stats
export const INITIAL_ENV_STATS: EnvironmentalStats = {
  totalWasteCollectedTons: 14280,
  divertedFromLandfillTons: 11210,
  recyclingVolumeTons: 6420,
  compostGeneratedTons: 4180,
  eWasteRecoveredKg: 610000,
  co2ReductionTons: 8940,
  fuelSavedLiters: 114500,
  tripsAvoidedCount: 3890,
  equivalentTreesPlanted: 142500
};

// Audit logs
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    timestamp: '2026-09-26T14:45:12Z',
    userId: 'user-a1',
    userName: 'Dr. Vikramaditya Rao',
    role: 'admin',
    action: 'DISPATCH_OPTIMIZATION',
    entity: 'Zone 1 & 2 Route Matrix',
    ipAddress: '10.14.22.101',
    status: 'SUCCESS',
    details: 'Triggered AI dynamic re-sequencing; reduced 28.4km total fleet travel.'
  },
  {
    id: 'aud-02',
    timestamp: '2026-09-26T14:30:05Z',
    userId: 'user-d1',
    userName: 'Ramesh Kumar',
    role: 'driver',
    action: 'OTP_VERIFICATION_SUCCESS',
    entity: 'REQ-2026-8805',
    ipAddress: '172.16.4.88 (Mobile 5G)',
    status: 'SUCCESS',
    details: 'Verified collection OTP 8240 for 19.2kg Glass from Ananya Sharma.'
  },
  {
    id: 'aud-03',
    timestamp: '2026-09-26T13:40:22Z',
    userId: 'system-iot-daemon',
    userName: 'IoT Sensor Gateway',
    role: 'admin',
    action: 'CRITICAL_OVERFLOW_ALERT',
    entity: 'BIN-101 (Cyber Towers)',
    ipAddress: '10.200.4.15',
    status: 'ALERT',
    details: 'Ultrasonic sensor threshold 95% breached (98.4%). Created Priority Ticket prio-1.'
  }
];
