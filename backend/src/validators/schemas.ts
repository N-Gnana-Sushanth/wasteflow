import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Invalid request input data.',
        details: error.errors
      });
    }
  };
};

// Zod Schemas
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['citizen', 'admin', 'driver', 'facility']).default('citizen'),
  phone: z.string().optional(),
  address: z.string().optional(),
  zone: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const createPickupSchema = z.object({
  category: z.enum(['Wet', 'Dry', 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Hazardous', 'Mixed']),
  estimatedWeightKg: z.number().positive(),
  itemCount: z.number().int().positive().optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(3),
    zone: z.string().min(2)
  }),
  preferredDate: z.string(),
  preferredTimeSlot: z.string(),
  notes: z.string().optional(),
  imageUrl: z.string().optional()
});

export const updatePickupStatusSchema = z.object({
  status: z.enum([
    'REQUESTED',
    'APPROVED',
    'ASSIGNED',
    'DRIVER_EN_ROUTE',
    'ARRIVED',
    'COLLECTED',
    'VERIFIED',
    'COMPLETED',
    'CANCELLED'
  ]),
  notes: z.string().optional(),
  collectedWeightKg: z.number().optional()
});

export const verifyOtpSchema = z.object({
  otp: z.string().min(4).max(6)
});

export const assignPickupSchema = z.object({
  vehicleId: z.string().min(1)
});

export const createBinSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
    zone: z.string(),
    ward: z.string()
  }),
  category: z.enum(['Wet', 'Dry', 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Hazardous', 'Mixed']),
  capacityLiters: z.number().positive().default(1100)
});

export const telemetryBinSchema = z.object({
  fillLevel: z.number().min(0).max(100),
  temperature: z.number().optional(),
  batteryLevel: z.number().min(0).max(100).optional(),
  tiltAngle: z.number().optional()
});

export const createIncidentSchema = z.object({
  type: z.enum([
    'Illegal Dumping',
    'Bin Overflow',
    'Vehicle Breakdown',
    'Road Obstruction',
    'Sensor Malfunction',
    'Hazardous Spill',
    'Missed Pickup SLA'
  ]).default('Illegal Dumping'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
    zone: z.string()
  }),
  category: z.enum(['Wet', 'Dry', 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Hazardous', 'Mixed']).optional(),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).default('HIGH'),
  description: z.string().min(5),
  imageUrl: z.string().optional()
});

export const updateIncidentStatusSchema = z.object({
  status: z.enum(['REPORTED', 'UNDER_REVIEW', 'ASSIGNED', 'CLEANING', 'RESOLVED', 'REJECTED']),
  assignedCrew: z.string().optional()
});

export const classifyWasteSchema = z.object({
  imageSource: z.string().min(1),
  optionalLabel: z.string().optional()
});

export const updateVehicleLocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  heading: z.number().optional(),
  fuelBatteryLevel: z.number().min(0).max(100).optional(),
  status: z.enum(['IDLE', 'ON_ROUTE', 'COLLECTING', 'MAINTENANCE', 'OFFLINE']).optional()
});
