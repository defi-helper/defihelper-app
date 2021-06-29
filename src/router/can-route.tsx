import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useStore } from 'effector-react'

import * as model from '~/users/user.model'
import { paths } from '~/paths'
import { useAbility } from '~/users'
import { Actions, Subjects } from '~/users/user.ability'

type CanRouteProps = RouteProps & {
  action: Actions
  subject: Subjects
}

export const CanRoute: React.FC<CanRouteProps> = (props) => {
  const user = useStore(model.$user)

  const loading = useStore(model.fetchUserFx.pending)

  const ability = useAbility()

  const { children, action, subject, ...restOfProps } = props

  if (loading && !user) {
    return <Route {...restOfProps}>loading...</Route>
  }

  return !loading && user && ability.can(action, subject) ? (
    <Route {...restOfProps}>{children}</Route>
  ) : (
    <Redirect to={paths.main} />
  )
}
