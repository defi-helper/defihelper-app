import React from 'react'
import {
  Route,
  Router as BrowserRouter,
  Switch,
  Redirect
} from 'react-router-dom'

import { PrivateRoute } from './private-route'
import { CanRoute } from './can-route'
import { paths } from '~/paths'
import { history } from '~/common/history'
import { ProtocolList } from '~/protocols/protocol-list'
import { ProtocolDetail } from '~/protocols/protocol-detail'
import { ProtocolCreate } from '~/protocols/protocol-create'
import { ProtocolUpdate } from '~/protocols/protocol-update'
import { StakingCreate } from '~/staking/staking-create'
import { StakingUpdate } from '~/staking/staking-update'
import { Dashboard } from '../dashboard'

export type RouterProps = unknown

export const Router: React.VFC<RouterProps> = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Redirect from={paths.main} to={paths.protocols.list} exact />
        <CanRoute
          action="create"
          subject="Protocol"
          path={paths.protocols.create}
        >
          <ProtocolCreate />
        </CanRoute>
        <CanRoute
          action="update"
          subject="Protocol"
          path={paths.protocols.update()}
        >
          <ProtocolUpdate />
        </CanRoute>
        <CanRoute
          action="create"
          subject="Contract"
          path={paths.staking.create()}
        >
          <StakingCreate />
        </CanRoute>
        <CanRoute
          action="update"
          subject="Contract"
          path={paths.staking.update()}
        >
          <StakingUpdate />
        </CanRoute>
        <Route path={paths.protocols.detail()}>
          <ProtocolDetail />
        </Route>
        <Route path={paths.protocols.list}>
          <ProtocolList />
        </Route>
        <PrivateRoute path={paths.dashboard}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
