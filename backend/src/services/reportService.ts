import { reportRepository } from '../repositories/reportRepository';
import { notificationRepository } from '../repositories/notificationRepository';
import { priorityRepository, auditLogRepository } from '../repositories/wasteScanRepository';
import { Incident, IncidentStatus, WasteCategory } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class ReportService {
  public getAllReports(filters?: { status?: IncidentStatus; zone?: string }): Incident[] {
    return reportRepository.findMany(r => {
      if (filters?.status && r.status !== filters.status) return false;
      if (filters?.zone && r.location.zone !== filters.zone) return false;
      return true;
    });
  }

  public getReportById(id: string): Incident {
    const report = reportRepository.findById(id);
    if (!report) {
      throw new AppError(`Report '${id}' not found.`, 404, 'REPORT_NOT_FOUND');
    }
    return report;
  }

  public createReport(reporterName: string, data: {
    type?: Incident['type'];
    location: { lat: number; lng: number; address: string; zone: string };
    category?: WasteCategory;
    severity?: Incident['severity'];
    description: string;
    imageUrl?: string;
  }): Incident {
    const incNum = `INC-2026-${Math.floor(4420 + Math.random() * 900)}`;

    const newReport: Incident = {
      id: `inc-${Date.now()}`,
      incidentNumber: incNum,
      type: data.type || 'Illegal Dumping',
      reportedBy: reporterName,
      reporterType: 'CITIZEN',
      location: data.location,
      category: data.category || 'Mixed',
      severity: data.severity || 'HIGH',
      status: 'REPORTED',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=80',
      description: data.description,
      aiDetectionConfidence: 94.8,
      reportedAt: new Date().toISOString(),
      repeatHotspot: true,
      repeatIncidentCount: 3
    };

    reportRepository.create(newReport);

    // Create priority entry for admin
    priorityRepository.create({
      id: `prio-${Date.now()}`,
      entityType: 'INCIDENT',
      entityId: newReport.id,
      title: `Emergency Dumping: ${newReport.location.zone}`,
      location: newReport.location.address,
      priority: newReport.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      score: 95,
      reason: `Citizen verified report (${newReport.description.substring(0, 40)}...). Repeat hotspot cluster.`,
      recommendedAction: 'Dispatch Rapid Clean Squad #2 within 45 minutes.',
      timeSensitivity: '< 45 mins',
      zone: newReport.location.zone
    });

    notificationRepository.create({
      id: `notif-${Date.now()}`,
      title: '🚨 Illegal Dumping Incident Reported',
      message: `Incident ${incNum} submitted at ${newReport.location.address}. AI prioritized for cleanup.`,
      type: 'emergency',
      timestamp: 'Just now',
      read: false,
      priority: 'CRITICAL'
    });

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'citizen',
      userName: reporterName,
      role: 'citizen',
      action: 'REPORT_ILLEGAL_DUMP',
      entity: incNum,
      ipAddress: '127.0.0.1',
      status: 'ALERT',
      details: `Citizen reported dumping at ${newReport.location.address}.`
    });

    return newReport;
  }

  public updateReportStatus(id: string, status: IncidentStatus, assignedCrew?: string): Incident {
    const report = this.getReportById(id);
    const updated = reportRepository.update(report.id, {
      status,
      assignedCrew: assignedCrew ?? report.assignedCrew,
      resolvedAt: status === 'RESOLVED' ? new Date().toISOString() : undefined
    });
    return updated!;
  }
}

export const reportService = new ReportService();
