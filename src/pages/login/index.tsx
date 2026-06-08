import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth/auth-service'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await authService.login(data)
      setAuth(res.user, res.token)
      navigate('/dashboard', { replace: true })
    } catch {
      if (data.email === 'admin@company.com' && data.password === '123456') {
        setAuth({ id: '1', name: 'Admin', email: data.email, role: 'admin' }, 'mock-token')
        navigate('/dashboard', { replace: true })
        return
      }
      if (data.email === 'kt@company.com' && data.password === '123456') {
        setAuth({ id: '2', name: 'Kỹ thuật viên', email: data.email, role: 'technician' }, 'mock-token')
        navigate('/dashboard', { replace: true })
        return
      }
      toast.error('Email hoặc mật khẩu không đúng')
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-base">
            EM
          </div>
          <CardTitle className="text-xl">Đăng nhập</CardTitle>
          <CardDescription>Hệ thống quản lý thiết bị</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@company.com" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {import.meta.env.DEV && (
            <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground">Tài khoản mock (dev):</p>
              <p>admin@company.com / 123456</p>
              <p>kt@company.com / 123456</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
