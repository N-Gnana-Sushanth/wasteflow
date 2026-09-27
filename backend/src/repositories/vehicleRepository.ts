import { db } from '../database/mockDb';
import { Vehicle } from '../types';

export class VehicleRepository {
  public findById(id: string): Vehicle | undefined {
    return db.vehicles.find(v => v.id === id || v.plateNumber === id);
  }

  public findByDriverId(driverId: string): Vehicle | undefined {
    return db.vehicles.find(v => v.driverId === driverId);
  }

  public findMany(predicate?: (item: Vehicle) => boolean): Vehicle[] {
    if (!predicate) return [...db.vehicles];
    return db.vehicles.filter(predicate);
  }

  public create(item: Vehicle): Vehicle {
    db.vehicles.push(item);
    return item;
  }

  public update(id: string, partial: Partial<Vehicle>): Vehicle | undefined {
    const index = db.vehicles.findIndex(v => v.id === id || v.plateNumber === id);
    if (index === -1) return undefined;
    db.vehicles[index] = { ...db.vehicles[index], ...partial };
    return db.vehicles[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.vehicles.length;
    db.vehicles = db.vehicles.filter(v => v.id !== id);
    return db.vehicles.length < initialLen;
  }
}

export const vehicleRepository = new VehicleRepository();
