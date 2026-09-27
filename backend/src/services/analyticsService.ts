import { notificationRepository } from '../repositories/notificationRepository';
import { environmentRepository, auditLogRepository } from '../repositories/wasteScanRepository';
import { binRepository } from '../repositories/binRepository';
import { NotificationItem, EnvironmentalStats, AuditLog } from '../types';

export class NotificationService {
  public getNotifications(userId?: string): NotificationItem[] {
    return notificationRepository.findMany(n => {
      if (!n.userId) return true; // Global broadcasts
      if (userId && n.userId === userId) return true;
      return false;
    });
  }

  public markAsRead(id: string): boolean {
    return notificationRepository.markAsRead(id);
  }

  public markAllAsRead(userId?: string): void {
    notificationRepository.markAllAsRead(userId);
  }
}

export const notificationService = new NotificationService();

export class AnalyticsService {
  public getEnvironmentalImpact(): EnvironmentalStats & { label: string } {
    return {
      ...environmentRepository.getStats(),
      label: 'ESTIMATED ENVIRONMENTAL IMPACT'
    };
  }

  public getAuditLogs(): AuditLog[] {
    return auditLogRepository.findMany();
  }

  public getDemandPredictions(): any {
    return {
      dailyForecast: [
        { day: 'Mon', organicTons: 42.1, recyclableTons: 28.4, hazardousTons: 2.1 },
        { day: 'Tue', organicTons: 40.5, recyclableTons: 26.8, hazardousTons: 1.8 },
        { day: 'Wed', organicTons: 43.8, recyclableTons: 29.2, hazardousTons: 2.4 },
        { day: 'Thu', organicTons: 45.0, recyclableTons: 31.0, hazardousTons: 2.0 },
        { day: 'Fri', organicTons: 52.4, recyclableTons: 38.6, hazardousTons: 3.2 },
        { day: 'Sat', organicTons: 64.2, recyclableTons: 48.0, hazardousTons: 4.1 },
        { day: 'Sun', organicTons: 68.0, recyclableTons: 51.5, hazardousTons: 3.8 }
      ],
      zoneDemand: [
        { zone: 'Hitec City - Zone 1', baselineKg: 12500, forecastedKg: 16800, surgeRisk: 'HIGH' },
        { zone: 'Gachibowli - Zone 2', baselineKg: 9800, forecastedKg: 11200, surgeRisk: 'MEDIUM' },
        { zone: 'Madhapur - Zone 3', baselineKg: 14200, forecastedKg: 18400, surgeRisk: 'HIGH' },
        { zone: 'Jubilee Hills - Zone 4', baselineKg: 8500, forecastedKg: 9100, surgeRisk: 'LOW' },
        { zone: 'Banjara Hills - Zone 5', baselineKg: 9200, forecastedKg: 9900, surgeRisk: 'LOW' },
        { zone: 'Kukatpally - Zone 6', baselineKg: 15400, forecastedKg: 19800, surgeRisk: 'CRITICAL' }
      ],
      label: 'ESTIMATED PREDICTION'
    };
  }

  public getBinPredictions(): any {
    const bins = binRepository.findMany();
    return {
      overflowRiskCount: bins.filter(b => b.predictedOverflowMinutes <= 60).length,
      averageFillRatePerHour: 4.8,
      bins: bins.map(b => ({
        binId: b.id,
        code: b.code,
        name: b.name,
        currentFill: b.currentFillLevel,
        predictedOverflowMinutes: b.predictedOverflowMinutes,
        risk: b.predictedOverflowMinutes <= 30 ? 'CRITICAL' : b.predictedOverflowMinutes <= 90 ? 'HIGH' : 'LOW'
      })),
      label: 'ESTIMATED PREDICTION'
    };
  }
}

export const analyticsService = new AnalyticsService();
