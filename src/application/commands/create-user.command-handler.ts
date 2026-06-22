import { type CreateUserCommand } from "@/application/models/commands/create-user.command";
import { type HashService } from "@/domain/services/hash.service";
import { type UserRepository } from "@/domain/repositories/user.repository";

export interface CreateUserCommandHandler {
    handle(command: CreateUserCommand): Promise<void>;
}

export class CreateUserCommandHandlerImpl implements CreateUserCommandHandler {
    repository: UserRepository;
    hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const password = await this.hashService.hash(command.password);
        return this.repository.create(command.username, password, command.role);
    }
}
