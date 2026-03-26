import { act, renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HttpError } from '../types/api/http-errors'
import { useRequest } from './useRequest'
import { httpClient } from '@/lib/api/httpClient'

vi.mock('@/lib/api/httpClient', () => ({
  httpClient: {
    request: vi.fn(),
  },
}))

beforeEach(() => {
  vi.clearAllMocks()
})

function mockHttpResponse(data: object, status: number = 200) {
  vi.mocked(httpClient.request).mockResolvedValueOnce({
    data,
    status,
    headers: {},
  })
}

describe('useRequest', () => {
  it('should do GET successfully (default)', async () => {
    const responseData = { id: 1, name: 'Gustavo' }
    mockHttpResponse(responseData)

    const { result } = renderHook(() =>
      useRequest<typeof responseData>()
    )

    await act(async () => {
      const data = await result.current.request({
        endpoint: '/users/:id',
        params: { id: 1 },
      })

      expect(data).toEqual(responseData)
    })

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
      })
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(responseData)
  })

  it('should do POST successfully using body', async () => {
    const responseData = { id: 1 }
    mockHttpResponse(responseData)

    const { result } = renderHook(() =>
      useRequest<typeof responseData>()
    )

    await act(async () => {
      await result.current.request({
        method: 'POST',
        endpoint: '/users',
        body: { name: 'Gustavo' },
      })
    })

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        body: { name: 'Gustavo' },
      })
    )
  })

  it('should do PUT successfully using params and body', async () => {
    const responseData = { success: true }
    mockHttpResponse(responseData)

    const { result } = renderHook(() =>
      useRequest<typeof responseData>()
    )

    await act(async () => {
      await result.current.request({
        method: 'PUT',
        endpoint: '/users/:id',
        params: { id: 2 },
        body: { name: 'Novo nome' },
      })
    })

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PUT',
      })
    )
  })

  it('should do PATCH', async () => {
    const responseData = { updated: true }
    mockHttpResponse(responseData)

    const { result } = renderHook(() =>
      useRequest<typeof responseData>()
    )

    await act(async () => {
      await result.current.request({
        method: 'PATCH',
        endpoint: '/users/:id',
        params: { id: 3 },
        body: { active: false },
      })
    })

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PATCH',
      })
    )
  })

  it('should do DELETE successfully using params', async () => {
    const responseData = { deleted: true }
    mockHttpResponse(responseData)

    const { result } = renderHook(() =>
      useRequest<typeof responseData>()
    )

    await act(async () => {
      await result.current.request({
        method: 'DELETE',
        endpoint: '/users/:id',
        params: { id: 10 },
      })
    })

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
      })
    )
  })

  it('should resolve errors when request fails with HttpError', async () => {
    const httpError: HttpError = {
      message: 'Erro interno',
      status: 500,
    }

    vi.mocked(httpClient.request).mockRejectedValueOnce(httpError)

    const { result } = renderHook(() => useRequest())

    let error: HttpError | undefined

    await act(async () => {
      try {
        await result.current.request({
          endpoint: '/error',
        })
      } catch (err) {
        error = err as HttpError
      }
    })

    expect(error?.message).toBe('Erro interno')
    expect(result.current.error?.message).toBe('Erro interno')
    expect(result.current.loading).toBe(false)
  })

  it('should resolve network errors', async () => {
    const networkError: HttpError = {
      message: 'Network error',
    }

    vi.mocked(httpClient.request).mockRejectedValueOnce(networkError)

    const { result } = renderHook(() => useRequest())

    let error: HttpError | undefined

    await act(async () => {
      try {
        await result.current.request({
          endpoint: '/users',
        })
      } catch (err) {
        error = err as HttpError
      }
    })

    expect(error?.message).toBe('Network error')
    expect(result.current.error?.message).toBe('Network error')
    expect(result.current.loading).toBe(false)
  })
})
