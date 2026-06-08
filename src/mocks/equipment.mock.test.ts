import { describe, it, expect } from 'vitest'
import { mockEquipment } from './equipment.mock'

describe('mockEquipment', () => {
  it('contains at least one item', () => {
    expect(mockEquipment.length).toBeGreaterThan(0)
  })

  it('each item has required fields', () => {
    for (const item of mockEquipment) {
      expect(item.id).toBeTruthy()
      expect(item.code).toMatch(/^EQ-\d{3}$/)
      expect(item.name).toBeTruthy()
      expect(item.location).toBeTruthy()
      expect(['active', 'maintenance', 'broken', 'retired']).toContain(item.status)
      expect(['electrical', 'mechanical', 'it', 'facility', 'vehicle', 'other']).toContain(item.category)
    }
  })

  it('codes are unique', () => {
    const codes = mockEquipment.map((e) => e.code)
    expect(new Set(codes).size).toBe(codes.length)
  })

  it('ids are unique', () => {
    const ids = mockEquipment.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
