import { apiClient } from './client';
import { Facility, Incident, RewardItem, CitizenBadge, NotificationItem, AIWasteAnalysisResult, EnvironmentalStats, AuditLog, WhatIfScenario, PriorityItem } from '../../types';

export const facilityApi = {
  getAll: async (): Promise<Facility[]> => {
    const res = await apiClient.get('/facilities');
    return res.data;
  },

  getById: async (id: string): Promise<Facility> => {
    const res = await apiClient.get(`/facilities/${id}`);
    return res.data;
  },

  getCapacity: async (id: string): Promise<any> => {
    const res = await apiClient.get(`/facilities/${id}/capacity`);
    return res.data;
  },

  getWeighbridgeQueue: async (id: string): Promise<any[]> => {
    const res = await apiClient.get(`/facilities/${id}/weighbridge`);
    return res.data;
  },

  update: async (id: string, data: Partial<Facility>): Promise<Facility> => {
    const res = await apiClient.put(`/facilities/${id}`, data);
    return res.data;
  }
};

export const reportApi = {
  getAll: async (params?: { status?: string; zone?: string }): Promise<Incident[]> => {
    const query = new URLSearchParams(params as any).toString();
    const endpoint = query ? `/reports/illegal-dumping?${query}` : '/reports/illegal-dumping';
    const res = await apiClient.get(endpoint);
    return res.data;
  },

  getById: async (id: string): Promise<Incident> => {
    const res = await apiClient.get(`/reports/illegal-dumping/${id}`);
    return res.data;
  },

  create: async (data: Partial<Incident>): Promise<Incident> => {
    const res = await apiClient.post('/reports/illegal-dumping', data);
    return res.data;
  },

  updateStatus: async (id: string, status: string, assignedCrew?: string): Promise<Incident> => {
    const res = await apiClient.put(`/reports/illegal-dumping/${id}/status`, { status, assignedCrew });
    return res.data;
  }
};

export const rewardApi = {
  getAll: async (): Promise<{ rewards: RewardItem[]; badges: CitizenBadge[] }> => {
    const res = await apiClient.get('/rewards');
    return res.data;
  },

  getLeaderboard: async (): Promise<any[]> => {
    const res = await apiClient.get('/rewards/leaderboard');
    return res.data;
  },

  claim: async (rewardId: string): Promise<any> => {
    const res = await apiClient.post('/rewards/claim', { rewardId });
    return res.data;
  },

  earn: async (points: number, reason: string): Promise<any> => {
    const res = await apiClient.post('/rewards/earn', { points, reason });
    return res.data;
  }
};

export const notificationApi = {
  getAll: async (): Promise<NotificationItem[]> => {
    const res = await apiClient.get('/notifications');
    return res.data;
  },

  markRead: async (id: string): Promise<void> => {
    await apiClient.put(`/notifications/${id}/read`);
  }
};

export const aiApi = {
  classifyWaste: async (imageSource: string, optionalLabel?: string): Promise<AIWasteAnalysisResult> => {
    const res = await apiClient.post('/ai/waste-classify', { imageSource, optionalLabel });
    return res.data;
  }
};

export const scenarioApi = {
  getAll: async (): Promise<WhatIfScenario[]> => {
    const res = await apiClient.get('/scenarios');
    return res.data;
  },

  simulate: async (scenarioId: string): Promise<any> => {
    const res = await apiClient.post('/scenarios/simulate', { scenarioId });
    return res.data;
  }
};

export const analyticsApi = {
  getEnvironmentalImpact: async (): Promise<EnvironmentalStats & { label: string }> => {
    const res = await apiClient.get('/environment/impact');
    return res.data;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    const res = await apiClient.get('/audit-logs');
    return res.data;
  },

  getDemandPredictions: async (): Promise<any> => {
    const res = await apiClient.get('/predictions/demand');
    return res.data;
  },

  getBinPredictions: async (): Promise<any> => {
    const res = await apiClient.get('/predictions/bins');
    return res.data;
  },

  getPriorities: async (): Promise<PriorityItem[]> => {
    const res = await apiClient.get('/priorities');
    return res.data;
  },

  resetDemoData: async (): Promise<void> => {
    await apiClient.post('/demo/reset');
  }
};
