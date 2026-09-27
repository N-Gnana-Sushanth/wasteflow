import { db } from '../database/mockDb';
import { OptimizedRoute } from '../types';

export class RouteRepository {
  public findById(id: string): OptimizedRoute | undefined {
    return db.routes.find(r => r.id === id);
  }

  public findByVehicleId(vehicleId: string): OptimizedRoute | undefined {
    return db.routes.find(r => r.vehicleId === vehicleId);
  }

  public findMany(predicate?: (item: OptimizedRoute) => boolean): OptimizedRoute[] {
    if (!predicate) return [...db.routes];
    return db.routes.filter(predicate);
  }

  public setAll(routes: OptimizedRoute[]): OptimizedRoute[] {
    db.routes = [...routes];
    return db.routes;
  }

  public create(item: OptimizedRoute): OptimizedRoute {
    db.routes.push(item);
    return item;
  }

  public update(id: string, partial: Partial<OptimizedRoute>): OptimizedRoute | undefined {
    const index = db.routes.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    db.routes[index] = { ...db.routes[index], ...partial };
    return db.routes[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.routes.length;
    db.routes = db.routes.filter(r => r.id !== id);
    return db.routes.length < initialLen;
  }
}

export const routeRepository = new RouteRepository();
