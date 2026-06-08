import { AppRouter } from '@/router'
import { useTheme } from '@/hooks/use-theme'

function App() {
  useTheme()
  return <AppRouter />
}

export default App
