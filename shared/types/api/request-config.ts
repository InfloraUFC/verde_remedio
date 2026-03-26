import { HttpMethod } from "./http-types"

export interface RequestConfig<TBody = unknown> {
  method?: HttpMethod
  endpoint: string
  params?: Record<string, string | number>
  query?: Record<string, string | number>
  body?: TBody
  headers?: Record<string, string>
}
