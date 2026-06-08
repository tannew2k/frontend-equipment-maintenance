export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type MaintenanceType = 'preventive' | 'corrective' | 'inspection'

export interface MaintenanceRecord {
  id: string
  equipmentId: string
  equipmentCode: string
  equipmentName: string
  type: MaintenanceType
  status: MaintenanceStatus
  scheduledDate: string
  completedDate?: string
  assignedTo: string
  technicianName?: string
  description: string
  cost?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateMaintenanceRequest {
  equipmentId: string
  type: MaintenanceType
  scheduledDate: string
  assignedTo: string
  description: string
  notes?: string
}

export type UpdateMaintenanceRequest = Partial<CreateMaintenanceRequest> & {
  status?: MaintenanceStatus
  completedDate?: string
  cost?: number
}
