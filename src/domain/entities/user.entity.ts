export interface User {
  id: string
  username: string
  displayName?: string | null
  password: string
  role: UserRole
  requiredHours?: number
}

export type UserRole =
  | 'admin'
  | 'collaborator'
