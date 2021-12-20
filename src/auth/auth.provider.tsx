import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'

import { BetaAccess } from '~/beta-access'
import { useDialog } from '~/common/dialog'
import { config } from '~/config'
import { UserRoleEnum } from '~/graphql/_generated-types'
import { AbilityContext, buildAbilityFor } from './auth.ability'
import * as model from './auth.model'
import { AuthBetaDialog } from './common'

export type AuthProviderProps = unknown

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const user = useStore(model.$user)

  const [openBetaDialog] = useDialog(AuthBetaDialog)

  const ability = useMemo(() => buildAbilityFor(user?.role), [user])

  useGate(model.UserGate, openBetaDialog)

  return (
    <AbilityContext.Provider value={ability}>
      {config.BETA && (user?.role === UserRoleEnum.Candidate || !user) && (
        <BetaAccess />
      )}
      {((user?.role &&
        [UserRoleEnum.User, UserRoleEnum.Admin].includes(user.role)) ||
        !config.BETA) &&
        props.children}
    </AbilityContext.Provider>
  )
}
