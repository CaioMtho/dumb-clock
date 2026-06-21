import { type CreateUser, type CreateUserUseCase } from "@/domain/usecases/create-user.usecase";
import { type UserRepository } from "@/domain/repositories/user.repository";
import { type HashService } from "@/domain/services/hash.service";


export class CreateUserUseCaseImpl implements CreateUserUseCase {
    repository : UserRepository;
    hashService : HashService;

    constructor(userRepository : UserRepository, hashService : HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async execute(user: CreateUser): Promise<void> {
        const password = await this.hashService.hash(user.password);
        return this.repository.create(user.username, password, user.role);
    }
}
