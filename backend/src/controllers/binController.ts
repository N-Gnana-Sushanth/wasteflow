import { Request, Response, NextFunction } from 'express';
import { binService } from '../services/binService';
import { vehicleService } from '../services/vehicleService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class BinController {
  public getAllBins(req: Request, res: Response, next: NextFunction) {
    try {
      const { zone, status, category } = req.query;
      const bins = binService.getAllBins({
        zone: zone as string,
        status: status as any,
        category: category as any
      });
      res.status(200).json({
        success: true,
        count: bins.length,
        data: bins
      });
    } catch (err) {
      next(err);
    }
  }

  public getBinById(req: Request, res: Response, next: NextFunction) {
    try {
      const bin = binService.getBinById(req.params.id);
      res.status(200).json({
        success: true,
        data: bin
      });
    } catch (err) {
      next(err);
    }
  }

  public createBin(req: Request, res: Response, next: NextFunction) {
    try {
      const bin = binService.createBin(req.body);
      res.status(201).json({
        success: true,
        message: 'Smart Bin registered successfully.',
        data: bin
      });
    } catch (err) {
      next(err);
    }
  }

  public updateBin(req: Request, res: Response, next: NextFunction) {
    try {
      const bin = binService.updateBin(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Smart Bin updated successfully.',
        data: bin
      });
    } catch (err) {
      next(err);
    }
  }

  public ingestTelemetry(req: Request, res: Response, next: NextFunction) {
    try {
      const result = binService.ingestTelemetry(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Simulated IoT telemetry processed.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

export const binController = new BinController();

export class VehicleController {
  public getAllVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, zone } = req.query;
      const vehicles = vehicleService.getAllVehicles({
        status: status as any,
        zone: zone as string
      });
      res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles
      });
    } catch (err) {
      next(err);
    }
  }

  public getVehicleById(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = vehicleService.getVehicleById(req.params.id);
      res.status(200).json({
        success: true,
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }

  public updateLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = vehicleService.updateLocation(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Vehicle telematics updated.',
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }

  public updateVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = vehicleService.updateVehicle(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }
}

export const vehicleController = new VehicleController();
