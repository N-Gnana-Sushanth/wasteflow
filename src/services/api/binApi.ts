import { apiClient } from './client';
import { SmartBin, Vehicle, OptimizedRoute } from '../../types';

export const binApi = {
  getAll: async (params?: { zone?: string; status?: string; category?: string }): Promise<SmartBin[]> => {
    const query = new URLSearchParams(params as any).toString();
    const endpoint = query ? `/bins?${query}` : '/bins';
    const res = await apiClient.get(endpoint);
    return res.data;
  },

  getById: async (id: string): Promise<SmartBin> => {
    const res = await apiClient.get(`/bins/${id}`);
    return res.data;
  },

  create: async (data: Partial<SmartBin>): Promise<SmartBin> => {
    const res = await apiClient.post('/bins', data);
    return res.data;
  },

  update: async (id: string, data: Partial<SmartBin>): Promise<SmartBin> => {
    const res = await apiClient.put(`/bins/${id}`, data);
    return res.data;
  },

  sendTelemetry: async (id: string, telemetry: { fillLevel: number; temperature?: number; batteryLevel?: number; tiltAngle?: number }): Promise<{ bin: SmartBin; alertTriggered: boolean; label: string }> => {
    const res = await apiClient.post(`/bins/${id}/telemetry`, telemetry);
    return res.data;
  }
};

export const vehicleApi = {
  getAll: async (params?: { status?: string; zone?: string }): Promise<Vehicle[]> => {
    const query = new URLSearchParams(params as any).toString();
    const endpoint = query ? `/vehicles?${query}` : '/vehicles';
    const res = await apiClient.get(endpoint);
    return res.data;
  },

  getById: async (id: string): Promise<Vehicle> => {
    const res = await apiClient.get(`/vehicles/${id}`);
    return res.data;
  },

  updateLocation: async (id: string, data: { lat: number; lng: number; heading?: number; fuelBatteryLevel?: number; status?: string }): Promise<Vehicle> => {
    const res = await apiClient.post(`/vehicles/${id}/location`, data);
    return res.data;
  },

  update: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const res = await apiClient.put(`/vehicles/${id}`, data);
    return res.data;
  }
};

export const routeApi = {
  optimize: async (): Promise<any> => {
    const res = await apiClient.post('/routes/optimize');
    return res.data;
  },

  getAll: async (): Promise<OptimizedRoute[]> => {
    const res = await apiClient.get('/routes');
    return res.data;
  },

  getDriverRoute: async (): Promise<OptimizedRoute> => {
    const res = await apiClient.get('/routes/driver/me');
    return res.data;
  },

  getById: async (id: string): Promise<OptimizedRoute> => {
    const res = await apiClient.get(`/routes/${id}`);
    return res.data;
  }
};
