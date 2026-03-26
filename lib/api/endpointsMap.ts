import { HttpMethods } from "../../shared/types/api/http-types"

/**
 * Mapa de endpoints da API.
 *
 * Organiza os endpoints por recurso e operação.
 * Cada endpoint contém:
 * - `path`: caminho da rota, podendo ter parâmetros (`/users/:id`)
 * - `method`: método HTTP (`GET`, `POST`, `PUT`, `DELETE`)
 *
 * Exemplo de uso:
 * ```ts
 * import { endpointsMap } from './endpointsMap'
 * const userEndpoint = endpointsMap.users.getUser
 * console.log(userEndpoint.path)   // '/users/:id'
 * console.log(userEndpoint.method) // 'GET'
 * ```
 */
export const endpointsMap = {
  users: {
    getUsers: {
      path: '/users',
      method: HttpMethods.GET,
    },
    getUser: {
      path: '/users/:id',
      method: HttpMethods.GET,
    },
    createUser: {
      path: '/users',
      method: HttpMethods.POST,
    },
    updateUser: {
      path: '/users/:id',
      method: HttpMethods.PUT,
    },
    deleteUser: {
      path: '/users/:id',
      method: HttpMethods.DELETE,
    },
  },
} as const

/**
 * Tipo derivado do `endpointsMap`.
 *
 * Permite acessar os endpoints de forma tipada, útil para criar hooks
 * ou funções que consumam a API sem perder a tipagem dos paths e métodos.
 *
 * Exemplo:
 * ```ts
 * type UsersEndpoints = EndpointsMap['users']
 * const getUsersPath: string = endpointsMap.users.getUsers.path
 * ```
 */
export type EndpointsMap = typeof endpointsMap
