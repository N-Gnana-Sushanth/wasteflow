import { rewardRepository } from '../repositories/rewardRepository';
import { userRepository } from '../repositories/userRepository';
import { notificationRepository } from '../repositories/notificationRepository';
import { auditLogRepository } from '../repositories/wasteScanRepository';
import { RewardItem, CitizenBadge } from '../types';
import { AppError } from '../middleware/errorMiddleware';

export class RewardService {
  public getAllRewards(): RewardItem[] {
    return rewardRepository.findManyRewards();
  }

  public getAllBadges(): CitizenBadge[] {
    return rewardRepository.findManyBadges();
  }

  public getLeaderboard(): any[] {
    const citizens = userRepository.findMany(u => u.role === 'citizen');
    return citizens
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .slice(0, 10)
      .map((c, i) => ({
        rank: i + 1,
        id: c.id,
        name: c.name,
        avatar: c.avatar,
        points: c.points || 0,
        badge: c.badge || 'Green Citizen',
        level: c.level || 1,
        zone: c.zone || 'Zone 1'
      }));
  }

  public earnPoints(citizenId: string, points: number, reason: string): { newPoints: number; message: string } {
    const citizen = userRepository.findById(citizenId);
    if (!citizen) {
      throw new AppError('Citizen user not found.', 404, 'USER_NOT_FOUND');
    }

    const newPoints = (citizen.points || 0) + points;
    userRepository.update(citizen.id, { points: newPoints });

    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: citizenId,
      title: 'Eco-Points Credited!',
      message: `You earned +${points} Eco-Points for: ${reason}.`,
      type: 'rewards',
      timestamp: 'Just now',
      read: false,
      priority: 'NORMAL'
    });

    return { newPoints, message: `Successfully earned ${points} Eco-Points.` };
  }

  public claimReward(citizenId: string, rewardId: string): { reward: RewardItem; remainingPoints: number } {
    const citizen = userRepository.findById(citizenId);
    if (!citizen) {
      throw new AppError('Citizen not found.', 404, 'USER_NOT_FOUND');
    }

    const reward = rewardRepository.findById(rewardId);
    if (!reward) {
      throw new AppError('Reward not found.', 404, 'REWARD_NOT_FOUND');
    }

    if ((citizen.points || 0) < reward.pointsCost) {
      throw new AppError(`Insufficient eco-points. You need ${reward.pointsCost} points, but have ${citizen.points || 0}.`, 400, 'INSUFFICIENT_POINTS');
    }

    const remainingPoints = (citizen.points || 0) - reward.pointsCost;
    userRepository.update(citizen.id, { points: remainingPoints });
    rewardRepository.updateReward(reward.id, { claimed: true });

    notificationRepository.create({
      id: `notif-${Date.now()}`,
      userId: citizenId,
      title: 'Reward Redeemed Successfully!',
      message: `Your voucher for '${reward.name}' has been activated. Points balance: ${remainingPoints}.`,
      type: 'rewards',
      timestamp: 'Just now',
      read: false,
      priority: 'HIGH'
    });

    auditLogRepository.create({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: citizenId,
      userName: citizen.name,
      role: 'citizen',
      action: 'REDEEM_REWARD',
      entity: reward.name,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
      details: `Redeemed voucher for ${reward.pointsCost} points.`
    });

    return { reward: { ...reward, claimed: true }, remainingPoints };
  }
}

export const rewardService = new RewardService();
