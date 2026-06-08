import ApiService from '@/services/api/api-service'
import type { LoginRequest, LoginResponse, ChangePasswordRequest } from './auth-types'
import type { AuthUser } from '@/stores/auth-store'

class AuthService extends ApiService {
  login(data: LoginRequest) {
    return this.post<LoginResponse>('/auth/login', data)
  }

  logout() {
    return this.post<void>('/auth/logout')
  }

  getProfile() {
    return this.get<AuthUser>('/auth/me')
  }

  changePassword(data: ChangePasswordRequest) {
    return this.post<void>('/auth/change-password', data)
  }
}

export const authService = new AuthService()
