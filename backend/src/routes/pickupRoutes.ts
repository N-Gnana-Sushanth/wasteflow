import { Router } from 'express';
import { pickupController } from '../controllers/pickupController';
import { authenticateJwt } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import {
  validateRequest,
  createPickupSchema,
  updatePickupStatusSchema,
  assignPickupSchema,
  verifyOtpSchema
} from '../validators/schemas';

export const pickupRouter = Router();

pickupRouter.get('/', authenticateJwt, (req, res, next) => pickupController.getAllPickups(req, res, next));
pickupRouter.get('/:id', authenticateJwt, (req, res, next) => pickupController.getPickupById(req, res, next));
pickupRouter.post('/', authenticateJwt, validateRequest(createPickupSchema), (req, res, next) => pickupController.createPickup(req, res, next));
pickupRouter.put('/:id/status', authenticateJwt, validateRequest(updatePickupStatusSchema), (req, res, next) => pickupController.updatePickupStatus(req, res, next));
pickupRouter.post('/:id/assign', authenticateJwt, authorizeRoles('admin'), validateRequest(assignPickupSchema), (req, res, next) => pickupController.assignVehicle(req, res, next));
pickupRouter.post('/:id/verify', authenticateJwt, validateRequest(verifyOtpSchema), (req, res, next) => pickupController.verifyPickup(req, res, next));
pickupRouter.post('/:id/cancel', authenticateJwt, (req, res, next) => pickupController.cancelPickup(req, res, next));
