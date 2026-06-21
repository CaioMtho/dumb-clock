import { type DeleteUserUseCase } from "@/domain/usecases/delete-user.usecase";
import { type UserRepository } from "@/domain/repositories/user.repository";

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
    repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    execute(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}
