import { db } from '../database/mockDb';
import { Facility } from '../types';

export class FacilityRepository {
  public findById(id: string): Facility | undefined {
    return db.facilities.find(f => f.id === id);
  }

  public findMany(predicate?: (item: Facility) => boolean): Facility[] {
    if (!predicate) return [...db.facilities];
    return db.facilities.filter(predicate);
  }

  public create(item: Facility): Facility {
    db.facilities.push(item);
    return item;
  }

  public update(id: string, partial: Partial<Facility>): Facility | undefined {
    const index = db.facilities.findIndex(f => f.id === id);
    if (index === -1) return undefined;
    db.facilities[index] = { ...db.facilities[index], ...partial };
    return db.facilities[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.facilities.length;
    db.facilities = db.facilities.filter(f => f.id !== id);
    return db.facilities.length < initialLen;
  }
}

export const facilityRepository = new FacilityRepository();
