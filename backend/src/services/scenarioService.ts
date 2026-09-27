import { scenarioRepository, auditLogRepository } from '../repositories/wasteScanRepository';
import { notificationRepository } from '../repositories/notificationRepository';
import { routeOptimizationService } from './routeOptimizationService';
import { WhatIfScenario, OptimizedRoute } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class ScenarioService {
  public getAllScenarios(): WhatIfScenario[] {
    return scenarioRepository.findMany();
  }

  public getScenarioById(id: string): WhatIfScenario {
    const scenario = scenarioRepository.findById(id);
    if (!scenario) {
      throw new AppError(`Scenario '${id}' not found.`, 404, 'SCENARIO_NOT_FOUND');
    }
    return scenario;
  }

  public simulateScenario(scenarioId: string): {
    scenario: WhatIfScenario;
    affectedRoutes: string[];
    affectedVehiclesCount: number;
    pickupsDelayedCount: number;
    additionalFuelLiters: number;
    additionalTimeMin: number;
    estimatedCostDeltaUSD: number;
    recommendedAction: string;
    impactHeadline: string;
    recalculatedRoutes: OptimizedRoute[];
    label: string;
  } {
    const scenario = this.getScenarioById(scenarioId);
    const baseRoutes = routeOptimizationService.getRoutes();

    const affectedRoutes = baseRoutes.slice(0, scenario.impacts.vehiclesAffected).map(r => r.id);

    const recalculatedRoutes = baseRoutes.map((route, idx) => {
      if (idx < scenario.impacts.vehiclesAffected) {
        return {
          ...route,
          status: 'REROUTED' as const,
          totalDistanceKm: Number((route.totalDistanceKm + (scenario.impacts.additionalFuelLiters / 2)).toFixed(1)),
          estimatedDurationMin: route.estimatedDurationMin + scenario.impacts.additionalTimeMin,
          estimatedFuelLiters: Number((route.estimatedFuelLiters + (scenario.impacts.additionalFuelLiters / scenario.impacts.vehiclesAffected)).toFixed(1))
        };
      }
      return route;
    });

    const result = {
      scenario,
      affectedRoutes,
      affectedVehiclesCount: scenario.impacts.vehiclesAffected,
      pickupsDelayedCount: scenario.impacts.pickupsDelayed,
      additionalFuelLiters: scenario.impacts.additionalFuelLiters,
      additionalTimeMin: scenario.impacts.additionalTimeMin,
      estimatedCostDeltaUSD: scenario.impacts.estimatedCostDeltaUSD,
      recommendedAction: scenario.impacts.mitigationStrategy,
      impactHeadline: `Applied ${scenario.name}: +${scenario.impacts.additionalTimeMin}m delay, +${scenario.impacts.additionalFuelLiters}L fuel across ${scenario.impacts.vehiclesAffected} fleet routes.`,
      recalculatedRoutes,
      label: 'ESTIMATED PREDICTION (SIMULATED SCENARIO)'
    };

    notificationRepository.create({
      id: `notif-${Date.now()}`,
      title: `What-If Simulation Applied: ${scenario.name}`,
      message: result.impactHeadline,
      type: 'ai',
      timestamp: 'Just now',
      read: false,
      priority: 'HIGH'
    });

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'admin',
      userName: 'Municipal Scenario Simulator',
      role: 'admin',
      action: 'WHAT_IF_SIMULATION',
      entity: scenario.name,
      ipAddress: '127.0.0.1',
      status: 'ALERT',
      details: `Executed contingency simulation model for ${scenario.type}.`
    });

    return result;
  }
}

export const scenarioService = new ScenarioService();
