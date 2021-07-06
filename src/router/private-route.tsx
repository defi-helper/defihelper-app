import { Route, RouteProps, Redirect } from 'react-router-dom'

import * as users from '~/users'
import { paths } from '~/paths'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  return users.sidUtils.get() ? (
    <Route {...props} />
  ) : (
    <Redirect to={paths.main} />
  )
}
