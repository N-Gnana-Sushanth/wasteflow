import { apiClient } from './client';
import { PickupRequest, PickupStatus } from '../../types';

export const pickupApi = {
  getAll: async (params?: { status?: PickupStatus; citizenId?: string; zone?: string }): Promise<PickupRequest[]> => {
    const query = new URLSearchParams(params as any).toString();
    const endpoint = query ? `/pickups?${query}` : '/pickups';
    const res = await apiClient.get(endpoint);
    return res.data;
  },

  getById: async (id: string): Promise<PickupRequest> => {
    const res = await apiClient.get(`/pickups/${id}`);
    return res.data;
  },

  create: async (data: Partial<PickupRequest>): Promise<PickupRequest> => {
    const res = await apiClient.post('/pickups', data);
    return res.data;
  },

  updateStatus: async (id: string, status: PickupStatus, notes?: string, collectedWeightKg?: number): Promise<PickupRequest> => {
    const res = await apiClient.put(`/pickups/${id}/status`, { status, notes, collectedWeightKg });
    return res.data;
  },

  assignVehicle: async (id: string, vehicleId: string): Promise<PickupRequest> => {
    const res = await apiClient.post(`/pickups/${id}/assign`, { vehicleId });
    return res.data;
  },

  verifyOtp: async (id: string, otp: string): Promise<{ success: boolean; pickup: PickupRequest; pointsEarned: number; co2SavedKg: number; receipt: any }> => {
    const res = await apiClient.post(`/pickups/${id}/verify`, { otp });
    return res.data;
  },

  cancel: async (id: string, reason?: string): Promise<PickupRequest> => {
    const res = await apiClient.post(`/pickups/${id}/cancel`, { reason });
    return res.data;
  }
};
