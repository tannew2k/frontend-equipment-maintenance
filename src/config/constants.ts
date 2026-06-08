export const EQUIPMENT_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  BROKEN: 'broken',
  RETIRED: 'retired',
} as const

export const EQUIPMENT_STATUS_LABEL: Record<string, string> = {
  active: 'Hoạt động',
  maintenance: 'Đang bảo trì',
  broken: 'Hỏng hóc',
  retired: 'Ngưng sử dụng',
}

export const MAINTENANCE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const MAINTENANCE_STATUS_LABEL: Record<string, string> = {
  pending: 'Chờ xử lý',
  in_progress: 'Đang thực hiện',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}

export const MAINTENANCE_TYPE_LABEL: Record<string, string> = {
  preventive: 'Bảo trì định kỳ',
  corrective: 'Sửa chữa',
  inspection: 'Kiểm tra',
}

export const USER_ROLE_LABEL: Record<string, string> = {
  admin: 'Quản trị viên',
  technician: 'Kỹ thuật viên',
  viewer: 'Xem',
}

export const EQUIPMENT_CATEGORY_LABEL: Record<string, string> = {
  electrical: 'Điện',
  mechanical: 'Cơ khí',
  it: 'Công nghệ thông tin',
  facility: 'Cơ sở hạ tầng',
  vehicle: 'Phương tiện',
  other: 'Khác',
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50]
export const DEFAULT_PAGE_SIZE = 10
