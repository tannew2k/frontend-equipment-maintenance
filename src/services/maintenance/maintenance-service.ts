import ApiService from '@/services/api/api-service'
import type { MaintenanceRecord, CreateMaintenanceRequest, UpdateMaintenanceRequest } from './maintenance-types'
import type { PaginatedResponse, PaginationParams } from '@/types/common-types'

class MaintenanceService extends ApiService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<MaintenanceRecord>>('/maintenance', { params })
  }

  getById(id: string) {
    return this.get<MaintenanceRecord>(`/maintenance/${id}`)
  }

  getByEquipment(equipmentId: string, params?: PaginationParams) {
    return this.get<PaginatedResponse<MaintenanceRecord>>(`/equipment/${equipmentId}/maintenance`, { params })
  }

  create(data: CreateMaintenanceRequest) {
    return this.post<MaintenanceRecord>('/maintenance', data)
  }

  update(id: string, data: UpdateMaintenanceRequest) {
    return this.put<MaintenanceRecord>(`/maintenance/${id}`, data)
  }

  remove(id: string) {
    return this.delete<void>(`/maintenance/${id}`)
  }
}

export const maintenanceService = new MaintenanceService()
