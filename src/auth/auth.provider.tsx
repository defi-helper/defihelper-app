import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'

import { useDialog } from '~/common/dialog'
import { AbilityContext, buildAbilityFor } from './auth.ability'
import { AuthBetaDialog, AuthMergeWallets } from './common'
import * as model from './auth.model'

export type AuthProviderProps = unknown

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const user = useStore(model.$user)

  const [openBetaDialog] = useDialog(AuthBetaDialog)
  const [openMergeWalletsDialog] = useDialog(AuthMergeWallets)

  const ability = useMemo(() => buildAbilityFor(user?.role), [user])

  useGate(model.UserGate, {
    openBetaDialog,
    openMergeWalletsDialog,
  })

  return (
    <AbilityContext.Provider value={ability}>
      {props.children}
    </AbilityContext.Provider>
  )
}
