import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, isExpired, daysUntil } from './date'

describe('formatDate', () => {
  it('formats date to DD/MM/YYYY by default', () => {
    expect(formatDate('2026-06-08')).toBe('08/06/2026')
  })

  it('accepts custom format', () => {
    expect(formatDate('2026-06-08', 'YYYY/MM/DD')).toBe('2026/06/08')
  })

  it('accepts Date object', () => {
    expect(formatDate(new Date('2026-01-15'))).toBe('15/01/2026')
  })
})

describe('formatDateTime', () => {
  it('formats date and time', () => {
    expect(formatDateTime('2026-06-08T14:30:00')).toBe('08/06/2026 14:30')
  })
})

describe('isExpired', () => {
  it('returns true for past dates', () => {
    expect(isExpired('2020-01-01')).toBe(true)
  })

  it('returns false for future dates', () => {
    expect(isExpired('2099-12-31')).toBe(false)
  })
})

describe('daysUntil', () => {
  it('returns negative value for past dates', () => {
    expect(daysUntil('2020-01-01')).toBeLessThan(0)
  })

  it('returns positive value for future dates', () => {
    expect(daysUntil('2099-12-31')).toBeGreaterThan(0)
  })
})
