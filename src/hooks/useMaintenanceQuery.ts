import { useQuery } from '@tanstack/react-query'
import { mockMaintenance } from '@/mocks/maintenance.mock'
import type { MaintenanceRecord } from '@/services/maintenance/maintenance-types'

export function useMaintenanceQuery(statusFilter = 'all') {
  return useQuery({
    queryKey: ['maintenance', statusFilter],
    queryFn: (): Promise<MaintenanceRecord[]> => Promise.resolve(mockMaintenance),
    select: (data) => {
      if (statusFilter === 'all') return data
      return data.filter((m) => m.status === statusFilter)
    },
  })
}
