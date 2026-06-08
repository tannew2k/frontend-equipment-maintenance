import { useQuery } from '@tanstack/react-query'
import { mockChartData, mockRecentMaintenance, mockDashboardStats } from '@/mocks/dashboard.mock'

export function useDashboardQuery() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () =>
      Promise.resolve({
        stats: mockDashboardStats,
        chartData: mockChartData,
        recentMaintenance: mockRecentMaintenance,
      }),
  })
}
