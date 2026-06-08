import { MdDashboard, MdDevices, MdBuild, MdBarChart, MdPeople } from 'react-icons/md'
import type { IconType } from 'react-icons'

export interface NavItem {
  path: string
  label: string
  icon: IconType
  roles?: string[]
}

export const navigation: NavItem[] = [
  { path: '/dashboard', label: 'Tổng quan', icon: MdDashboard },
  { path: '/equipment', label: 'Thiết bị', icon: MdDevices },
  { path: '/maintenance', label: 'Bảo trì', icon: MdBuild },
  { path: '/reports', label: 'Báo cáo', icon: MdBarChart },
  { path: '/users', label: 'Người dùng', icon: MdPeople, roles: ['admin'] },
]
