import { MdDevices, MdBuild, MdWarning, MdCheckCircle } from 'react-icons/md'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardQuery } from '@/hooks/useDashboardQuery'

const statusBadge: Record<string, { label: string; variant: 'success' | 'warning' | 'neutral' }> = {
  completed: { label: 'Hoàn thành', variant: 'success' },
  in_progress: { label: 'Đang thực hiện', variant: 'warning' },
  pending: { label: 'Chờ xử lý', variant: 'neutral' },
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardQuery()

  const stats = data
    ? [
        { label: 'Tổng thiết bị', value: String(data.stats.total), icon: MdDevices, iconClass: 'text-blue-600 bg-blue-50' },
        { label: 'Đang hoạt động', value: String(data.stats.active), icon: MdCheckCircle, iconClass: 'text-green-600 bg-green-50' },
        { label: 'Đang bảo trì', value: String(data.stats.maintenance), icon: MdBuild, iconClass: 'text-yellow-600 bg-yellow-50' },
        { label: 'Hỏng hóc', value: String(data.stats.broken), icon: MdWarning, iconClass: 'text-red-600 bg-red-50' },
      ]
    : []

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => (
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
            {isLoading ? (
              <Skeleton className="h-65 w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data?.chartData} barSize={20}>
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bảo trì gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                ))
              : data?.recentMaintenance.map((item) => {
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
