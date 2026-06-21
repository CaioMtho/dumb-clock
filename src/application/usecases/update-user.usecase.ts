import { type UpdateUser, type UpdateUserUseCase } from "@/domain/usecases/update-user.usecase";
import { type UserRepository } from "@/domain/repositories/user.repository";
import { type HashService } from "@/domain/services/hash.service";

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    repository: UserRepository;
    hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async execute(user: UpdateUser): Promise<void> {
        const password = user.password !== undefined
            ? await this.hashService.hash(user.password)
            : undefined;

        return this.repository.update(user.id, user.username, password);
    }
}
