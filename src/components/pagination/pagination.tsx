import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis')
      acc.push(p)
      return acc
    }, [])

  return (
    <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
      <span>
        {from}–{to} / {total} kết quả
      </span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          <MdChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((item, i) =>
          item === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-1">…</span>
          ) : (
            <Button
              key={item}
              variant={item === page ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onPageChange(item)}
              className={cn('h-8 w-8 text-sm', item === page && 'pointer-events-none')}
            >
              {item}
            </Button>
          )
        )}

        <Button variant="ghost" size="icon" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          <MdChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
