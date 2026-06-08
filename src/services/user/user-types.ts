import type { UserRole } from '@/stores/auth-store'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  department?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role: UserRole
  phone?: string
  department?: string
}

export type UpdateUserRequest = Partial<Omit<CreateUserRequest, 'password'>> & {
  isActive?: boolean
}
