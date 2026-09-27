# WasteFlow Deployment Guide

## 1. Local Development Setup

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install && cd ..
```

### Seeding Mock Database
```bash
# Populate realistic demo dataset (27 users, 52 bins, 30 pickups, 10 facilities)
npm run seed
```

### Running Applications
```bash
# Option A: Run Backend Server (Port 4000)
npm run dev:backend

# Option B: Run Frontend Client (Port 5173)
npm run dev:frontend

# Option C: Build Full Production Bundles
npm run build
```

---

## 2. Default Demo User Accounts

| Persona | Email | Password | Role |
|---|---|---|---|
| **Citizen** | `citizen@wasteflow.in` | `Citizen@123` | CITIZEN |
| **Municipal Admin** | `admin@wasteflow.gov.in` | `Admin@123` | MUNICIPAL_ADMIN |
| **Fleet Driver** | `driver@wasteflow-fleet.in` | `Driver@123` | DRIVER |
| **Facility Manager** | `facility@greentech.org` | `Facility@123` | FACILITY_MANAGER |

---

## 3. Environment Variables (`.env`)

Create `.env` in the root and `backend/` directories (or copy from `.env.example`):
```env
PORT=4000
JWT_SECRET=wasteflow-secure-jwt-secret-key-2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development

VITE_API_URL=http://localhost:4000/api
```

---

## 4. Troubleshooting
- **Port Conflict (Port 4000/5173 already in use)**: Set `PORT=4001` in `.env` and adjust `VITE_API_URL` accordingly.
- **Database Reset**: Execute `npm run seed` to repopulate the in-memory state store to initial baseline.
