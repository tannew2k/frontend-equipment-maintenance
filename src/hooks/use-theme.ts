import { useEffect } from 'react'
import { useThemeStore } from '@/stores/theme-store'

export function useTheme() {
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, toggleTheme }
}
