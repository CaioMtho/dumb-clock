import { type UpdateUserCommand } from "@/application/models/commands/update-user.command";
import { type HashService } from "@/domain/services/hash.service";
import { type UserRepository } from "@/domain/repositories/user.repository";

export interface UpdateUserCommandHandler {
    handle(command: UpdateUserCommand): Promise<void>;
}

export class UpdateUserCommandHandlerImpl implements UpdateUserCommandHandler {
    repository: UserRepository;
    hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.repository = userRepository;
        this.hashService = hashService;
    }

    async handle(command: UpdateUserCommand): Promise<void> {
        const password = command.password !== undefined
            ? await this.hashService.hash(command.password)
            : undefined;

        return this.repository.update(
            command.id,
            command.username,
            password,
            command.requiredHours,
        );
    }
}
