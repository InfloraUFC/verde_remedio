export interface HttpError {
  message: string
  status?: number
  code?: string
  raw?: unknown
}
