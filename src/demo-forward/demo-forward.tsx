import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import * as authModel from '~/auth/auth.model'

export const DemoForward: React.VFC = () => {
  const history = useHistory()

  localStorage.demo = true

  useEffect(() => {
    authModel.logoutFx().then(() => {
      authModel.authDemoFx()
    })
  }, [history])

  return null
}
