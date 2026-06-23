import { type User, type UserRole } from '../entities/user.entity.ts';

export interface UserRepository {
    create(username: string, password: string, role : UserRole, requiredHours?: number) : Promise<void>;
    update(id : string, username?: string, password?: string, requiredHours?: number) : Promise<void>;
    get(username: string) : Promise<User | null>;
    delete(id : string) : Promise<void>;
}
