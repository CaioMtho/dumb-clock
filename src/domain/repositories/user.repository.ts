import { type User, type UserRole } from '../entities/user.entity.ts';

export interface UserRepository {
    create(username: string, password: string, role : UserRole) : Promise<void>;
    update(id : string, username?: string, password?: string) : Promise<void>;
    get(username: string) : Promise<User | null>;
    delete(id : string) : Promise<void>;
}
