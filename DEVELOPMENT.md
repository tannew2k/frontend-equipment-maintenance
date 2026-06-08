# Hướng dẫn phát triển

Tài liệu này giải thích cách đọc hiểu codebase và cách viết một module mới hoàn chỉnh từ đầu đến cuối.

---

## 1. Cách đọc codebase

### Bắt đầu từ đâu?

```
main.tsx               ← điểm khởi động, mount <App> + QueryClient + BrowserRouter
App.tsx                ← chỉ gọi useTheme() rồi render <AppRouter>
router/index.tsx       ← danh sách routes, ProtectedRoute, GuestRoute
layouts/MainLayout/    ← khung chứa toàn bộ trang sau khi đăng nhập
pages/                 ← mỗi route là 1 folder, file index.tsx là entry
```

### Luồng request đến khi hiển thị dữ liệu

```
Page component
  → gọi hook useXxxQuery()          [src/hooks/]
      → useQuery({ queryFn })        [React Query cache]
          → service.getAll()         [src/services/xxx/]
              → ApiService.get()     [src/services/api/api-service.ts]
                  → axios instance   [src/config/api.ts]
                      → REST API
```

**Khi chưa có API thật**, `queryFn` trả về mock data từ `src/mocks/`. Khi API sẵn sàng, chỉ cần đổi `queryFn` để gọi service thật — component không cần thay đổi.

### Đọc một service

Mỗi service nằm trong `src/services/<domain>/`:
- `<domain>-types.ts` — TypeScript interfaces cho entity này
- `<domain>-service.ts` — class extends `ApiService`, expose các method CRUD

```ts
// Ví dụ: src/services/equipment/equipment-service.ts
class EquipmentService extends ApiService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Equipment>>('/equipment', { params })
  }
}
export const equipmentService = new EquipmentService()  // singleton
```

### Đọc một store

Chỉ có 2 stores, đều dùng Zustand + persist:
- `auth-store.ts` — lưu `token` và `user`, tự động persist vào localStorage
- `theme-store.ts` — lưu `isDark`, tự động persist

Đọc store trong component:
```ts
const token = useAuthStore((s) => s.token)  // selector, re-render khi token đổi
```

Đọc store ngoài component (vd: trong Axios interceptor):
```ts
useAuthStore.getState().token  // snapshot tại thời điểm gọi
```

### Đọc một UI component

Tất cả primitive UI nằm trong `src/components/ui/`, được build trên Radix UI + CVA:
- Prop `variant` và `size` đến từ CVA (`class-variance-authority`)
- Prop `className` luôn được merge qua `cn()` — không bao giờ bị ghi đè mà mất

---

## 2. Quy ước đặt tên

| Thứ | Convention | Ví dụ |
|---|---|---|
| File | kebab-case | `equipment-service.ts`, `use-auth.ts` |
| Component | PascalCase | `EquipmentPage`, `TableSkeleton` |
| Hook | camelCase, prefix `use` | `useEquipmentQuery` |
| Store | camelCase, suffix `Store` | `useAuthStore` |
| Service instance | camelCase | `equipmentService` |
| Type/Interface | PascalCase | `Equipment`, `CreateEquipmentRequest` |
| Constant | UPPER_SNAKE_CASE | `EQUIPMENT_STATUS_LABEL` |

---

## 3. Viết module mới từ đầu đến cuối

Ví dụ thực tế: thêm module **Suppliers** (nhà cung cấp).

---

### Bước 1 — Định nghĩa types

Tạo `src/services/supplier/supplier-types.ts`:

```ts
export type SupplierStatus = 'active' | 'inactive'

export interface Supplier {
  id: string
  code: string
  name: string
  phone: string
  email: string
  address: string
  status: SupplierStatus
  createdAt: string
  updatedAt: string
}

export interface CreateSupplierRequest {
  code: string
  name: string
  phone: string
  email: string
  address: string
}

export type UpdateSupplierRequest = Partial<CreateSupplierRequest> & {
  status?: SupplierStatus
}
```

**Nguyên tắc:** tách `Create`, `Update` request ra khỏi entity — tránh truyền `id`, `createdAt` lên API.

---

### Bước 2 — Viết service

Tạo `src/services/supplier/supplier-service.ts`:

```ts
import ApiService from '@/services/api/api-service'
import type { Supplier, CreateSupplierRequest, UpdateSupplierRequest } from './supplier-types'
import type { PaginatedResponse, PaginationParams } from '@/types/common-types'

class SupplierService extends ApiService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Supplier>>('/suppliers', { params })
  }

  getById(id: string) {
    return this.get<Supplier>(`/suppliers/${id}`)
  }

  create(data: CreateSupplierRequest) {
    return this.post<Supplier>('/suppliers', data)
  }

  update(id: string, data: UpdateSupplierRequest) {
    return this.put<Supplier>(`/suppliers/${id}`, data)
  }

  remove(id: string) {
    return this.delete<void>(`/suppliers/${id}`)
  }
}

export const supplierService = new SupplierService()
```

---

### Bước 3 — Tạo mock data

Tạo `src/mocks/supplier.mock.ts`:

```ts
import type { Supplier } from '@/services/supplier/supplier-types'

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    code: 'SUP-001',
    name: 'Công ty TNHH ABC',
    phone: '0901234567',
    email: 'contact@abc.vn',
    address: 'Hà Nội',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]
```

---

### Bước 4 — Viết query hook

Tạo `src/hooks/useSuppliersQuery.ts`:

```ts
import { useQuery } from '@tanstack/react-query'
import { mockSuppliers } from '@/mocks/supplier.mock'
import type { Supplier } from '@/services/supplier/supplier-types'

export function useSuppliersQuery(search = '') {
  return useQuery({
    queryKey: ['suppliers', search],
    queryFn: (): Promise<Supplier[]> => Promise.resolve(mockSuppliers),
    // Khi có API: queryFn: () => supplierService.getAll({ search }).then(r => r.data)
    select: (data) => {
      if (!search) return data
      const q = search.toLowerCase()
      return data.filter(
        (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q),
      )
    },
  })
}
```

**Ghi chú:** `queryKey` phải bao gồm tất cả tham số ảnh hưởng đến kết quả (`search`, filter, page...) để React Query invalidate cache đúng.

---

### Bước 5 — Thêm constants

Trong `src/config/constants.ts`, thêm label map:

```ts
export const SUPPLIER_STATUS_LABEL: Record<string, string> = {
  active: 'Hoạt động',
  inactive: 'Ngưng hợp tác',
}
```

---

### Bước 6 — Viết page component

Tạo `src/pages/suppliers/index.tsx`:

```ts
import { useState } from 'react'
import { MdAdd, MdSearch } from 'react-icons/md'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SUPPLIER_STATUS_LABEL } from '@/config/constants'
import { useSuppliersQuery } from '@/hooks/useSuppliersQuery'

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
      <TableCell><Skeleton className="h-4 w-36" /></TableCell>
      <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
      <TableCell />
    </TableRow>
  ))
}

export default function SuppliersPage() {
  const [search, setSearch] = useState('')
  const { data: suppliers, isLoading } = useSuppliersQuery(search)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Nhà cung cấp</h1>
        <Button><MdAdd /> Thêm nhà cung cấp</Button>
      </div>

      <Card>
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <MdSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc mã..."
            className="border-0 shadow-none focus-visible:ring-0 h-8 px-0"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : !suppliers || suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Không tìm thấy nhà cung cấp nào
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s.code}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === 'active' ? 'success' : 'neutral'}>
                      {SUPPLIER_STATUS_LABEL[s.status]}
                    </Badge>
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
```

**Pattern cố định của mọi page list:**
1. State cho search/filter
2. Hook `useXxxQuery(search)` → destructure `{ data, isLoading }`
3. JSX: header → card → `{isLoading ? <Skeleton> : data?.map(...)}`

---

### Bước 7 — Đăng ký route

Trong `src/router/index.tsx`, thêm:

```ts
// Thêm vào phần lazy imports
const SuppliersPage = lazy(() => import('@/pages/suppliers'))

// Thêm vào trong <Route element={<ProtectedRoute>...}>
<Route path="/suppliers" element={<SuppliersPage />} />
```

---

### Bước 8 — Thêm vào sidebar

Trong `src/config/navigation.tsx`, thêm menu item:

```ts
import { MdLocalShipping } from 'react-icons/md'

{ path: '/suppliers', label: 'Nhà cung cấp', icon: MdLocalShipping }
```

---

### Bước 9 — Viết tests

Tạo `src/mocks/supplier.mock.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mockSuppliers } from './supplier.mock'

describe('mockSuppliers', () => {
  it('has required fields', () => {
    for (const s of mockSuppliers) {
      expect(s.id).toBeTruthy()
      expect(s.code).toMatch(/^SUP-\d{3}$/)
      expect(['active', 'inactive']).toContain(s.status)
    }
  })

  it('ids are unique', () => {
    const ids = mockSuppliers.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

Chạy: `npm test`

---

### Bước 10 — Kết nối API thật

Khi backend sẵn sàng, mở hook và đổi `queryFn`:

```ts
// Trước (mock)
queryFn: (): Promise<Supplier[]> => Promise.resolve(mockSuppliers),

// Sau (API thật)
queryFn: () => supplierService.getAll({ search }).then((res) => res.data),
```

Component và skeleton không cần thay đổi gì.

---

## 4. Checklist khi thêm module mới

- [ ] `src/services/<domain>/<domain>-types.ts` — types đầy đủ
- [ ] `src/services/<domain>/<domain>-service.ts` — CRUD methods
- [ ] `src/mocks/<domain>.mock.ts` — dữ liệu mock đúng type
- [ ] `src/hooks/use<Domain>Query.ts` — hook với React Query
- [ ] `src/config/constants.ts` — thêm label maps
- [ ] `src/pages/<domain>/index.tsx` — page với skeleton loading
- [ ] `src/router/index.tsx` — đăng ký route
- [ ] `src/config/navigation.tsx` — thêm menu sidebar
- [ ] `src/mocks/<domain>.mock.test.ts` — unit test kiểm tra shape
- [ ] `npm test` — tất cả tests pass

---

## 5. Những điều cần tránh

| Không nên | Thay bằng |
|---|---|
| Hardcode dữ liệu trong component | Đặt vào `src/mocks/` |
| Gọi API trực tiếp trong component | Qua hook `useXxxQuery` |
| Dùng `any` type | Định nghĩa interface đúng |
| Import store ngoài hook/component dùng `useStore()` | Dùng `useStore.getState()` |
| Thêm label map vào từng component | Đặt vào `src/config/constants.ts` |
| Quên empty state khi list rỗng | Luôn handle `length === 0` |
