import { type DeleteUserCommand } from "@/application/models/commands/delete-user.command";
import { type UserRepository } from "@/domain/repositories/user.repository";

export interface DeleteUserCommandHandler {
    handle(command: DeleteUserCommand): Promise<void>;
}

export class DeleteUserCommandHandlerImpl implements DeleteUserCommandHandler {
    repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    handle(command: DeleteUserCommand): Promise<void> {
        return this.repository.delete(command.id);
    }
}
