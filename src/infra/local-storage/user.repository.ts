import type { User, UserRole } from "@/domain/entities/user.entity";
import { type UserRepository } from "@/domain/repositories/user.repository";
import { Storage } from "./storage";

export class UserRepositoryImpl implements UserRepository {
    create(username: string, password: string, role : UserRole, requiredHours?: number): Promise<void> {
        const users : User[] = Storage.getAsObject<User[]>("users") || [];
        const newUser : User = {
            id : crypto.randomUUID(),
            username : username,
            password : password,
            role : role,
            requiredHours : requiredHours
        }

        users.push(newUser);
        Storage.setAsObject("users", users, true);
        return Promise.resolve();
    }

    update(id : string, username?: string, password?: string, requiredHours?: number): Promise<void> {
        const users : User[] = Storage.getAsObject<User[]>("users") || [];
        const user = users.find(u => u.id === id);

        if(!user) {
            return Promise.reject(new Error("User not found"));
        }

        if(username) {
            user.username = username;
        }

        if(password) {
            user.password = password;
        }

        if(requiredHours !== undefined) {
            user.requiredHours = requiredHours;
        }

        Storage.setAsObject("users", users, true);
        return Promise.resolve();
    }

    get(username: string): Promise<User | null> {
        const users : User[] = Storage.getAsObject<User[]>("users") || [];
        const user = users.find(u => u.username === username);
        return Promise.resolve(user || null);
    }

    delete(id: string): Promise<void> {
        const users : User[] = Storage.getAsObject<User[]>("users") || [];
        const filteredUsers = users.filter(u => u.id !== id);
        Storage.setAsObject("users", filteredUsers, true);
        return Promise.resolve();
    }
}
