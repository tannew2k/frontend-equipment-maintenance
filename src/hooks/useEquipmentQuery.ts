import { useQuery } from '@tanstack/react-query'
import { mockEquipment } from '@/mocks/equipment.mock'
import type { Equipment } from '@/services/equipment/equipment-types'

export function useEquipmentQuery(search = '') {
  return useQuery({
    queryKey: ['equipment', search],
    queryFn: (): Promise<Equipment[]> => Promise.resolve(mockEquipment),
    select: (data) => {
      if (!search) return data
      const q = search.toLowerCase()
      return data.filter(
        (e) => e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q),
      )
    },
  })
}
