import { MdAdd } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { USER_ROLE_LABEL } from '@/config/constants'

const mockUsers = [
  { id: '1', name: 'Nguyễn Văn Admin', email: 'admin@company.com', role: 'admin', department: 'IT', isActive: true },
  { id: '2', name: 'Trần Thị Kỹ thuật', email: 'kt01@company.com', role: 'technician', department: 'Bảo trì', isActive: true },
  { id: '3', name: 'Lê Văn Xem', email: 'viewer@company.com', role: 'viewer', department: 'Hành chính', isActive: false },
]

type BadgeVariant = 'info' | 'warning' | 'neutral'
const roleVariant: Record<string, BadgeVariant> = {
  admin: 'info',
  technician: 'warning',
  viewer: 'neutral',
}

export default function UsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Người dùng</h1>
        <Button>
          <MdAdd />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell className="text-muted-foreground">{user.department}</TableCell>
                <TableCell>
                  <Badge variant={roleVariant[user.role]}>{USER_ROLE_LABEL[user.role]}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? 'success' : 'neutral'}>
                    {user.isActive ? 'Hoạt động' : 'Vô hiệu'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Sửa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
