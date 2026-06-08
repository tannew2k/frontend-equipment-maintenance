# Equipment Maintenance — Frontend

Hệ thống quản lý thiết bị và lịch bảo trì. SPA React kết nối với REST API backend.

---

## Tech stack

| Lớp | Thư viện |
|---|---|
| UI framework | React 19 + TypeScript 5 (strict) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix) |
| State | Zustand 5 (auth, theme) |
| Server state | TanStack React Query 5 |
| Form + validation | React Hook Form 7 + Zod 3 |
| HTTP | Axios 1 |
| Routing | React Router 6 |
| Notification | Sonner |
| Charts | Recharts 3 |
| Testing | Vitest 4 + Testing Library |

---

## Yêu cầu

- Node.js >= 18
- npm >= 9

---

## Bắt đầu

```bash
# 1. Clone và cài dependencies
npm install

# 2. Tạo file env
cp .env.example .env

# 3. Chạy dev server
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Biến môi trường

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL của REST API | `http://localhost:8080/api` |

> Chỉ biến có prefix `VITE_` mới expose ra client code.

---

## Scripts

```bash
npm run dev          # Chạy dev server (port 5173)
npm run build        # Build production (tsc + vite)
npm run preview      # Preview production build
npm run lint         # Kiểm tra ESLint
npm run lint:fix     # Tự động sửa ESLint
npm run format       # Format code bằng Prettier
npm run test         # Chạy unit tests (một lần)
npm run test:watch   # Chạy tests ở watch mode
```

---

## Tài khoản mock (chỉ khi dev)

Hiển thị trên trang Login khi `NODE_ENV=development`:

| Email | Mật khẩu | Vai trò |
|---|---|---|
| admin@company.com | 123456 | Admin |
| kt@company.com | 123456 | Kỹ thuật viên |

---

## Cấu trúc thư mục

```
src/
├── components/
│   ├── ui/             # Primitive UI (Button, Card, Input, Badge, Skeleton, Table...)
│   └── pagination/     # Pagination component
├── config/
│   ├── api.ts          # Axios instance + interceptors
│   ├── constants.ts    # Label maps, page size options
│   └── navigation.tsx  # Cấu hình menu sidebar
├── hooks/
│   ├── useAuth.ts          # Wrapper đọc auth store
│   ├── useTheme.ts         # Áp dụng dark/light mode
│   ├── useEquipmentQuery.ts
│   ├── useMaintenanceQuery.ts
│   ├── useUsersQuery.ts
│   └── useDashboardQuery.ts
├── layouts/
│   ├── AuthLayout/     # Layout trang login
│   └── MainLayout/     # Layout chính: Sidebar + Header + <Outlet>
├── mocks/              # Dữ liệu mock cho dev (thay thế API call thật)
├── pages/              # Mỗi route = 1 folder
│   ├── dashboard/
│   ├── equipment/
│   ├── maintenance/
│   ├── reports/
│   ├── users/
│   ├── login/
│   └── not-found/
├── router/             # Khai báo routes + ProtectedRoute + GuestRoute
├── services/           # API service classes
│   ├── api/            # Base class ApiService
│   ├── auth/
│   ├── equipment/
│   ├── maintenance/
│   └── user/
├── stores/
│   ├── auth-store.ts   # JWT token + user info (persisted)
│   └── theme-store.ts  # Dark/light mode (persisted)
├── test/
│   └── setup.ts        # Vitest global setup (@testing-library/jest-dom)
├── types/
│   └── common-types.ts # PaginatedResponse, PaginationParams, ApiResponse...
└── utils/
    ├── cn.ts           # clsx + tailwind-merge
    └── date.ts         # dayjs helpers
```

---

## Kiến trúc luồng dữ liệu

```
Page component
  └── useXxxQuery (hook)          ← React Query caching
        └── service.getAll()      ← gọi API (hoặc mock data khi dev)
              └── ApiService      ← Axios instance có Bearer token
```

Auth flow:

```
Login form → authService.login() → setAuth(user, token)
  → Zustand (persist localStorage) → ProtectedRoute pass → vào app
  → 401 response → clearAuth() → redirect /login
```

---

## Hướng dẫn phát triển

Xem [DEVELOPMENT.md](./DEVELOPMENT.md) để biết cách đọc codebase và thêm module mới từ đầu đến cuối.
