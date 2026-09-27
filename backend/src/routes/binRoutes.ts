import { Router } from 'express';
import { binController, vehicleController } from '../controllers/binController';
import { routeController, scenarioController } from '../controllers/routeController';
import {
  facilityController,
  reportController,
  rewardController,
  notificationController,
  aiController,
  analyticsController
} from '../controllers/facilityController';
import { authenticateJwt } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import {
  validateRequest,
  createBinSchema,
  telemetryBinSchema,
  updateVehicleLocationSchema,
  createIncidentSchema,
  updateIncidentStatusSchema,
  classifyWasteSchema
} from '../validators/schemas';

// Bins
export const binRouter = Router();
binRouter.get('/', (req, res, next) => binController.getAllBins(req, res, next));
binRouter.get('/:id', (req, res, next) => binController.getBinById(req, res, next));
binRouter.post('/', authenticateJwt, authorizeRoles('admin'), validateRequest(createBinSchema), (req, res, next) => binController.createBin(req, res, next));
binRouter.put('/:id', authenticateJwt, authorizeRoles('admin'), (req, res, next) => binController.updateBin(req, res, next));
binRouter.post('/:id/telemetry', validateRequest(telemetryBinSchema), (req, res, next) => binController.ingestTelemetry(req, res, next));

// Vehicles
export const vehicleRouter = Router();
vehicleRouter.get('/', (req, res, next) => vehicleController.getAllVehicles(req, res, next));
vehicleRouter.get('/:id', (req, res, next) => vehicleController.getVehicleById(req, res, next));
vehicleRouter.put('/:id', authenticateJwt, authorizeRoles('admin'), (req, res, next) => vehicleController.updateVehicle(req, res, next));
vehicleRouter.post('/:id/location', validateRequest(updateVehicleLocationSchema), (req, res, next) => vehicleController.updateLocation(req, res, next));

// Routes
export const routeRouter = Router();
routeRouter.post('/optimize', authenticateJwt, authorizeRoles('admin'), (req, res, next) => routeController.optimize(req, res, next));
routeRouter.get('/', (req, res, next) => routeController.getAllRoutes(req, res, next));
routeRouter.get('/driver/me', authenticateJwt, (req, res, next) => routeController.getDriverRoute(req, res, next));
routeRouter.get('/:id', (req, res, next) => routeController.getRouteById(req, res, next));

// Scenarios
export const scenarioRouter = Router();
scenarioRouter.get('/', (req, res, next) => scenarioController.getAllScenarios(req, res, next));
scenarioRouter.post('/simulate', authenticateJwt, authorizeRoles('admin'), (req, res, next) => scenarioController.simulate(req, res, next));

// Facilities
export const facilityRouter = Router();
facilityRouter.get('/', (req, res, next) => facilityController.getAllFacilities(req, res, next));
facilityRouter.get('/:id', (req, res, next) => facilityController.getFacilityById(req, res, next));
facilityRouter.get('/:id/capacity', (req, res, next) => facilityController.getFacilityCapacity(req, res, next));
facilityRouter.get('/:id/weighbridge', (req, res, next) => facilityController.getWeighbridgeQueue(req, res, next));
facilityRouter.put('/:id', authenticateJwt, authorizeRoles('admin', 'facility'), (req, res, next) => facilityController.updateFacility(req, res, next));

// Reports / Illegal Dumping
export const reportRouter = Router();
reportRouter.get('/illegal-dumping', (req, res, next) => reportController.getAllReports(req, res, next));
reportRouter.get('/illegal-dumping/:id', (req, res, next) => reportController.getReportById(req, res, next));
reportRouter.post('/illegal-dumping', authenticateJwt, validateRequest(createIncidentSchema), (req, res, next) => reportController.createReport(req, res, next));
reportRouter.put('/illegal-dumping/:id/status', authenticateJwt, authorizeRoles('admin'), validateRequest(updateIncidentStatusSchema), (req, res, next) => reportController.updateReportStatus(req, res, next));

// Rewards
export const rewardRouter = Router();
rewardRouter.get('/', (req, res, next) => rewardController.getAllRewards(req, res, next));
rewardRouter.get('/leaderboard', (req, res, next) => rewardController.getLeaderboard(req, res, next));
rewardRouter.post('/earn', authenticateJwt, (req, res, next) => rewardController.earnPoints(req, res, next));
rewardRouter.post('/claim', authenticateJwt, (req, res, next) => rewardController.claimReward(req, res, next));

// Notifications
export const notificationRouter = Router();
notificationRouter.get('/', authenticateJwt, (req, res, next) => notificationController.getAll(req, res, next));
notificationRouter.put('/:id/read', authenticateJwt, (req, res, next) => notificationController.markRead(req, res, next));

// AI
export const aiRouter = Router();
aiRouter.post('/waste-classify', validateRequest(classifyWasteSchema), (req, res, next) => aiController.classifyWaste(req, res, next));

// Analytics, Environment, Predictions
export const analyticsRouter = Router();
analyticsRouter.get('/environment/impact', (req, res, next) => analyticsController.getEnvironmentalImpact(req, res, next));
analyticsRouter.get('/audit-logs', authenticateJwt, authorizeRoles('admin'), (req, res, next) => analyticsController.getAuditLogs(req, res, next));
analyticsRouter.get('/predictions/demand', (req, res, next) => analyticsController.getDemandPredictions(req, res, next));
analyticsRouter.get('/predictions/bins', (req, res, next) => analyticsController.getBinPredictions(req, res, next));
analyticsRouter.get('/priorities', (req, res, next) => analyticsController.getPriorities(req, res, next));
