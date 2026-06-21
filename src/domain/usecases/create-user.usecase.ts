import { type UserRole } from "@/domain/entities/user.entity"

export type CreateUser = {
    username : string;
    password : string;
    role : UserRole;
}

export interface CreateUserUseCase {
    execute(user: CreateUser) : Promise<void>;
}