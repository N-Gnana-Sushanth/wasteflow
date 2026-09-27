# WasteFlow REST API Reference

Base URL: `http://localhost:4000/api`

---

## 1. Authentication & Users
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user profile | No |
| `POST` | `/api/auth/login` | Login and obtain JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (Bearer Token) |
| `POST` | `/api/auth/logout` | Invalidate active session | Yes |
| `GET` | `/api/users/me` | Current user profile details | Yes |
| `PUT` | `/api/users/me` | Update citizen/user profile | Yes |
| `GET` | `/api/users` | List all users (Admin only) | Yes (Admin) |
| `GET` | `/api/users/:id` | Get user by ID | Yes (Admin) |

---

## 2. Pickup Requests
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/pickups` | List pickups (filtered by role/status) | Yes |
| `GET` | `/api/pickups/:id` | Get pickup details | Yes |
| `POST` | `/api/pickups` | Create new pickup request (generates OTP) | Yes (Citizen) |
| `PUT` | `/api/pickups/:id/status` | Update pickup status (REQUESTED $\to$ COMPLETED) | Yes |
| `POST` | `/api/pickups/:id/assign` | Assign vehicle and driver | Yes (Admin) |
| `POST` | `/api/pickups/:id/verify` | Verify OTP code, issue digital receipt | Yes (Driver/Citizen) |
| `POST` | `/api/pickups/:id/cancel` | Cancel uncollected pickup | Yes (Citizen) |

---

## 3. Smart Bins & Telemetry
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/bins` | List all 52 smart bins | No |
| `GET` | `/api/bins/:id` | Get smart bin by ID or Code | No |
| `POST` | `/api/bins` | Register new IoT bin | Yes (Admin) |
| `PUT` | `/api/bins/:id` | Update bin parameters | Yes (Admin) |
| `POST` | `/api/bins/:id/telemetry` | Ingest ultrasonic fill & sensor telemetry | No (Public Sensor Gateway) |

---

## 4. Vehicles & Fleet Telematics
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/vehicles` | List all 10 fleet collection vehicles | No |
| `GET` | `/api/vehicles/:id` | Get vehicle by ID | No |
| `POST` | `/api/vehicles/:id/location` | Stream real-time GPS coordinates & fuel | No |
| `PUT` | `/api/vehicles/:id` | Update vehicle parameters | Yes (Admin) |

---

## 5. Route Optimization & What-If Simulator
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/routes/optimize` | AI dynamic city-wide route re-sequencing | Yes (Admin) |
| `GET` | `/api/routes` | Get all active route manifests | No |
| `GET` | `/api/routes/driver/me` | Get assigned manifest for current driver | Yes (Driver) |
| `GET` | `/api/routes/:id` | Get route details by ID | No |
| `GET` | `/api/scenarios` | List What-If contingency scenarios | No |
| `POST` | `/api/scenarios/simulate` | Execute What-If contingency simulation | Yes (Admin) |

---

## 6. Circular Recycling Facilities
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/facilities` | List 10 circular waste facilities | No |
| `GET` | `/api/facilities/:id` | Get facility by ID | No |
| `GET` | `/api/facilities/:id/capacity` | Get daily capacity vs current processing load | No |
| `GET` | `/api/facilities/:id/weighbridge` | Get incoming truck queue manifests | No |
| `PUT` | `/api/facilities/:id` | Update facility throughput | Yes (Admin/Facility) |

---

## 7. Reports & Illegal Dumping
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/reports/illegal-dumping` | List all reported dumping incidents | No |
| `GET` | `/api/reports/illegal-dumping/:id` | Get incident details | No |
| `POST` | `/api/reports/illegal-dumping` | Submit citizen illegal dumping report | Yes (Citizen) |
| `PUT` | `/api/reports/illegal-dumping/:id/status` | Dispatch cleanup squad or resolve | Yes (Admin) |

---

## 8. Rewards & Citizen Gamification
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/rewards` | Get rewards catalog and citizen badges | No |
| `GET` | `/api/rewards/leaderboard` | Top citizen eco-point leaderboard | No |
| `POST` | `/api/rewards/claim` | Redeem eco-points for transit/tax vouchers | Yes (Citizen) |
| `POST` | `/api/rewards/earn` | Award eco-points for verified actions | Yes |

---

## 9. AI Vision & Analytics
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/ai/waste-classify` | Multi-category neural waste classifier | No |
| `GET` | `/api/environment/impact` | Overall landfill diversion & CO2 metrics | No |
| `GET` | `/api/predictions/demand` | Zone-wise weekly demand forecast curves | No |
| `GET` | `/api/predictions/bins` | IoT overflow forecast matrix | No |
| `GET` | `/api/priorities` | Dynamic priority ranking matrix | No |
| `GET` | `/api/audit-logs` | Immutable audit log trail | Yes (Admin) |
| `POST` | `/api/demo/reset` | Reset mock database to seed baseline | No (Demo Mode) |
