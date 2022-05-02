import { createDomain, guard, restore, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { PaginationState } from '~/common/create-pagination'
import { UsersQuery } from '~/api/_generated-types'
import { usersApi } from './common/users.api'

type User = Exclude<UsersQuery['users']['list'], null | undefined>[number]

export const usersDomain = createDomain()

export const fetchUsersFx = usersDomain.createEffect(
  (pagination: PaginationState) => usersApi.getUsers({ pagination })
)

export const updateUserFx = usersDomain.createEffect((user: User) => {
  return usersApi.updateUser({
    id: user.id,
    input: {
      role: user.role,
    },
  })
})

export const $users = usersDomain
  .createStore<User[]>([])
  .on(fetchUsersFx.doneData, (_, payload) => payload.list)
  .on(updateUserFx.done, (state, { params }) =>
    state.map((user) => (user.id === params.id ? params : user))
  )

export const $count = restore(
  fetchUsersFx.doneData.map(({ count }) => count),
  0
)

export const UsersGate = createGate<PaginationState>({
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
