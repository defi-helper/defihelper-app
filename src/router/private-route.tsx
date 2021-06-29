import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useStore } from 'effector-react'

import * as model from '~/users/user.model'
import { paths } from '~/paths'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const user = useStore(model.$user)

  const loading = useStore(model.fetchUserFx.pending)

  const { children, ...restOfProps } = props

  if (loading && !user) {
    return <Route {...restOfProps}>loading...</Route>
  }

  return !loading || user ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to={paths.main} />
  )
}
