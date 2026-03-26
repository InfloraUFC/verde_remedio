import { createEndpointHook } from "@/lib/api/endpoints";
import { endpointsMap } from "@/lib/api/endpointsMap";

export interface User {
  id: string
  name: string
  email: string
}

/**
 * Hook para buscar todos os usuários.
 *
 * @returns Objeto contendo:
 * - `data`: lista de usuários (`User[]`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: users, loading, error, fetchData } = useGetUsers()
 * useEffect(() => { fetchData() }, [])
 * ```
 */
export const useGetUsers = createEndpointHook<User[]>(endpointsMap.users.getUsers)

/**
 * Hook para buscar um usuário por ID.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 *
 * @returns Objeto contendo:
 * - `data`: usuário (`User`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: user, fetchData } = useGetUser()
 * useEffect(() => { fetchData({ id: '123' }) }, [])
 * ```
 */
export const useGetUser = createEndpointHook<User>(endpointsMap.users.getUser)

/**
 * Hook para criar um novo usuário.
 *
 * @param body Corpo da requisição: `{ name: string, email: string }`
 *
 * @returns Objeto contendo:
 * - `data`: usuário criado (`User`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useCreateUser()
 * fetchData(undefined, undefined, { name: 'Gustavo', email: 'gusto@test.com' })
 * ```
 */
export const useCreateUser = createEndpointHook<User>(endpointsMap.users.createUser)

/**
 * Hook para atualizar um usuário existente.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 * @param body Corpo da requisição com os campos a atualizar
 *
 * @returns Objeto contendo:
 * - `data`: usuário atualizado (`User`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useUpdateUser()
 * fetchData({ id: '123' }, undefined, { name: 'Novo Nome' })
 * ```
 */
export const useUpdateUser = createEndpointHook<User>(endpointsMap.users.updateUser)

/**
 * Hook para deletar um usuário por ID.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 *
 * @returns Objeto contendo:
 * - `data`: resultado da exclusão `{ success: boolean }`
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useDeleteUser()
 * fetchData({ id: '123' })
 * ```
 */
export const useDeleteUser = createEndpointHook<{ success: boolean }>(endpointsMap.users.deleteUser)
