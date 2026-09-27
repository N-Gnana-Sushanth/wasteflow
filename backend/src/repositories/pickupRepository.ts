import { db } from '../database/mockDb';
import { PickupRequest } from '../types';

export class PickupRepository {
  public findById(id: string): PickupRequest | undefined {
    return db.pickups.find(p => p.id === id);
  }

  public findByRequestNumber(reqNum: string): PickupRequest | undefined {
    return db.pickups.find(p => p.requestNumber === reqNum);
  }

  public findMany(predicate?: (item: PickupRequest) => boolean): PickupRequest[] {
    if (!predicate) return [...db.pickups];
    return db.pickups.filter(predicate);
  }

  public create(item: PickupRequest): PickupRequest {
    db.pickups.unshift(item);
    return item;
  }

  public update(id: string, partial: Partial<PickupRequest>): PickupRequest | undefined {
    const index = db.pickups.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    db.pickups[index] = { ...db.pickups[index], ...partial, updatedAt: new Date().toISOString() };
    return db.pickups[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.pickups.length;
    db.pickups = db.pickups.filter(p => p.id !== id);
    return db.pickups.length < initialLen;
  }
}

export const pickupRepository = new PickupRepository();
