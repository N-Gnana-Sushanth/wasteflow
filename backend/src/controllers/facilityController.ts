import { Request, Response, NextFunction } from 'express';
import { facilityService } from '../services/facilityService';
import { reportService } from '../services/reportService';
import { rewardService } from '../services/rewardService';
import { notificationService } from '../services/notificationService';
import { aiService } from '../services/aiService';
import { analyticsService } from '../services/analyticsService';
import { priorityRepository } from '../repositories/wasteScanRepository';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class FacilityController {
  public getAllFacilities(req: Request, res: Response, next: NextFunction) {
    try {
      const facilities = facilityService.getAllFacilities();
      res.status(200).json({ success: true, count: facilities.length, data: facilities });
    } catch (err) { next(err); }
  }

  public getFacilityById(req: Request, res: Response, next: NextFunction) {
    try {
      const facility = facilityService.getFacilityById(req.params.id);
      res.status(200).json({ success: true, data: facility });
    } catch (err) { next(err); }
  }

  public getFacilityCapacity(req: Request, res: Response, next: NextFunction) {
    try {
      const capacity = facilityService.getFacilityCapacity(req.params.id);
      res.status(200).json({ success: true, data: capacity });
    } catch (err) { next(err); }
  }

  public getWeighbridgeQueue(req: Request, res: Response, next: NextFunction) {
    try {
      const queue = facilityService.getIncomingWeighbridgeQueue(req.params.id);
      res.status(200).json({ success: true, data: queue });
    } catch (err) { next(err); }
  }

  public updateFacility(req: Request, res: Response, next: NextFunction) {
    try {
      const facility = facilityService.updateFacility(req.params.id, req.body);
      res.status(200).json({ success: true, data: facility });
    } catch (err) { next(err); }
  }
}

export const facilityController = new FacilityController();

export class ReportController {
  public getAllReports(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, zone } = req.query;
      const reports = reportService.getAllReports({ status: status as any, zone: zone as string });
      res.status(200).json({ success: true, count: reports.length, data: reports });
    } catch (err) { next(err); }
  }

  public getReportById(req: Request, res: Response, next: NextFunction) {
    try {
      const report = reportService.getReportById(req.params.id);
      res.status(200).json({ success: true, data: report });
    } catch (err) { next(err); }
  }

  public createReport(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const reporterName = req.user?.name || 'Citizen Reporter';
      const report = reportService.createReport(reporterName, req.body);
      res.status(201).json({ success: true, message: 'Illegal dumping incident submitted.', data: report });
    } catch (err) { next(err); }
  }

  public updateReportStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, assignedCrew } = req.body;
      const report = reportService.updateReportStatus(req.params.id, status, assignedCrew);
      res.status(200).json({ success: true, message: 'Incident status updated.', data: report });
    } catch (err) { next(err); }
  }
}

export const reportController = new ReportController();

export class RewardController {
  public getAllRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const rewards = rewardService.getAllRewards();
      const badges = rewardService.getAllBadges();
      res.status(200).json({ success: true, data: { rewards, badges } });
    } catch (err) { next(err); }
  }

  public getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = rewardService.getLeaderboard();
      res.status(200).json({ success: true, data: leaderboard });
    } catch (err) { next(err); }
  }

  public earnPoints(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { points, reason } = req.body;
      const result = rewardService.earnPoints(req.user!.id, points, reason);
      res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
  }

  public claimReward(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { rewardId } = req.body;
      const result = rewardService.claimReward(req.user!.id, rewardId);
      res.status(200).json({ success: true, message: 'Reward redeemed successfully.', data: result });
    } catch (err) { next(err); }
  }
}

export const rewardController = new RewardController();

export class NotificationController {
  public getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const notifications = notificationService.getNotifications(req.user?.id);
      res.status(200).json({ success: true, data: notifications });
    } catch (err) { next(err); }
  }

  public markRead(req: Request, res: Response, next: NextFunction) {
    try {
      notificationService.markAsRead(req.params.id);
      res.status(200).json({ success: true, message: 'Notification marked as read.' });
    } catch (err) { next(err); }
  }
}

export const notificationController = new NotificationController();

export class AiController {
  public classifyWaste(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { imageSource, optionalLabel } = req.body;
      const result = aiService.classifyWaste(imageSource, optionalLabel, req.user?.id);
      res.status(200).json({ success: true, data: result });
    } catch (err) { next(err); }
  }
}

export const aiController = new AiController();

export class AnalyticsController {
  public getEnvironmentalImpact(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = analyticsService.getEnvironmentalImpact();
      res.status(200).json({ success: true, data: stats });
    } catch (err) { next(err); }
  }

  public getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const logs = analyticsService.getAuditLogs();
      res.status(200).json({ success: true, data: logs });
    } catch (err) { next(err); }
  }

  public getDemandPredictions(req: Request, res: Response, next: NextFunction) {
    try {
      const predictions = analyticsService.getDemandPredictions();
      res.status(200).json({ success: true, data: predictions });
    } catch (err) { next(err); }
  }

  public getBinPredictions(req: Request, res: Response, next: NextFunction) {
    try {
      const predictions = analyticsService.getBinPredictions();
      res.status(200).json({ success: true, data: predictions });
    } catch (err) { next(err); }
  }

  public getPriorities(req: Request, res: Response, next: NextFunction) {
    try {
      const priorities = priorityRepository.findMany();
      res.status(200).json({ success: true, data: priorities });
    } catch (err) { next(err); }
  }
}

export const analyticsController = new AnalyticsController();
