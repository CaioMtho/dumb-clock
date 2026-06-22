import { type UserRole } from "@/domain/entities/user.entity";

export type CreateUserCommand = {
    username: string;
    password: string;
    role: UserRole;
}
