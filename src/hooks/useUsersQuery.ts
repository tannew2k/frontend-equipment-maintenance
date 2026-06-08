import { useQuery } from '@tanstack/react-query'
import { mockUsers } from '@/mocks/user.mock'
import type { User } from '@/services/user/user-types'

export function useUsersQuery() {
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<User[]> => Promise.resolve(mockUsers),
  })
}
