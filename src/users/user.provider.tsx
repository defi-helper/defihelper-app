import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'

import { AbilityContext, buildAbilityFor } from './user.ability'
import * as model from './user.model'

export type UserProviderProps = unknown

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const user = useStore(model.$user)

  const ability = useMemo(() => buildAbilityFor(user?.role), [user])

  useGate(model.Gate)

  return (
    <AbilityContext.Provider value={ability}>
      {props.children}
    </AbilityContext.Provider>
  )
}
