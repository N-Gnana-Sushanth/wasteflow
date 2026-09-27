import { binRepository } from '../repositories/binRepository';
import { notificationRepository } from '../repositories/notificationRepository';
import { priorityRepository, auditLogRepository } from '../repositories/wasteScanRepository';
import { SmartBin, WasteCategory, BinStatus } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class BinService {
  public getAllBins(filters?: { zone?: string; status?: BinStatus; category?: WasteCategory }): SmartBin[] {
    return binRepository.findMany(b => {
      if (filters?.zone && b.location.zone !== filters.zone) return false;
      if (filters?.status && b.status !== filters.status) return false;
      if (filters?.category && b.category !== filters.category) return false;
      return true;
    });
  }

  public getBinById(id: string): SmartBin {
    const bin = binRepository.findById(id);
    if (!bin) {
      throw new AppError(`Smart Bin '${id}' not found.`, 404, 'BIN_NOT_FOUND');
    }
    return bin;
  }

  public createBin(data: {
    code: string;
    name: string;
    location: { lat: number; lng: number; address: string; zone: string; ward: string };
    category: WasteCategory;
    capacityLiters?: number;
  }): SmartBin {
    const existing = binRepository.findById(data.code);
    if (existing) {
      throw new AppError(`Bin code '${data.code}' already exists.`, 400, 'BIN_EXISTS');
    }

    const newBin: SmartBin = {
      id: `bin-${data.code.toLowerCase()}`,
      code: data.code,
      name: data.name,
      location: data.location,
      category: data.category,
      capacityLiters: data.capacityLiters || 1100,
      currentFillLevel: 0,
      fillWeightKg: 0,
      temperatureCelsius: 28,
      batteryLevel: 100,
      sensorStatus: 'HEALTHY',
      lastCommunication: 'Just now',
      lastCollectionTime: 'Never',
      predictedOverflowMinutes: 360,
      status: 'NORMAL',
      trend: 'stable'
    };

    binRepository.create(newBin);
    return newBin;
  }

  public updateBin(id: string, partial: Partial<SmartBin>): SmartBin {
    const updated = binRepository.update(id, partial);
    if (!updated) {
      throw new AppError(`Bin '${id}' not found.`, 404, 'BIN_NOT_FOUND');
    }
    return updated;
  }

  public ingestTelemetry(id: string, telemetry: {
    fillLevel: number;
    temperature?: number;
    batteryLevel?: number;
    tiltAngle?: number;
  }): { bin: SmartBin; alertTriggered: boolean; label: string } {
    const bin = this.getBinById(id);

    let newStatus: BinStatus = 'NORMAL';
    if (telemetry.fillLevel >= 90) newStatus = 'CRITICAL';
    else if (telemetry.fillLevel >= 75) newStatus = 'HIGH';
    else if (telemetry.fillLevel >= 50) newStatus = 'FILLING';

    const predictedMin = telemetry.fillLevel >= 90 ? 12 : telemetry.fillLevel >= 75 ? 40 : 180;
    const trend = telemetry.fillLevel >= 90 ? 'critical_spike' : telemetry.fillLevel >= 75 ? 'rising_fast' : 'stable';

    const updated = binRepository.update(bin.id, {
      currentFillLevel: telemetry.fillLevel,
      fillWeightKg: Math.round(telemetry.fillLevel * 4.2),
      temperatureCelsius: telemetry.temperature ?? bin.temperatureCelsius,
      batteryLevel: telemetry.batteryLevel ?? bin.batteryLevel,
      tiltAngle: telemetry.tiltAngle ?? bin.tiltAngle,
      status: newStatus,
      predictedOverflowMinutes: predictedMin,
      trend,
      lastCommunication: 'Just now'
    })!;

    let alertTriggered = false;
    if (newStatus === 'CRITICAL' && bin.status !== 'CRITICAL') {
      alertTriggered = true;
      notificationRepository.create({
        id: `notif-${Date.now()}`,
        title: `🚨 CRITICAL IoT OVERFLOW: Bin ${bin.code}`,
        message: `Fill level reached ${telemetry.fillLevel}% at ${bin.location.address}. Predicted overflow in ~${predictedMin} mins.`,
        type: 'bin',
        timestamp: 'Just now',
        read: false,
        priority: 'CRITICAL'
      });

      priorityRepository.create({
        id: `prio-bin-${Date.now()}`,
        entityType: 'BIN',
        entityId: bin.id,
        title: `CRITICAL OVERFLOW: ${bin.name} (${telemetry.fillLevel}%)`,
        location: bin.location.address,
        priority: 'CRITICAL',
        score: 98,
        reason: `Simulated ultrasonic telemetry measured ${telemetry.fillLevel}% volume. Overflow imminent.`,
        recommendedAction: 'Dispatch immediate municipal priority collection override.',
        timeSensitivity: '< 15 mins',
        zone: bin.location.zone
      });
    }

    return {
      bin: updated,
      alertTriggered,
      label: 'SIMULATED TELEMETRY'
    };
  }
}

export const binService = new BinService();
