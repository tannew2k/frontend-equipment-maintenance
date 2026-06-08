import { MdDevices, MdBuild, MdWarning, MdCheckCircle } from 'react-icons/md'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Tổng thiết bị', value: '248', icon: MdDevices, iconClass: 'text-blue-600 bg-blue-50' },
  { label: 'Đang hoạt động', value: '198', icon: MdCheckCircle, iconClass: 'text-green-600 bg-green-50' },
  { label: 'Đang bảo trì', value: '32', icon: MdBuild, iconClass: 'text-yellow-600 bg-yellow-50' },
  { label: 'Hỏng hóc', value: '18', icon: MdWarning, iconClass: 'text-red-600 bg-red-50' },
]

const chartData = [
  { month: 'T1', completed: 12, pending: 4 },
  { month: 'T2', completed: 8, pending: 6 },
  { month: 'T3', completed: 15, pending: 3 },
  { month: 'T4', completed: 10, pending: 8 },
  { month: 'T5', completed: 18, pending: 2 },
  { month: 'T6', completed: 14, pending: 5 },
]

const recentMaintenance = [
  { id: '1', equipment: 'Máy điều hòa tầng 2', type: 'Bảo trì định kỳ', date: '05/06/2026', status: 'completed' },
  { id: '2', equipment: 'Máy phát điện dự phòng', type: 'Sửa chữa', date: '07/06/2026', status: 'in_progress' },
  { id: '3', equipment: 'Thang máy A', type: 'Kiểm tra', date: '10/06/2026', status: 'pending' },
]

const statusBadge: Record<string, { label: string; variant: 'success' | 'warning' | 'neutral' }> = {
  completed: { label: 'Hoàn thành', variant: 'success' },
  in_progress: { label: 'Đang thực hiện', variant: 'warning' },
  pending: { label: 'Chờ xử lý', variant: 'neutral' },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-xl p-3 ${stat.iconClass}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lịch sử bảo trì 6 tháng gần nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="completed" name="Hoàn thành" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Chờ xử lý" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bảo trì gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMaintenance.map((item) => {
              const s = statusBadge[item.status]
              return (
                <div key={item.id} className="rounded-lg bg-muted/50 p-3 space-y-1.5">
                  <p className="text-sm font-medium">{item.equipment}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.type} · {item.date}
                  </p>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
