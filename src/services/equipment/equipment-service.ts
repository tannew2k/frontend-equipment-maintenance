import ApiService from '@/services/api/api-service'
import type { Equipment, CreateEquipmentRequest, UpdateEquipmentRequest } from './equipment-types'
import type { PaginatedResponse, PaginationParams } from '@/types/common-types'

class EquipmentService extends ApiService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Equipment>>('/equipment', { params })
  }

  getById(id: string) {
    return this.get<Equipment>(`/equipment/${id}`)
  }

  create(data: CreateEquipmentRequest) {
    return this.post<Equipment>('/equipment', data)
  }

  update(id: string, data: UpdateEquipmentRequest) {
    return this.put<Equipment>(`/equipment/${id}`, data)
  }

  remove(id: string) {
    return this.delete<void>(`/equipment/${id}`)
  }
}

export const equipmentService = new EquipmentService()
