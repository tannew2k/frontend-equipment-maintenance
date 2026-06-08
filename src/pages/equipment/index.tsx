import { useState } from 'react'
import { MdAdd, MdSearch } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EQUIPMENT_STATUS_LABEL } from '@/config/constants'

const mockData = [
  { id: '1', code: 'EQ-001', name: 'Máy điều hòa tầng 2', category: 'Điện lạnh', status: 'active', location: 'Tầng 2', lastMaintenance: '01/05/2026', nextMaintenance: '01/11/2026' },
  { id: '2', code: 'EQ-002', name: 'Máy phát điện dự phòng', category: 'Điện', status: 'maintenance', location: 'Tầng hầm', lastMaintenance: '15/04/2026', nextMaintenance: '15/10/2026' },
  { id: '3', code: 'EQ-003', name: 'Thang máy A', category: 'Cơ khí', status: 'active', location: 'Khu A', lastMaintenance: '20/05/2026', nextMaintenance: '20/11/2026' },
  { id: '4', code: 'EQ-004', name: 'Hệ thống PCCC tầng 1', category: 'An toàn', status: 'broken', location: 'Tầng 1', lastMaintenance: '10/03/2026', nextMaintenance: '—' },
]

type StatusVariant = 'success' | 'warning' | 'destructive' | 'neutral'
const statusVariant: Record<string, StatusVariant> = {
  active: 'success',
  maintenance: 'warning',
  broken: 'destructive',
  retired: 'neutral',
}

export default function EquipmentPage() {
  const [search, setSearch] = useState('')

  const filtered = mockData.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase())
  )

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
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  Không tìm thấy thiết bị nào
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.category}</TableCell>
                  <TableCell className="text-muted-foreground">{item.location}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>{EQUIPMENT_STATUS_LABEL[item.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.lastMaintenance}</TableCell>
                  <TableCell className="text-muted-foreground">{item.nextMaintenance}</TableCell>
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
