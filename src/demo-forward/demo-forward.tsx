import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import * as authModel from '~/auth/auth.model'
import { paths } from '~/paths'

export const DemoForward: React.VFC = () => {
  useEffect(() => {
    authModel.logoutFx().then(() => authModel.authDemoFx())
  }, [])

  return <Redirect to={paths.portfolio} />
}
