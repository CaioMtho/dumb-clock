import { type User, type UserRole } from '../entities/user.entity.ts';

export interface UserRepository {
    create(username: string, password: string, role : UserRole, requiredHours?: number, displayName?: string | null) : Promise<void>;
    upsertByUsername(username: string, password: string, role : UserRole, requiredHours?: number, displayName?: string | null) : Promise<void>;
    update(id : string, username?: string, password?: string, requiredHours?: number, displayName?: string | null) : Promise<void>;
    get(username: string) : Promise<User | null>;
    getAll() : Promise<User[]>;
    delete(id : string) : Promise<void>;
}
