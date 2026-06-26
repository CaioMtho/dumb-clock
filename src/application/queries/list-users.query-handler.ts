import type { ListUsersQuery } from '@/application/models/queries/list-users.query'
import type { User } from '@/domain/entities/user.entity'
import type { UserRepository } from '@/domain/repositories/user.repository'

export interface ListUsersQueryHandler {
  handle(query?: ListUsersQuery): Promise<User[]>
}

export class ListUsersQueryHandlerImpl implements ListUsersQueryHandler {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async handle(query: ListUsersQuery = {}): Promise<User[]> {
    const users = await this.userRepository.getAll()

    if (!query.role) {
      return users
    }

    return users.filter(user => user.role === query.role)
  }
}
