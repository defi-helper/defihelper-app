import { createDomain, guard, restore, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { PaginationState } from '~/common/create-pagination'
import { UsersQuery } from '~/api/_generated-types'
import { usersApi } from './common/users.api'
import { authApi, sidUtils } from '~/auth/common'

type User = Exclude<UsersQuery['users']['list'], null | undefined>[number]

export const usersDomain = createDomain()

export const fetchUsersFx = usersDomain.createEffect(
  ({ pagination, search }: { pagination: PaginationState; search?: string }) =>
    usersApi.getUsers({
      pagination,
      filter: {
        wallet: {
          search,
        },
      },
    })
)

export const updateUserFx = usersDomain.createEffect((user: User) => {
  return usersApi.updateUser({
    id: user.id,
    input: {
      role: user.role,
    },
  })
})

export const loginByUserFx = usersDomain.createEffect((user: User) => {
  return authApi.authThroughAdmin(user.id)
})

export const $users = usersDomain
  .createStore<User[]>([])
  .on(fetchUsersFx.doneData, (_, payload) => payload.list)
  .on(updateUserFx.done, (state, { params }) =>
    state.map((user) => (user.id === params.id ? params : user))
  )
  .on(loginByUserFx.done, (_, { result }) => {
    sidUtils.set(result?.sid ?? sidUtils.get() ?? '')
  })

export const $count = restore(
  fetchUsersFx.doneData.map(({ count }) => count),
  0
)

export const UsersGate = createGate<{
  pagination: PaginationState
  search?: string
}>({
  name: 'UsersGate',
  domain: usersDomain,
})

sample({
  clock: guard({
    source: [authModel.$user, UsersGate.state, UsersGate.status],
    clock: [UsersGate.open, authModel.$user.updates, UsersGate.state.updates],
    filter: ([user, , isOpen]) => Boolean(user) && isOpen,
  }),
  fn: ([, pagination]) => pagination,
  target: fetchUsersFx,
})
