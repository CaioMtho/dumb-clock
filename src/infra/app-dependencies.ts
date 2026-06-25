import { CreateClockCommandHandlerImpl } from '@/application/commands/create-clock.command-handler'
import { AuthenticateUserCommandHandlerImpl } from '@/application/commands/authenticate-user.command-handler'
import { CreateUserCommandHandlerImpl } from '@/application/commands/create-user.command-handler'
import { DeleteUserCommandHandlerImpl } from '@/application/commands/delete-user.command-handler'
import { UpdateUserCommandHandlerImpl } from '@/application/commands/update-user.command-handler'
import { EnsureAdminUserUseCaseImpl } from '@/application/use-cases/ensure-admin-user.usecase'
import { GetUserQueryHandlerImpl } from '@/application/queries/get-user.query-handler'
import { HashServiceImpl } from '@/application/services/hash.service'
import { ClockRepositoryImpl } from '@/infra/local-storage/clock.repository'
import { UserRepositoryImpl } from '@/infra/local-storage/user.repository'
import type { DepsContainer } from '@/presentation/deps'

const clockRepository = new ClockRepositoryImpl()
const userRepository = new UserRepositoryImpl()
const hashService = new HashServiceImpl()
const ensureAdminUserUseCase = new EnsureAdminUserUseCaseImpl(userRepository, hashService)

export async function bootstrapApplication(): Promise<void> {
  const defaultAdminUsername = import.meta.env.VITE_DEFAULT_ADMIN_USERNAME
  const defaultAdminPassword = import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD

  if (!defaultAdminUsername || !defaultAdminPassword) {
    throw new Error('Missing VITE_DEFAULT_ADMIN_USERNAME or VITE_DEFAULT_ADMIN_PASSWORD')
  }

  await ensureAdminUserUseCase.execute({
    username: defaultAdminUsername,
    password: defaultAdminPassword,
  })
}

export const appDependencies = {
  clockRepository,
  userRepository,
  hashService,
  createClockCommandHandler: new CreateClockCommandHandlerImpl(clockRepository),
  authenticateUserCommandHandler: new AuthenticateUserCommandHandlerImpl(
    userRepository,
    hashService,
  ),
  createUserCommandHandler: new CreateUserCommandHandlerImpl(userRepository, hashService),
  deleteUserCommandHandler: new DeleteUserCommandHandlerImpl(userRepository),
  updateUserCommandHandler: new UpdateUserCommandHandlerImpl(userRepository, hashService),
  getUserQueryHandler: new GetUserQueryHandlerImpl(userRepository),
} satisfies DepsContainer
