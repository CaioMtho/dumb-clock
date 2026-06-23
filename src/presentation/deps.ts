import { createContext, useContext } from 'react'

import type { CreateClockCommandHandler } from '@/application/commands/create-clock.command-handler'
import type { AuthenticateUserCommandHandler } from '@/application/commands/authenticate-user.command-handler'
import type { CreateUserCommandHandler } from '@/application/commands/create-user.command-handler'
import type { DeleteUserCommandHandler } from '@/application/commands/delete-user.command-handler'
import type { UpdateUserCommandHandler } from '@/application/commands/update-user.command-handler'
import type { GetUserQueryHandler } from '@/application/queries/get-user.query-handler'
import type { HashService } from '@/domain/services/hash.service'
import type { ClockRepository } from '@/domain/repositories/clock.repository'
import type { UserRepository } from '@/domain/repositories/user.repository'

export type DepsContainer = {
  clockRepository: ClockRepository
  userRepository: UserRepository
  hashService: HashService
  createClockCommandHandler: CreateClockCommandHandler
  authenticateUserCommandHandler: AuthenticateUserCommandHandler
  createUserCommandHandler: CreateUserCommandHandler
  deleteUserCommandHandler: DeleteUserCommandHandler
  updateUserCommandHandler: UpdateUserCommandHandler
  getUserQueryHandler: GetUserQueryHandler
}

export const DepsContext = createContext<DepsContainer | null>(null)

export function useDeps<K extends keyof DepsContainer>(key: K): DepsContainer[K] {
  const context = useContext(DepsContext)

  if (!context) {
    throw new Error('useDeps must be used within a DepsProvider')
  }

  return context[key]
}
