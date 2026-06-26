import { type UserRole } from "@/domain/entities/user.entity";

export type CreateUserCommand = {
    username: string;
    displayName?: string | null;
    password: string;
    role: UserRole;
    requiredHours?: number;
}
