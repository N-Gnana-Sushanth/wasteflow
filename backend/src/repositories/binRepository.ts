import { db } from '../database/mockDb';
import { SmartBin } from '../types';

export class BinRepository {
  public findById(id: string): SmartBin | undefined {
    return db.bins.find(b => b.id === id || b.code === id);
  }

  public findMany(predicate?: (item: SmartBin) => boolean): SmartBin[] {
    if (!predicate) return [...db.bins];
    return db.bins.filter(predicate);
  }

  public create(item: SmartBin): SmartBin {
    db.bins.push(item);
    return item;
  }

  public update(id: string, partial: Partial<SmartBin>): SmartBin | undefined {
    const index = db.bins.findIndex(b => b.id === id || b.code === id);
    if (index === -1) return undefined;
    db.bins[index] = { ...db.bins[index], ...partial };
    return db.bins[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.bins.length;
    db.bins = db.bins.filter(b => b.id !== id && b.code !== id);
    return db.bins.length < initialLen;
  }
}

export const binRepository = new BinRepository();
