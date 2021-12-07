import { useEffect, useState } from 'react'
import { Route, RouteProps } from 'react-router-dom'

import * as auth from '~/auth'
import { SetupLayout } from '~/layouts/setup-layout'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const [hasKey, setHasKey] = useState<string | null>(auth.sidUtils.get())

  useEffect(() => {
    const unsubscribe = auth.sidUtils.subscribe(setHasKey)

    return unsubscribe
  }, [])

  return hasKey ? <Route {...props} /> : <SetupLayout />
}
