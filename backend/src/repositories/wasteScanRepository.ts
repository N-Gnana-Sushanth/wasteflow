import { db } from '../database/mockDb';
import { WasteScanRecord, AuditLog, PriorityItem, WhatIfScenario, EnvironmentalStats } from '../types';

export class WasteScanRepository {
  public create(record: WasteScanRecord): WasteScanRecord {
    db.wasteScans.unshift(record);
    return record;
  }

  public findMany(predicate?: (item: WasteScanRecord) => boolean): WasteScanRecord[] {
    if (!predicate) return [...db.wasteScans];
    return db.wasteScans.filter(predicate);
  }
}

export const wasteScanRepository = new WasteScanRepository();

export class AuditLogRepository {
  public create(log: AuditLog): AuditLog {
    db.auditLogs.unshift(log);
    if (db.auditLogs.length > 100) {
      db.auditLogs.pop();
    }
    return log;
  }

  public findMany(): AuditLog[] {
    return [...db.auditLogs];
  }
}

export const auditLogRepository = new AuditLogRepository();

export class ScenarioRepository {
  public findById(id: string): WhatIfScenario | undefined {
    return db.scenarios.find(s => s.id === id);
  }

  public findMany(): WhatIfScenario[] {
    return [...db.scenarios];
  }
}

export const scenarioRepository = new ScenarioRepository();

export class PriorityRepository {
  public findMany(): PriorityItem[] {
    return [...db.priorityItems];
  }

  public setAll(items: PriorityItem[]): PriorityItem[] {
    db.priorityItems = [...items];
    return db.priorityItems;
  }

  public create(item: PriorityItem): PriorityItem {
    db.priorityItems.unshift(item);
    return item;
  }
}

export const priorityRepository = new PriorityRepository();

export class EnvironmentRepository {
  public getStats(): EnvironmentalStats {
    return { ...db.envStats };
  }

  public updateStats(delta: Partial<EnvironmentalStats>): EnvironmentalStats {
    db.envStats = { ...db.envStats, ...delta };
    return { ...db.envStats };
  }
}

export const environmentRepository = new EnvironmentRepository();
