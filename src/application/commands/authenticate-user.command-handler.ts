import { type AuthenticateUserCommand } from "@/application/models/commands/authenticate-user.command";
import { type HashService } from "@/domain/services/hash.service";
import { type UserRepository } from "@/domain/repositories/user.repository";

export interface AuthenticateUserCommandHandler {
    handle(command: AuthenticateUserCommand): Promise<boolean>;
}

export class AuthenticateUserCommandHandlerImpl implements AuthenticateUserCommandHandler {
    repository: UserRepository;
    hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async handle(command: AuthenticateUserCommand): Promise<boolean> {
        const existingUser = await this.repository.get(command.username);

        if (!existingUser) {
            return false;
        }

        return this.hashService.compare(command.password, existingUser.password);
    }
}
