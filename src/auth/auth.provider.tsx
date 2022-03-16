import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { useDialog } from '~/common/dialog'
import { AbilityContext, buildAbilityFor } from './auth.ability'
import { AuthVideoDialog, AuthMergeWallets } from './common'
import * as model from './auth.model'

export type AuthProviderProps = unknown

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const user = useStore(model.$user)

  const [showVideo, setShowVideo] = useLocalStorage('video', false)

  const [openVideoDialog] = useDialog(AuthVideoDialog)
  const [openMergeWalletsDialog] = useDialog(AuthMergeWallets)

  const ability = useMemo(() => buildAbilityFor(user?.role), [user])

  const handleOpenVideoDialog = async () => {
    if (showVideo) return

    try {
      const result = await openVideoDialog()

      setShowVideo(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useGate(model.UserGate, {
    openVideoDialog: handleOpenVideoDialog,
    openMergeWalletsDialog,
  })

  return (
    <AbilityContext.Provider value={ability}>
      {props.children}
    </AbilityContext.Provider>
  )
}
