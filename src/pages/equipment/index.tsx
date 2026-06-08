import { useState } from 'react'
import { MdAdd, MdSearch } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EQUIPMENT_STATUS_LABEL, EQUIPMENT_CATEGORY_LABEL } from '@/config/constants'
import { useEquipmentQuery } from '@/hooks/use-equipment-query'
import { formatDate } from '@/utils/date'

type StatusVariant = 'success' | 'warning' | 'destructive' | 'neutral'
const statusVariant: Record<string, StatusVariant> = {
  active: 'success',
  maintenance: 'warning',
  broken: 'destructive',
  retired: 'neutral',
}

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      <TableCell />
    </TableRow>
  ))
}

export default function EquipmentPage() {
  const [search, setSearch] = useState('')
  const { data: equipment, isLoading } = useEquipmentQuery(search)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Thiết bị</h1>
        <Button>
          <MdAdd />
          Thêm thiết bị
        </Button>
      </div>

      <Card>
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <MdSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc mã thiết bị..."
            className="border-0 shadow-none focus-visible:ring-0 h-8 px-0"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Tên thiết bị</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Bảo trì lần cuối</TableHead>
              <TableHead>Bảo trì tiếp theo</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : !equipment || equipment.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  Không tìm thấy thiết bị nào
                </TableCell>
              </TableRow>
            ) : (
              equipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{EQUIPMENT_CATEGORY_LABEL[item.category]}</TableCell>
                  <TableCell className="text-muted-foreground">{item.location}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>{EQUIPMENT_STATUS_LABEL[item.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.lastMaintenanceDate ? formatDate(item.lastMaintenanceDate) : '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.nextMaintenanceDate ? formatDate(item.nextMaintenanceDate) : '—'}
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
