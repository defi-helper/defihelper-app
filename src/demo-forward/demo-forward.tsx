import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import * as authModel from '~/auth/auth.model'
import { paths } from '~/paths'

export const DemoForward: React.VFC = () => {
  const history = useHistory()
  useEffect(() => {
    authModel
      .logoutFx()
      .then(() =>
        authModel.authDemoFx().then(() => history.push(paths.portfolio))
      )
  }, [history])

  return null
}
