import { describe, it, expect, beforeEach } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HttpClient } from './httpClient'
import { HttpError } from '@/shared/types/api/http-errors'

describe('HttpClient', () => {
  let mock: MockAdapter
  let client: HttpClient

  beforeEach(() => {
    const axiosInstance = axios.create()
    mock = new MockAdapter(axiosInstance)

    client = new HttpClient(axiosInstance)
  })

  it('should default method to GET', async () => {
    mock.onGet('/users').reply(200, [])

    const response = await client.request({
      url: '/users',
    })

    expect(response.status).toBe(200)
  })


  it('should perform a GET request successfully', async () => {
    mock.onGet('/users').reply(200, { id: 1 })

    const response = await client.request<{ id: number }>({
      url: '/users',
    })

    expect(response.status).toBe(200)
    expect(response.data.id).toBe(1)
  })

  it('should perform a POST request successfully', async () => {
    mock.onPost('/users').reply(200, { id: 1, name: 'Gustavo' })

    const response = await client.request<{ id: number, name: string }, { name: string }>({
      url: '/users',
      method: 'POST',
      body: {
        name: 'Gustavo',
      },
    })

    expect(response.status).toBe(200)
    expect(response.data.id).toBe(1)
    expect(response.data.name).toBe('Gustavo')
  })

  it('should perform a PUT request with id as param', async () => {
    mock.onPut('/users').reply(200, { id: 1, name: 'Gustavo' })

    const response = await client.request<{ id: number, name: string }, { name: string }>({
      url: '/users',
      method: 'PUT',
      body: {
        name: 'Gustavo',
      },
      params: {
        id: 1
      }
    })

    expect(response.status).toBe(200)
    expect(response.data.id).toBe(1)
    expect(response.data.name).toBe('Gustavo')
  })

  it('should perform a DELETE request with id as param', async () => {
    mock
      .onDelete('/users', { params: { id: 1 } })
      .reply(200, { success: true })

    const response = await client.request<{ success: boolean }>({
      url: '/users',
      method: 'DELETE',
      params: {
        id: 1,
      },
    })

    expect(response.status).toBe(200)
    expect(response.data.success).toBe(true)
  })


  it('should normalize axios error', async () => {
    mock.onGet('/error').reply(400, { message: 'Invalid request' })

    try {
      await client.request({ url: '/error' })
      throw new Error('Expected error')
    } catch (error) {
      const httpError = error as HttpError

      expect(httpError.status).toBe(400)
      expect(httpError.message).toBe('Invalid request')
    }
  })
})
