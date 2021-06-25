import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import { paths } from '~/paths'
import { ProtocolList } from '~/protocols/protocol-list'
import { ProtocolDetail } from '~/protocols/protocol-detail'
import { ProtocolCreate } from '~/protocols/protocol-create'
import { ProtocolUpdate } from '~/protocols/protocol-update'
import { StakingDetail } from '~/staking/staking-detail'

export type RouterProps = unknown

export const Router: React.VFC<RouterProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from={paths.main} to={paths.protocols.list} exact />
        <Route path={paths.protocols.create}>
          <ProtocolCreate />
        </Route>
        <Route path={paths.protocols.update()}>
          <ProtocolUpdate />
        </Route>
        <Route path={paths.protocols.detail()}>
          <ProtocolDetail />
        </Route>
        <Route path={paths.protocols.list}>
          <ProtocolList />
        </Route>
        <Route path={paths.staking.detail()}>
          <StakingDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
