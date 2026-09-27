import { notificationRepository } from '../repositories/notificationRepository';
import { NotificationItem } from '../types';

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
