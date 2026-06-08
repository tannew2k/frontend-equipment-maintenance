export type EquipmentStatus = 'active' | 'maintenance' | 'broken' | 'retired'
export type EquipmentCategory = 'electrical' | 'mechanical' | 'it' | 'facility' | 'vehicle' | 'other'

export interface Equipment {
  id: string
  code: string
  name: string
  category: EquipmentCategory
  status: EquipmentStatus
  location: string
  purchaseDate: string
  warrantyExpiry?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  notes?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export interface CreateEquipmentRequest {
  code: string
  name: string
  category: EquipmentCategory
  location: string
  purchaseDate: string
  warrantyExpiry?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  notes?: string
}

export type UpdateEquipmentRequest = Partial<CreateEquipmentRequest> & {
  status?: EquipmentStatus
  assignedTo?: string
}
