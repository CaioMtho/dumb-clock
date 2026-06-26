import type { UserRole } from '@/domain/entities/user.entity'

const sessionStorageKey = 'dumb-clock-session'

export type AuthenticatedUser = {
  id: string
  username: string
  displayName: string | null
  role: UserRole
  requiredHours?: number
}

export function getAuthenticatedUser(): AuthenticatedUser | null {
  const storedSession = localStorage.getItem(sessionStorageKey)

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession) as AuthenticatedUser
  } catch {
    localStorage.removeItem(sessionStorageKey)
    return null
  }
}

export function setAuthenticatedUser(user: AuthenticatedUser): void {
  localStorage.setItem(sessionStorageKey, JSON.stringify(user))
}

export function clearAuthenticatedUser(): void {
  localStorage.removeItem(sessionStorageKey)
}

export function getUserDisplayName(user: Pick<AuthenticatedUser, 'displayName' | 'username'>): string {
  return user.displayName?.trim() || user.username
}
