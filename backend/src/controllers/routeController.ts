import { Request, Response, NextFunction } from 'express';
import { routeOptimizationService } from '../services/routeOptimizationService';
import { scenarioService } from '../services/scenarioService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class RouteController {
  public optimize(req: Request, res: Response, next: NextFunction) {
    try {
      const result = routeOptimizationService.optimizeRoutes();
      res.status(200).json({
        success: true,
        message: 'City collection routes optimized successfully.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  public getAllRoutes(req: Request, res: Response, next: NextFunction) {
    try {
      const routes = routeOptimizationService.getRoutes();
      res.status(200).json({
        success: true,
        count: routes.length,
        data: routes
      });
    } catch (err) {
      next(err);
    }
  }

  public getRouteById(req: Request, res: Response, next: NextFunction) {
    try {
      const route = routeOptimizationService.getRouteById(req.params.id);
      res.status(200).json({
        success: true,
        data: route
      });
    } catch (err) {
      next(err);
    }
  }

  public getDriverRoute(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const driverId = req.user?.id || 'user-d1';
      const route = routeOptimizationService.getDriverRoute(driverId);
      res.status(200).json({
        success: true,
        data: route
      });
    } catch (err) {
      next(err);
    }
  }
}

export const routeController = new RouteController();

export class ScenarioController {
  public getAllScenarios(req: Request, res: Response, next: NextFunction) {
    try {
      const scenarios = scenarioService.getAllScenarios();
      res.status(200).json({
        success: true,
        data: scenarios
      });
    } catch (err) {
      next(err);
    }
  }

  public simulate(req: Request, res: Response, next: NextFunction) {
    try {
      const { scenarioId } = req.body;
      const result = scenarioService.simulateScenario(scenarioId || 'scen-1');
      res.status(200).json({
        success: true,
        message: 'What-If scenario simulation executed.',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

export const scenarioController = new ScenarioController();
