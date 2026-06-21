import { type User } from "@/domain/entities/user.entity";

export interface GetUserUseCase {
    execute(username: string) : Promise<User | null>;
}
