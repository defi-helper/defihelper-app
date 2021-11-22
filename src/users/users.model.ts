import { createDomain, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { UsersQuery } from '~/graphql/_generated-types'
import { usersApi } from './common/users.api'

type User = Exclude<UsersQuery['users']['list'], null | undefined>[number]

export const usersDomain = createDomain()

export const fetchUsersFx = usersDomain.createEffect(usersApi.getUsers)

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

export const UsersGate = createGate({
  name: 'UsersGate',
  domain: usersDomain,
})

guard({
  source: authModel.$user,
  clock: [UsersGate.open, authModel.$user.updates],
  filter: (user) => Boolean(user),
  target: fetchUsersFx,
})
