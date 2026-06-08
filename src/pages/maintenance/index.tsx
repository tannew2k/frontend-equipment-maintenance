import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MAINTENANCE_STATUS_LABEL, MAINTENANCE_TYPE_LABEL } from '@/config/constants'
import { useMaintenanceQuery } from '@/hooks/useMaintenanceQuery'
import { formatDate } from '@/utils/date'

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

function TableSkeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-36 mb-1" />
        <Skeleton className="h-3 w-16" />
      </TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-5 w-24 rounded-full" /></TableCell>
      <TableCell />
    </TableRow>
  ))
}

export default function MaintenancePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { data: records, isLoading } = useMaintenanceQuery(activeFilter)

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
            {isLoading ? (
              <TableSkeleton />
            ) : !records || records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Không có lịch bảo trì nào
                </TableCell>
              </TableRow>
            ) : (
              records.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium">{item.equipmentName}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.equipmentCode}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{MAINTENANCE_TYPE_LABEL[item.type]}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(item.scheduledDate)}</TableCell>
                  <TableCell className="text-muted-foreground">{item.technicianName ?? '—'}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{item.description}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>{MAINTENANCE_STATUS_LABEL[item.status]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Xem</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
