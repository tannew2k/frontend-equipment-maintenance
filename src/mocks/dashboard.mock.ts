export interface ChartDataPoint {
  month: string
  completed: number
  pending: number
}

export interface RecentMaintenanceItem {
  id: string
  equipment: string
  type: string
  date: string
  status: 'completed' | 'in_progress' | 'pending'
}

export const mockChartData: ChartDataPoint[] = [
  { month: 'T1', completed: 12, pending: 4 },
  { month: 'T2', completed: 8, pending: 6 },
  { month: 'T3', completed: 15, pending: 3 },
  { month: 'T4', completed: 10, pending: 8 },
  { month: 'T5', completed: 18, pending: 2 },
  { month: 'T6', completed: 14, pending: 5 },
]

export const mockRecentMaintenance: RecentMaintenanceItem[] = [
  { id: '1', equipment: 'Máy điều hòa tầng 2', type: 'Bảo trì định kỳ', date: '05/06/2026', status: 'completed' },
  { id: '2', equipment: 'Máy phát điện dự phòng', type: 'Sửa chữa', date: '07/06/2026', status: 'in_progress' },
  { id: '3', equipment: 'Thang máy A', type: 'Kiểm tra', date: '10/06/2026', status: 'pending' },
]

export const mockDashboardStats = {
  total: 248,
  active: 198,
  maintenance: 32,
  broken: 18,
}
