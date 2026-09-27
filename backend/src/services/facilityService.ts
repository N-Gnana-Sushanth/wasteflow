import { facilityRepository } from '../repositories/facilityRepository';
import { vehicleRepository } from '../repositories/vehicleRepository';
import { Facility } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class FacilityService {
  public getAllFacilities(): Facility[] {
    return facilityRepository.findMany();
  }

  public getFacilityById(id: string): Facility {
    const facility = facilityRepository.findById(id);
    if (!facility) {
      throw new AppError(`Facility '${id}' not found.`, 404, 'FACILITY_NOT_FOUND');
    }
    return facility;
  }

  public getFacilityCapacity(id: string): {
    facility: Facility;
    capacityTonsDay: number;
    currentProcessingTonsDay: number;
    utilizationPercent: number;
    availableCapacityTonsDay: number;
    materialBreakdown: any;
  } {
    const facility = this.getFacilityById(id);
    const avail = Math.max(0, facility.totalCapacityTonsDay - facility.currentProcessingTonsDay);
    const util = Math.min(100, Math.round((facility.currentProcessingTonsDay / facility.totalCapacityTonsDay) * 100));

    return {
      facility,
      capacityTonsDay: facility.totalCapacityTonsDay,
      currentProcessingTonsDay: facility.currentProcessingTonsDay,
      utilizationPercent: util,
      availableCapacityTonsDay: avail,
      materialBreakdown: facility.materialBreakdown || {
        recycledTons: Math.round(facility.currentProcessingTonsDay * 0.55),
        compostedTons: Math.round(facility.currentProcessingTonsDay * 0.25),
        biogasM3: Math.round(facility.currentProcessingTonsDay * 120),
        eWasteKg: Math.round(facility.currentProcessingTonsDay * 80),
        rdfTons: Math.round(facility.currentProcessingTonsDay * 0.20)
      }
    };
  }

  public getIncomingWeighbridgeQueue(facilityId: string): any[] {
    const vehicles = vehicleRepository.findMany(v => v.status === 'ON_ROUTE' || v.status === 'COLLECTING');
    return vehicles.slice(0, 3).map((v, i) => ({
      plateNumber: v.plateNumber,
      driverName: v.driverName,
      category: i === 0 ? 'Dry / Recyclables' : i === 1 ? 'Plastics' : 'Paper & Cardboard',
      estimatedLoadKg: v.currentLoadKg,
      etaMinutes: 8 + (i * 16),
      status: i === 0 ? 'APPROACHING' : i === 1 ? 'IN_TRANSIT' : 'COLLECTING'
    }));
  }

  public updateFacility(id: string, partial: Partial<Facility>): Facility {
    const updated = facilityRepository.update(id, partial);
    if (!updated) {
      throw new AppError(`Facility '${id}' not found.`, 404, 'FACILITY_NOT_FOUND');
    }
    return updated;
  }
}

export const facilityService = new FacilityService();
