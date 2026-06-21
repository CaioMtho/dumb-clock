import { type GetUserUseCase } from "@/domain/usecases/get-user.usecase";
import { type User } from "@/domain/entities/user.entity";
import { type UserRepository } from "@/domain/repositories/user.repository";

export class GetUserUseCaseImpl implements GetUserUseCase {
    repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    execute(username: string): Promise<User | null> {
        return this.repository.get(username);
    }
}
