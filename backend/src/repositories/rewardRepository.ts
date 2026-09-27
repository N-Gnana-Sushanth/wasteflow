import { db } from '../database/mockDb';
import { RewardItem, CitizenBadge } from '../types';

export class RewardRepository {
  public findById(id: string): RewardItem | undefined {
    return db.rewards.find(r => r.id === id);
  }

  public findManyRewards(): RewardItem[] {
    return [...db.rewards];
  }

  public findManyBadges(): CitizenBadge[] {
    return [...db.badges];
  }

  public updateReward(id: string, partial: Partial<RewardItem>): RewardItem | undefined {
    const index = db.rewards.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    db.rewards[index] = { ...db.rewards[index], ...partial };
    return db.rewards[index];
  }
}

export const rewardRepository = new RewardRepository();
