import ApiService from '@/services/api/api-service'
import type { User, CreateUserRequest, UpdateUserRequest } from './user-types'
import type { PaginatedResponse, PaginationParams } from '@/types/common-types'

class UserService extends ApiService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<User>>('/users', { params })
  }

  getById(id: string) {
    return this.get<User>(`/users/${id}`)
  }

  create(data: CreateUserRequest) {
    return this.post<User>('/users', data)
  }

  update(id: string, data: UpdateUserRequest) {
    return this.put<User>(`/users/${id}`, data)
  }

  remove(id: string) {
    return this.delete<void>(`/users/${id}`)
  }
}

export const userService = new UserService()
