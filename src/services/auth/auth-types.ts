import type { AuthUser } from '@/stores/auth-store'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  token: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}
