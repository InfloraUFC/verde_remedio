import { useRequest } from "@/shared/hooks/useRequest"
import { EndpointConfig } from "@/shared/types/api/http-types"

/**
 * Substitui os parâmetros de rota em um endpoint.
 *
 * Exemplo:
 * ```ts
 * resolveEndpoint('/users/:id', { id: 123 }) // '/users/123'
 * ```
 *
 * @param endpoint Endpoint com placeholders (ex: '/users/:id')
 * @param params Objeto com valores para substituir os placeholders (ex: { id: 123 })
 * @returns Endpoint com os parâmetros resolvidos
 */
export function resolveEndpoint(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  if (!params) return endpoint

  return Object.entries(params).reduce((url, [key, value]) => {
    return url.replace(`:${key}`, String(value))
  }, endpoint)
}

/**
 * Constrói uma query string a partir de um objeto de parâmetros.
 *
 * Exemplo:
 * ```ts
 * buildQuery({ page: 2, limit: 10 }) // '?page=2&limit=10'
 * ```
 *
 * @param query Objeto com pares chave-valor para a query string
 * @returns String da query (começando com '?') ou string vazia se não houver parâmetros
 */
export function buildQuery(query?: Record<string, string | number>): string {
  if (!query) return ''

  const search = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    search.append(key, String(value))
  })

  return `?${search.toString()}`
}

/**
 * Cria um hook personalizado para consumir um endpoint específico.
 *
 * O hook retornado contém:
 * - `data`: dados retornados pela requisição
 * - `loading`: booleano indicando se a requisição está em andamento
 * - `error`: erro ocorrido durante a requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @template TResponse Tipo esperado da resposta da requisição
 * @param endpoint Configuração do endpoint (`path` e `method`)
 * @returns Hook personalizado para consumir o endpoint
 *
 * @example
 * ```ts
 * const useGetUsers = createEndpointHook<User[]>({ path: '/users', method: 'GET' })
 * const { data, loading, error, fetchData } = useGetUsers()
 * useEffect(() => { fetchData() }, [])
 * ```
 */
export function createEndpointHook<TResponse>(
  endpoint: EndpointConfig
) {
  return function useEndpoint(
    params?: Record<string, string | number>,
    query?: Record<string, string | number>
  ) {
    const { data, loading, error, request } = useRequest<TResponse>()

    const fetchData = async () => {
      return request({
        endpoint: endpoint.path,
        method: endpoint.method,
        params,
        query,
      })
    }

    return { data, loading, error, fetchData }
  }
}
