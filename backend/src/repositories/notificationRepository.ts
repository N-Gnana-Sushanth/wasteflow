import { db } from '../database/mockDb';
import { NotificationItem } from '../types';

export class NotificationRepository {
  public findById(id: string): NotificationItem | undefined {
    return db.notifications.find(n => n.id === id);
  }

  public findMany(predicate?: (item: NotificationItem) => boolean): NotificationItem[] {
    if (!predicate) return [...db.notifications];
    return db.notifications.filter(predicate);
  }

  public create(item: NotificationItem): NotificationItem {
    db.notifications.unshift(item);
    return item;
  }

  public markAsRead(id: string): boolean {
    const item = db.notifications.find(n => n.id === id);
    if (!item) return false;
    item.read = true;
    return true;
  }

  public markAllAsRead(userId?: string): void {
    db.notifications.forEach(n => {
      if (!userId || !n.userId || n.userId === userId) {
        n.read = true;
      }
    });
  }
}

export const notificationRepository = new NotificationRepository();
