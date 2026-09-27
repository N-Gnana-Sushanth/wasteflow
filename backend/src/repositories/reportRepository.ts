import { db } from '../database/mockDb';
import { Incident } from '../types';

export class ReportRepository {
  public findById(id: string): Incident | undefined {
    return db.incidents.find(i => i.id === id || i.incidentNumber === id);
  }

  public findMany(predicate?: (item: Incident) => boolean): Incident[] {
    if (!predicate) return [...db.incidents];
    return db.incidents.filter(predicate);
  }

  public create(item: Incident): Incident {
    db.incidents.unshift(item);
    return item;
  }

  public update(id: string, partial: Partial<Incident>): Incident | undefined {
    const index = db.incidents.findIndex(i => i.id === id || i.incidentNumber === id);
    if (index === -1) return undefined;
    db.incidents[index] = { ...db.incidents[index], ...partial };
    return db.incidents[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.incidents.length;
    db.incidents = db.incidents.filter(i => i.id !== id && i.incidentNumber !== id);
    return db.incidents.length < initialLen;
  }
}

export const reportRepository = new ReportRepository();
