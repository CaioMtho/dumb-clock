import { type AuthenticateUser, type AuthenticateUserUseCase } from "@/domain/usecases/authenticate-user.usecase";
import { type UserRepository } from "@/domain/repositories/user.repository";
import { type HashService } from "@/domain/services/hash.service";

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
    repository: UserRepository;
    hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async execute(user: AuthenticateUser): Promise<boolean> {
        const existingUser = await this.repository.get(user.username);

        if (!existingUser) {
            return false;
        }

        return this.hashService.compare(user.password, existingUser.password);
    }
}
