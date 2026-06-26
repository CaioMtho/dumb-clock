import type { UserRole } from '@/domain/entities/user.entity'

export type ListUsersQuery = {
  role?: UserRole
}
