import { type GetUserQuery } from "@/application/models/queries/get-user.query";
import { type User } from "@/domain/entities/user.entity";
import { type UserRepository } from "@/domain/repositories/user.repository";

export interface GetUserQueryHandler {
    handle(query: GetUserQuery): Promise<User | null>;
}

export class GetUserQueryHandlerImpl implements GetUserQueryHandler {
    repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    handle(query: GetUserQuery): Promise<User | null> {
        return this.repository.get(query.username);
    }
}
