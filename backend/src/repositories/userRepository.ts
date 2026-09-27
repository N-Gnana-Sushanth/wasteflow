import { db } from '../database/mockDb';
import { User } from '../types';

export class UserRepository {
  public findById(id: string): User | undefined {
    return db.users.find(u => u.id === id);
  }

  public findByEmail(email: string): User | undefined {
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findMany(predicate?: (user: User) => boolean): User[] {
    if (!predicate) return [...db.users];
    return db.users.filter(predicate);
  }

  public create(user: User): User {
    db.users.push(user);
    return user;
  }

  public update(id: string, partial: Partial<User>): User | undefined {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    db.users[index] = { ...db.users[index], ...partial };
    return db.users[index];
  }

  public delete(id: string): boolean {
    const initialLen = db.users.length;
    db.users = db.users.filter(u => u.id !== id);
    return db.users.length < initialLen;
  }
}

export const userRepository = new UserRepository();
