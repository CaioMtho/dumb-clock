import { type UserRepository } from '@/domain/repositories/user.repository'
import { type HashService } from '@/domain/services/hash.service'

export interface EnsureAdminUserUseCase {
  execute(input: EnsureAdminUserInput): Promise<void>
}

export type EnsureAdminUserInput = {
  username: string
  password: string
}

export class EnsureAdminUserUseCaseImpl implements EnsureAdminUserUseCase {
  private readonly userRepository: UserRepository
  private readonly hashService: HashService

  constructor(userRepository: UserRepository, hashService: HashService) {
    this.userRepository = userRepository
    this.hashService = hashService
  }

  async execute(input: EnsureAdminUserInput): Promise<void> {
    const password = await this.hashService.hash(input.password)

    return this.userRepository.upsertByUsername(
      input.username,
      password,
      'admin',
    )
  }
}
