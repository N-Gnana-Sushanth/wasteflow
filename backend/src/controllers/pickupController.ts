import { Response, NextFunction } from 'express';
import { pickupService } from '../services/pickupService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class PickupController {
  public getAllPickups(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { status, zone } = req.query;
      // If citizen, automatically filter to citizen's own pickups unless admin/driver
      const citizenId = req.user?.role === 'citizen' ? req.user.id : (req.query.citizenId as string);

      const pickups = pickupService.getAllPickups({
        status: status as any,
        citizenId,
        zone: zone as string
      });

      res.status(200).json({
        success: true,
        count: pickups.length,
        data: pickups
      });
    } catch (err) {
      next(err);
    }
  }

  public getPickupById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const pickup = pickupService.getPickupById(req.params.id);
      res.status(200).json({
        success: true,
        data: pickup
      });
    } catch (err) {
      next(err);
    }
  }

  public createPickup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const citizenId = req.user?.id || 'user-c1';
      const pickup = pickupService.createPickup(citizenId, req.body);
      res.status(201).json({
        success: true,
        message: 'Pickup request scheduled successfully.',
        data: pickup
      });
    } catch (err) {
      next(err);
    }
  }

  public updatePickupStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { status, notes, collectedWeightKg } = req.body;
      const pickup = pickupService.updateStatus(req.params.id, status, req.user?.id, notes, collectedWeightKg);
      res.status(200).json({
        success: true,
        message: `Pickup status updated to ${status}.`,
        data: pickup
      });
    } catch (err) {
      next(err);
    }
  }

  public assignVehicle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { vehicleId } = req.body;
      const pickup = pickupService.assignVehicle(req.params.id, vehicleId, req.user?.id);
      res.status(200).json({
        success: true,
        message: 'Vehicle and driver assigned to pickup.',
        data: pickup
      });
    } catch (err) {
      next(err);
    }
  }

  public verifyPickup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { otp } = req.body;
      const result = pickupService.verifyPickup(req.params.id, otp, req.user?.id);
      res.status(200).json({
        success: true,
        message: 'Pickup verification successful! Digital collection receipt generated.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  public cancelPickup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { reason } = req.body;
      const pickup = pickupService.cancelPickup(req.params.id, req.user!.id, reason);
      res.status(200).json({
        success: true,
        message: 'Pickup cancelled successfully.',
        data: pickup
      });
    } catch (err) {
      next(err);
    }
  }
}

export const pickupController = new PickupController();
