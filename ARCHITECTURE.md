# WasteFlow Architecture & System Design

## 1. Overview
WasteFlow is a smart-city municipal waste management platform engineered for end-to-end autonomous collection logistics, citizen engagement, IoT smart bin monitoring, route optimization, and circular material recovery.

---

## 2. Full-Stack Layered Architecture

```
                                    CITIZEN / ADMIN / DRIVER / FACILITY CLIENTS
                                                       │
                                                       ▼
                                    React 18 + TypeScript + TailwindCSS (Vite)
                                                       │
                                   ┌───────────────────┴───────────────────┐
                                   ▼                                       ▼
                       AppStateContext / AuthContext              Dedicated API Layer
                                                               (src/services/api/*)
                                                                           │
                                                                           ▼
                                                             REST APIs / JSON Payloads
                                                                           │
                                                                           ▼
═════════════════════════════════════════════════════════════════════════════════════════════════════════
BACKEND SERVICES (Node.js + Express + TypeScript)
═════════════════════════════════════════════════════════════════════════════════════════════════════════
   Middleware: JWT Auth • Role-Based Access Control • Zod Validation • Helmet & CORS • Centralized Errors
                                                       │
                                                       ▼
   Controllers: Auth • User • Pickup • Bin • Vehicle • Route • Scenario • Facility • Report • Reward • AI
                                                       │
                                                       ▼
   Services: Business Logic • TSP Routing • Capacity Balancing • Telemetry Rules • Verification Tokens
                                                       │
                                                       ▼
   Repositories: UserRepo • PickupRepo • BinRepo • VehicleRepo • RouteRepo • FacilityRepo • ReportRepo ...
                                                       │
                                                       ▼
   Database: In-Memory Mock Database Engine (mockDb.ts & seedData.ts)
```

---

## 3. Core Workflow

```
1. CITIZEN
   └─ Snap/Upload photo -> AI Waste Classifier categorizes (E-Waste, Plastic, etc.)
   └─ Books doorstep pickup request (Date/Time Slot) -> Receives OTP Token

2. MUNICIPAL ADMIN
   └─ Ingestion Queue & GIS Command Map reflect new request + Smart Bin fill levels
   └─ AI Priority Engine dynamically calculates urgency score (0-100) with explainability
   └─ Master Route Optimization computes optimal multi-stop vehicle manifests

3. DRIVER
   └─ Receives assigned manifest on mobile dashboard with live turn-by-turn stop sequence
   └─ Arrives at stop -> Enters/scans Citizen OTP
   └─ Backend verifies OTP token -> Burns token -> Issues digital collection receipt

4. RECYCLING FACILITY
   └─ Inbound hauler weighbridge manifest logs payload
   └─ Allocates processing across MRF sorting, Bio-Methanation, E-Waste Refining
   └─ Circular mass balance flow tracks diverted landfill tonnage and avoided emissions
```

---

## 4. Key Design Decisions

### Mock Database Architecture
- **In-Memory Store (`mockDb.ts`)**: Fast, persistent throughout application runtime, zero SQL/MongoDB/Docker dependencies.
- **Repository Pattern**: All database interactions are encapsulated behind standard repositories (`findById`, `findMany`, `create`, `update`, `delete`), ensuring clean decoupling.
- **Data Seeding (`seedData.ts` & `npm run seed`)**: Pre-populated with 27 users across 4 roles, 10 vehicles, 52 smart bins, 30 pickups, 10 facilities, reports, and notifications.

### Authentication & Authorization
- **Bcrypt Password Hashing**: Passwords stored as salted bcrypt hashes.
- **JWT Tokens**: Stateless authentication with 7-day expiration.
- **Role Middleware**: Enforces granular persona permissions (`citizen`, `admin`, `driver`, `facility`).

### Honest Demo Transparency
- Every simulated component is honestly tagged:
  - `AI DEMO`: Deterministic waste classification & chat assistant.
  - `SIMULATED TELEMETRY`: IoT ultrasonic bin sensors, battery levels, CAN bus vehicle streams.
  - `ESTIMATED PREDICTION`: Zone-wise predictive demand curves & overflow forecasts.
  - `ESTIMATED IMPACT`: CO2 reduction, fuel savings, landfill diversion calculations.
