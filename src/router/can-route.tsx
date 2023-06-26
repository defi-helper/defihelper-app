import { Route, RouteProps, Redirect } from 'react-router-dom'
import { useStore } from 'effector-react'

import * as model from '~/auth/auth.model'
import { paths } from '~/paths'
import { useAbility } from '~/auth'
import { Actions, Subjects } from '~/auth/auth.ability'

type CanRouteProps = RouteProps & {
  action: Actions
  subject: Subjects
  redirectTo?: string
}

export const CanRoute: React.FC<CanRouteProps> = (props) => {
  const user = useStore(model.$user)

  const loading = useStore(model.fetchUserFx.pending)

  const ability = useAbility()

  const { children, action, subject, ...restOfProps } = props

  return (
    <>
      {loading && 'loading...'}
      {!loading && (
        <>
          {user && ability.can(action, subject) ? (
            <Route {...restOfProps}>{children}</Route>
          ) : (
            <Redirect to={props.redirectTo ?? paths.main} />
          )}
        </>
      )}
    </>
  )
}
