'use client'

import { useState, useCallback } from 'react'
import { RequestConfig } from '../types/api/request-config'
import { buildQuery, resolveEndpoint } from '@/lib/api/endpoints'
import { httpClient } from '@/lib/api/httpClient'
import { HttpError } from '../types/api/http-errors'

/**
 * Hook genérico para realizar requisições HTTP
 * utilizando o HttpClient (Axios instance).
 *
 * Responsabilidades:
 * - Controlar estado de loading
 * - Armazenar dados da resposta
 * - Armazenar erro normalizado (HttpError)
 *
 * Suporta:
 * - Métodos HTTP (GET, POST, PUT, PATCH, DELETE)
 * - Path params (`/users/:id`)
 * - Query params
 * - Body (JSON)
 * - Headers customizados
 *
 * @template TResponse Tipo esperado da resposta
 */
export function useRequest<TResponse = unknown>() {
  /**
   * Dados retornados pela última requisição bem-sucedida
   */
  const [data, setData] = useState<TResponse | null>(null)

  /**
   * Indica se uma requisição está em andamento
   */
  const [loading, setLoading] = useState(false)

  /**
   * Erro retornado pela requisição (normalizado pelo HttpClient)
   */
  const [error, setError] = useState<HttpError | null>(null)

  /**
   * Executa uma requisição HTTP.
   *
   * @template TBody Tipo do corpo da requisição
   *
   * @param config Configuração da requisição
   * @returns Promise<TResponse>
   *
   * @throws HttpError Caso a requisição falhe
   *
   * @example
   * ```ts
   * await request({
   *   endpoint: '/users/:id',
   *   params: { id: 1 }
   * })
   * ```
   */
  const request = useCallback(
    async <TBody = unknown>({
      method = 'GET',
      endpoint,
      params,
      query,
      body,
      headers,
    }: RequestConfig<TBody>): Promise<TResponse> => {
      setLoading(true)
      setError(null)

      try {
        // Resolve path params
        const resolvedEndpoint = resolveEndpoint(endpoint, params)

        // Constrói query string se existir
        const queryString = buildQuery(query)

        /**
         * Chamada para o HttpClient.
         *
         * A baseURL já está configurada internamente no Axios.
         */
        const response = await httpClient.request<TResponse, TBody>({
          url: `${resolvedEndpoint}${queryString}`,
          method,
          body,
          headers,
        })

        setData(response.data)
        return response.data
      } catch (err) {
        const normalizedError = err as HttpError
        setError(normalizedError)
        throw normalizedError
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    data,
    loading,
    error,
    request,
  }
}
