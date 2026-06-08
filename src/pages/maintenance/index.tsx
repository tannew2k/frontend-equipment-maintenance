import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MAINTENANCE_STATUS_LABEL, MAINTENANCE_TYPE_LABEL } from '@/config/constants'

const mockData = [
  { id: '1', equipment: 'Máy điều hòa tầng 2', code: 'EQ-001', type: 'preventive', status: 'completed', scheduledDate: '01/06/2026', technician: 'Nguyễn Văn A', description: 'Vệ sinh phin lọc, kiểm tra gas' },
  { id: '2', equipment: 'Máy phát điện dự phòng', code: 'EQ-002', type: 'corrective', status: 'in_progress', scheduledDate: '07/06/2026', technician: 'Trần Thị B', description: 'Thay thế bộ khởi động' },
  { id: '3', equipment: 'Thang máy A', code: 'EQ-003', type: 'inspection', status: 'pending', scheduledDate: '15/06/2026', technician: 'Lê Văn C', description: 'Kiểm tra định kỳ 6 tháng' },
]

type StatusVariant = 'success' | 'warning' | 'destructive' | 'neutral'
const statusVariant: Record<string, StatusVariant> = {
  pending: 'neutral',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'destructive',
}

const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'in_progress', label: 'Đang thực hiện' },
  { value: 'completed', label: 'Hoàn thành' },
]

export default function MaintenancePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filtered = mockData.filter((m) => activeFilter === 'all' || m.status === activeFilter)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Lịch bảo trì</h1>
        <Button>
          <MdAdd />
          Tạo lịch bảo trì
        </Button>
      </div>

      <Card>
        <div className="flex gap-1 border-b px-4 py-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={activeFilter === f.value ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thiết bị</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Ngày thực hiện</TableHead>
              <TableHead>Kỹ thuật viên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.equipment}</p>
                  <p className="text-xs text-muted-foreground font-mono">{item.code}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{MAINTENANCE_TYPE_LABEL[item.type]}</TableCell>
                <TableCell className="text-muted-foreground">{item.scheduledDate}</TableCell>
                <TableCell className="text-muted-foreground">{item.technician}</TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">{item.description}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[item.status]}>{MAINTENANCE_STATUS_LABEL[item.status]}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Xem</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
