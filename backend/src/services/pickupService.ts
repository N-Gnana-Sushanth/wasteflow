import { pickupRepository } from '../repositories/pickupRepository';
import { vehicleRepository } from '../repositories/vehicleRepository';
import { userRepository } from '../repositories/userRepository';
import { notificationRepository } from '../repositories/notificationRepository';
import { priorityRepository, environmentRepository, auditLogRepository } from '../repositories/wasteScanRepository';
import { PickupRequest, PickupStatus, WasteCategory, PriorityItem } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class PickupService {
  public getAllPickups(filters?: { status?: PickupStatus; citizenId?: string; zone?: string }): PickupRequest[] {
    return pickupRepository.findMany(p => {
      if (filters?.status && p.status !== filters.status) return false;
      if (filters?.citizenId && p.citizenId !== filters.citizenId) return false;
      if (filters?.zone && p.location.zone !== filters.zone) return false;
      return true;
    });
  }

  public getPickupById(id: string): PickupRequest {
    const pickup = pickupRepository.findById(id) || pickupRepository.findByRequestNumber(id);
    if (!pickup) {
      throw new AppError(`Pickup request '${id}' not found.`, 404, 'PICKUP_NOT_FOUND');
    }
    return pickup;
  }

  public createPickup(citizenId: string, data: {
    category: WasteCategory;
    estimatedWeightKg: number;
    itemCount?: number;
    location: { lat: number; lng: number; address: string; zone: string };
    preferredDate: string;
    preferredTimeSlot: string;
    notes?: string;
    imageUrl?: string;
  }): PickupRequest {
    const citizen = userRepository.findById(citizenId);
    const reqNum = `REQ-2026-${Math.floor(8820 + Math.random() * 900)}`;
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const newPickup: PickupRequest = {
      id: `req-${Date.now()}`,
      requestNumber: reqNum,
      citizenId,
      citizenName: citizen?.name || 'Citizen User',
      citizenPhone: citizen?.phone || '+91 98490 00000',
      category: data.category,
      estimatedWeightKg: data.estimatedWeightKg,
      itemCount: data.itemCount || 1,
      location: data.location,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      notes: data.notes,
      imageUrl: data.imageUrl,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verificationOtp: otp,
      verificationQrCode: `WF-VERIFY-${reqNum}-OTP${otp}`,
      pointsEarned: Math.round(data.estimatedWeightKg * 10),
      co2SavedKg: Number((data.estimatedWeightKg * 1.4).toFixed(1)),
      statusHistory: [
        {
          status: 'REQUESTED',
          timestamp: new Date().toISOString(),
          note: 'Created by citizen',
          actorId: citizenId
        }
      ]
    };

    pickupRepository.create(newPickup);

    // Add Priority item
    priorityRepository.create({
      id: `prio-${Date.now()}`,
      entityType: 'PICKUP',
      entityId: newPickup.id,
      title: `Pickup ${reqNum}: ${newPickup.estimatedWeightKg}kg ${newPickup.category}`,
      location: newPickup.location.address,
      priority: newPickup.estimatedWeightKg > 20 || newPickup.category === 'Hazardous' || newPickup.category === 'E-Waste' ? 'HIGH' : 'MEDIUM',
      score: newPickup.category === 'Hazardous' ? 92 : newPickup.category === 'E-Waste' ? 84 : 70,
      reason: `Citizen requested ${newPickup.category} collection for ${newPickup.preferredDate}.`,
      recommendedAction: 'Assign local zone hauler within preferred time window.',
      timeSensitivity: newPickup.preferredTimeSlot,
      zone: newPickup.location.zone
    });

    // Notify citizen & admin
    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: citizenId,
      title: 'Pickup Request Scheduled',
      message: `Your pickup ${reqNum} for ${newPickup.category} has been logged. Verification OTP: ${otp}`,
      type: 'pickup',
      timestamp: 'Just now',
      read: false,
      priority: 'NORMAL'
    });

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: citizenId,
      userName: citizen?.name || 'Citizen',
      role: 'citizen',
      action: 'CREATE_PICKUP',
      entity: reqNum,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
      details: `Scheduled ${newPickup.estimatedWeightKg}kg ${newPickup.category} collection.`
    });

    return newPickup;
  }

  public updateStatus(id: string, status: PickupStatus, actorId?: string, note?: string, collectedWeightKg?: number): PickupRequest {
    const pickup = this.getPickupById(id);

    const history = pickup.statusHistory || [];
    history.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status transitioned to ${status}`,
      actorId
    });

    const updated = pickupRepository.update(pickup.id, {
      status,
      collectedWeightKg: collectedWeightKg || pickup.collectedWeightKg,
      statusHistory: history
    });

    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: pickup.citizenId,
      title: `Pickup ${pickup.requestNumber} Status: ${status.replace('_', ' ')}`,
      message: `Your waste collection is now in '${status.replace('_', ' ')}' state.`,
      type: 'pickup',
      timestamp: 'Just now',
      read: false,
      priority: 'NORMAL'
    });

    return updated!;
  }

  public assignVehicle(pickupId: string, vehicleId: string, actorId?: string): PickupRequest {
    const pickup = this.getPickupById(pickupId);
    const vehicle = vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new AppError(`Vehicle '${vehicleId}' not found.`, 404, 'VEHICLE_NOT_FOUND');
    }

    const history = pickup.statusHistory || [];
    history.push({
      status: 'ASSIGNED',
      timestamp: new Date().toISOString(),
      note: `Assigned to vehicle ${vehicle.plateNumber} (${vehicle.driverName})`,
      actorId
    });

    const updated = pickupRepository.update(pickup.id, {
      status: 'ASSIGNED',
      assignedVehicleId: vehicle.id,
      assignedDriverName: vehicle.driverName,
      statusHistory: history
    });

    // Notify citizen of driver assignment
    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: pickup.citizenId,
      title: 'Driver Assigned for Collection',
      message: `Driver ${vehicle.driverName} (${vehicle.plateNumber}) has been assigned to pickup ${pickup.requestNumber}.`,
      type: 'pickup',
      timestamp: 'Just now',
      read: false,
      priority: 'HIGH'
    });

    return updated!;
  }

  public verifyPickup(pickupId: string, otp: string, actorId?: string): {
    success: boolean;
    pickup: PickupRequest;
    pointsEarned: number;
    co2SavedKg: number;
    receipt: any;
  } {
    const pickup = this.getPickupById(pickupId);

    if (pickup.status === 'VERIFIED' || pickup.status === 'COMPLETED') {
      throw new AppError('This pickup has already been verified and closed. Duplicate verification rejected.', 400, 'ALREADY_VERIFIED');
    }

    if (pickup.verificationOtp.trim() !== otp.trim()) {
      throw new AppError('Invalid OTP verification code. Please check with citizen.', 400, 'INVALID_OTP');
    }

    const earnedPoints = pickup.pointsEarned || Math.round(pickup.estimatedWeightKg * 10);
    const co2Saved = pickup.co2SavedKg || Number((pickup.estimatedWeightKg * 1.4).toFixed(1));

    const history = pickup.statusHistory || [];
    history.push({
      status: 'VERIFIED',
      timestamp: new Date().toISOString(),
      note: `OTP verified by driver. Collection confirmed.`,
      actorId
    });

    const updated = pickupRepository.update(pickup.id, {
      status: 'VERIFIED',
      collectedAt: new Date().toISOString(),
      collectedWeightKg: pickup.estimatedWeightKg,
      statusHistory: history
    })!;

    // Credit citizen eco-points
    const citizen = userRepository.findById(pickup.citizenId);
    if (citizen) {
      userRepository.update(citizen.id, {
        points: (citizen.points || 0) + earnedPoints
      });
    }

    // Increment environmental statistics
    environmentRepository.updateStats({
      totalWasteCollectedTons: Number((environmentRepository.getStats().totalWasteCollectedTons + (pickup.estimatedWeightKg / 1000)).toFixed(3)),
      divertedFromLandfillTons: Number((environmentRepository.getStats().divertedFromLandfillTons + (pickup.estimatedWeightKg / 1000)).toFixed(3)),
      co2ReductionTons: Number((environmentRepository.getStats().co2ReductionTons + (co2Saved / 1000)).toFixed(3))
    });

    // Notifications
    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: pickup.citizenId,
      title: 'Collection Verified! Eco-Points Awarded',
      message: `Pickup ${pickup.requestNumber} confirmed. +${earnedPoints} Eco-Points added! CO2 avoided: ${co2Saved}kg.`,
      type: 'rewards',
      timestamp: 'Just now',
      read: false,
      priority: 'HIGH'
    });

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: actorId || 'driver',
      userName: pickup.assignedDriverName || 'Driver',
      role: 'driver',
      action: 'OTP_VERIFY_SUCCESS',
      entity: pickup.requestNumber,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
      details: `Verified collection of ${pickup.estimatedWeightKg}kg ${pickup.category}. +${earnedPoints} points credited.`
    });

    const receipt = {
      receiptNumber: `RCP-${pickup.requestNumber}`,
      pickupId: pickup.id,
      citizenName: pickup.citizenName,
      category: pickup.category,
      weightKg: pickup.estimatedWeightKg,
      verifiedAt: new Date().toISOString(),
      pointsAwarded: earnedPoints,
      co2AvoidedKg: co2Saved,
      driverName: pickup.assignedDriverName || 'Assigned Driver',
      verificationMethod: 'OTP_TOKEN'
    };

    return {
      success: true,
      pickup: updated,
      pointsEarned: earnedPoints,
      co2SavedKg: co2Saved,
      receipt
    };
  }

  public cancelPickup(pickupId: string, citizenId: string, reason?: string): PickupRequest {
    const pickup = this.getPickupById(pickupId);
    if (pickup.citizenId !== citizenId) {
      throw new AppError('You can only cancel your own pickup requests.', 403, 'FORBIDDEN');
    }

    if (pickup.status === 'VERIFIED' || pickup.status === 'COMPLETED' || pickup.status === 'COLLECTED') {
      throw new AppError('Cannot cancel a pickup that has already been collected.', 400, 'CANNOT_CANCEL');
    }

    return this.updateStatus(pickup.id, 'CANCELLED', citizenId, reason || 'Cancelled by citizen');
  }
}

export const pickupService = new PickupService();
