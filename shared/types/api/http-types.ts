export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

export interface HttpRequestConfig<TBody = unknown> {
  url: string
  method?: HttpMethod
  params?: Record<string, unknown>
  body?: TBody
  headers?: Record<string, string>
}

export interface HttpResponse<TData = unknown> {
  data: TData
  status: number
  headers: Record<string, string>
}

export type EndpointConfig = {
  path: string
  method: HttpMethod
}
