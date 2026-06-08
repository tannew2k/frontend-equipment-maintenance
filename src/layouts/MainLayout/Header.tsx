import { MdMenu, MdLogout, MdDarkMode, MdLightMode } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useTheme } from '@/hooks/use-theme'
import { useAuthStore } from '@/stores/auth-store'
import { USER_ROLE_LABEL } from '@/config/constants'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme()
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Mở/đóng menu">
        <MdMenu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Đổi giao diện">
          {isDark ? <MdLightMode className="h-4 w-4" /> : <MdDarkMode className="h-4 w-4" />}
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user?.role ? USER_ROLE_LABEL[user.role] : ''}</p>
        </div>

        <Button variant="ghost" size="sm" onClick={clearAuth} className="gap-1.5">
          <MdLogout className="h-4 w-4" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </Button>
      </div>
    </header>
  )
}
