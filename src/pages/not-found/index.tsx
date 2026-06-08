import { Link } from 'react-router-dom'
import { Button } from '@/components/button/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-8xl font-bold text-gray-100">404</p>
      <h1 className="text-xl font-semibold text-gray-700">Trang không tồn tại</h1>
      <p className="text-sm text-gray-500">Đường dẫn bạn truy cập không được tìm thấy.</p>
      <Link to="/dashboard">
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  )
}
