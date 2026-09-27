# WasteFlow — Autonomous Municipal Smart Waste Logistics Platform

WasteFlow is a full-stack, enterprise-grade smart-city municipal waste collection and circular recovery platform built with **React, TypeScript, Vite, Node.js, and Express**.

---

## 🚀 Key Capabilities

### 1. Citizen Experience (Mobile-First)
- **AI Waste Scanner**: Snap/upload items to identify categories, recyclability, and proper bin placement.
- **Smart Pickup Request**: Schedule doorstep collections with time-slots, photo proofs, and tamper-proof OTP codes.
- **Live GPS Tracking**: Real-time vehicle tracking with driver details and digital receipts.
- **Eco-Rewards & Badges**: Earn verifiable points for proper segregation and redeem for municipal tax/transit vouchers.
- **Illegal Dumping Reporter**: Report roadside dumps with GPS coordinates and photos for rapid squad dispatch.
- **Multilingual Support**: Available in English, Telugu, and Hindi.

### 2. Municipal Admin Command Center (Desktop Optimized)
- **Real-Time GIS Command Map**: Unified visualization of 52 smart bins, 10 fleet haulers, and citizen pickups.
- **Priority Detection Engine**: Automated urgency ranking based on fill rates, event surges, and SLA thresholds.
- **One-Click Route Optimization**: Multi-stop TSP vehicle manifest generation with distance and fuel savings.
- **What-If Contingency Sandbox**: Simulate truck breakdowns, road closures, traffic spikes, and waste surges.
- **Predictive Demand Intelligence**: Zone-wise daily/weekly forecast curves.
- **Municipal Analytics & Audit Logs**: Landfill diversion rates, carbon savings, and SOC-2 compliant audit trails.

### 3. Driver Portal (Mobile-First)
- **Turn-by-Turn Manifests**: Sequential stop order with dynamic ETAs and payload progress bars.
- **OTP / QR Verification**: Validate citizen collection on-site and instantly generate digital receipts.
- **Vehicle Telematics & Diagnostics**: Real-time battery/fuel monitoring, odometer, and vehicle health metrics.

### 4. Recycling Facility Terminal
- **Weighbridge Inflow Queue**: Real-time hauler manifest logging with payload weights and bay assignment.
- **Circular Mass Balance Accounting**: Monitor throughput across MRF sorting lines, composting digesters, biogas output, and e-waste refining.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Leaflet / React-Leaflet, Recharts.
- **Backend**: Node.js, Express, TypeScript, Zod, bcryptjs, jsonwebtoken, cors, helmet, morgan.
- **Database**: In-Memory Structured Mock Database with seed data (`mockDb.ts`).
- **No External Database Required**: No PostgreSQL, MongoDB, Prisma, Docker, or Supabase needed.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Seed Mock Database
npm run seed

# 3. Start Backend Server (Port 4000)
npm run dev:backend

# 4. Start Frontend Application (Port 5173)
npm run dev:frontend
```

---

## 👥 Demo Accounts

| Persona | Email | Password |
|---|---|---|
| **Citizen** | `citizen@wasteflow.in` | `Citizen@123` |
| **Municipal Admin** | `admin@wasteflow.gov.in` | `Admin@123` |
| **Driver** | `driver@wasteflow-fleet.in` | `Driver@123` |
| **Facility Manager** | `facility@greentech.org` | `Facility@123` |

---

## 🏷️ Honest Demo Transparency Labels
All simulated systems in this hackathon prototype are explicitly labeled:
- `AI DEMO` (Deterministic waste classifier)
- `SIMULATED TELEMETRY` (IoT ultrasonic bin fill & vehicle telematics)
- `DEMO DATA` (Pre-seeded municipal datasets)
- `ESTIMATED PREDICTION` (Zone forecast models)
- `ESTIMATED IMPACT` (CO2 avoidance & landfill diversion calculations)
