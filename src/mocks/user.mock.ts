import type { User } from '@/services/user/user-types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Admin',
    email: 'admin@company.com',
    role: 'admin',
    department: 'IT',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Trần Thị Kỹ thuật',
    email: 'kt01@company.com',
    role: 'technician',
    department: 'Bảo trì',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Lê Văn Xem',
    email: 'viewer@company.com',
    role: 'viewer',
    department: 'Hành chính',
    isActive: false,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
]
