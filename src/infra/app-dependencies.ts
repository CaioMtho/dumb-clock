import { CreateClockCommandHandlerImpl } from '@/application/commands/create-clock.command-handler'
import { AuthenticateUserCommandHandlerImpl } from '@/application/commands/authenticate-user.command-handler'
import { CreateUserCommandHandlerImpl } from '@/application/commands/create-user.command-handler'
import { DeleteUserCommandHandlerImpl } from '@/application/commands/delete-user.command-handler'
import { UpdateUserCommandHandlerImpl } from '@/application/commands/update-user.command-handler'
import { GetUserQueryHandlerImpl } from '@/application/queries/get-user.query-handler'
import { HashServiceImpl } from '@/application/services/hash.service'
import { ClockRepositoryImpl } from '@/infra/local-storage/clock.repository'
import { UserRepositoryImpl } from '@/infra/local-storage/user.repository'
import type { DepsContainer } from '@/presentation/deps'

const clockRepository = new ClockRepositoryImpl()
const userRepository = new UserRepositoryImpl()
const hashService = new HashServiceImpl()

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
