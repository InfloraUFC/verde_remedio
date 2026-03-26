import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LocalStorageService } from './localStorage'

describe('LocalStorageService', () => {
  const initialValue = [10, 'test', null, { id: '01' }]

  beforeEach(() => {
    LocalStorageService.clearAll()
    vi.restoreAllMocks()
  })

  it('should find key in localStorage if value is set with the same key', () => {
    LocalStorageService.setValueByKey({ key: 'key', value: initialValue })

    const value = LocalStorageService.getValueByKey('key')

    expect(value).toStrictEqual(initialValue)
  })

  it('should return undefined if key does not exist', () => {
    const value = LocalStorageService.getValueByKey('key')

    expect(value).toBe(undefined)
  })

  it('should overwrite value if the same key is used again', () => {
    LocalStorageService.setValueByKey({ key: 'key', value: 'first' })
    LocalStorageService.setValueByKey({ key: 'key', value: 'second' })

    const value = LocalStorageService.getValueByKey('key')

    expect(value).toBe('second')
  })

  it('should clear value by key', () => {
    LocalStorageService.setValueByKey({ key: 'key', value: initialValue })

    const value = LocalStorageService.getValueByKey('key')
    expect(value).toStrictEqual(initialValue)

    LocalStorageService.clearValueByKey('key')

    const newValue = LocalStorageService.getValueByKey('key')
    expect(newValue).toBe(undefined)
    expect(localStorage.getItem('key')).toBeNull()
  })

  it('should clear all keys in localStorage', () => {
    LocalStorageService.setValueByKey({ key: 'key1', value: initialValue })
    LocalStorageService.setValueByKey({ key: 'key2', value: initialValue })

    expect(LocalStorageService.getValueByKey('key1')).toStrictEqual(initialValue)
    expect(LocalStorageService.getValueByKey('key2')).toStrictEqual(initialValue)

    LocalStorageService.clearAll()

    expect(LocalStorageService.getValueByKey('key1')).toBe(undefined)
    expect(LocalStorageService.getValueByKey('key2')).toBe(undefined)
    expect(localStorage.length).toBe(0)
  })

  it('should handle primitive values correctly', () => {
    LocalStorageService.setValueByKey({ key: 'boolean', value: true })
    LocalStorageService.setValueByKey({ key: 'number', value: 42 })
    LocalStorageService.setValueByKey({ key: 'string', value: 'hello' })

    expect(LocalStorageService.getValueByKey('boolean')).toBe(true)
    expect(LocalStorageService.getValueByKey('number')).toBe(42)
    expect(LocalStorageService.getValueByKey('string')).toBe('hello')
  })

  it('should store and retrieve null value', () => {
    LocalStorageService.setValueByKey({ key: 'null-key', value: null })

    const value = LocalStorageService.getValueByKey('null-key')

    expect(value).toBeNull()
  })

  it('should log error when JSON is invalid', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    localStorage.setItem('key', '{invalid-json')

    const value = LocalStorageService.getValueByKey('key')

    expect(value).toBe(undefined)
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  it('should not leak values between tests', () => {
    const value = LocalStorageService.getValueByKey('key')

    expect(value).toBe(undefined)
  })
})
