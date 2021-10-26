import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'

import { BetaAccess } from '~/beta-access'
import { config } from '~/config'
import { UserRoleEnum } from '~/graphql/_generated-types'
import { AbilityContext, buildAbilityFor } from './user.ability'
import * as model from './user.model'

export type UserProviderProps = unknown

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const user = useStore(model.$user)
  const loading = useStore(model.fetchUserFx.pending)

  const ability = useMemo(() => buildAbilityFor(user?.role), [user])

  useGate(model.UserGate)

  return (
    <AbilityContext.Provider value={ability}>
      {loading && !user && 'loading...'}
      {!loading &&
        config.BETA &&
        (user?.role === UserRoleEnum.Candidate || !user) && <BetaAccess />}
      {!loading &&
        ((user?.role &&
          [UserRoleEnum.User, UserRoleEnum.Admin].includes(user.role)) ||
          !config.BETA) &&
        props.children}
    </AbilityContext.Provider>
  )
}
