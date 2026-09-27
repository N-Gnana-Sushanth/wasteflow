import { vehicleRepository } from '../repositories/vehicleRepository';
import { Vehicle, VehicleStatus } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class VehicleService {
  public getAllVehicles(filters?: { status?: VehicleStatus; zone?: string }): Vehicle[] {
    return vehicleRepository.findMany(v => {
      if (filters?.status && v.status !== filters.status) return false;
      if (filters?.zone && v.assignedZone !== filters.zone) return false;
      return true;
    });
  }

  public getVehicleById(id: string): Vehicle {
    const vehicle = vehicleRepository.findById(id);
    if (!vehicle) {
      throw new AppError(`Vehicle '${id}' not found.`, 404, 'VEHICLE_NOT_FOUND');
    }
    return vehicle;
  }

  public getVehicleByDriver(driverId: string): Vehicle {
    const vehicle = vehicleRepository.findByDriverId(driverId);
    if (!vehicle) {
      // Return first vehicle as fallback demo mapping
      return vehicleRepository.findMany()[0];
    }
    return vehicle;
  }

  public updateLocation(id: string, data: {
    lat: number;
    lng: number;
    heading?: number;
    fuelBatteryLevel?: number;
    status?: VehicleStatus;
  }): Vehicle {
    const vehicle = this.getVehicleById(id);
    const updated = vehicleRepository.update(vehicle.id, {
      currentLocation: { lat: data.lat, lng: data.lng },
      heading: data.heading ?? vehicle.heading,
      fuelBatteryLevel: data.fuelBatteryLevel ?? vehicle.fuelBatteryLevel,
      status: data.status ?? vehicle.status
    });
    return updated!;
  }

  public updateVehicle(id: string, partial: Partial<Vehicle>): Vehicle {
    const updated = vehicleRepository.update(id, partial);
    if (!updated) {
      throw new AppError(`Vehicle '${id}' not found.`, 404, 'VEHICLE_NOT_FOUND');
    }
    return updated;
  }
}

export const vehicleService = new VehicleService();
