import {
  Route,
  Router as BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom'

import { CanRoute } from './can-route'
import { paths } from '~/paths'
import { history } from '~/common/history'
import { ProtocolList } from '~/protocols/protocol-list'
import { ProtocolDetail } from '~/protocols/protocol-detail'
import { ProtocolDetailReadonly } from '~/protocols/protocol-detail-readonly'
import { ProtocolCreate } from '~/protocols/protocol-create'
import { ProtocolUpdate } from '~/protocols/protocol-update'
import { StakingCreate } from '~/staking/staking-create'
import { StakingUpdate } from '~/staking/staking-update'
import { Portfolio } from '~/portfolio'
import { RoadmapList } from '~/roadmap/roadmap-list'
import { RoadmapDetail } from '~/roadmap/roadmap-detail'
import { SettingsConfirmEmail } from '~/settings/settings-confirm-email'
import { NotFound } from '~/not-found'
import { Users } from '~/users'
import {
  GovernanceCreate,
  GovernanceDetail,
  GovernanceList,
} from '~/governance'
import { AutomationList } from '~/automations/automation-list'
import { Settings } from '~/settings'
import { AutomationHistoryList } from '~/automations/automation-history-list'
import { GovernanceMultisig } from '~/governance-multisig/governance-multisig'
import { Referral } from '~/referral'
import { PrivateRoute } from './private-route'
import { ReferralTransactions } from '~/referral/referral-transactions'
import { ReferralCalculator } from '~/referral/referral-calculator'
import { TradingView } from '~/trading-view'

export type RouterProps = unknown

export const Router: React.VFC<RouterProps> = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Redirect from={paths.main} to={paths.portfolio} exact />
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
        <Route path={paths.protocols.detailReadonly()}>
          <ProtocolDetailReadonly />
        </Route>
        <Route path={paths.protocols.detail()}>
          <ProtocolDetail />
        </Route>
        <Route path={paths.protocols.list}>
          <ProtocolList />
        </Route>
        <PrivateRoute path={paths.portfolio}>
          <Portfolio />
        </PrivateRoute>
        <Route path={paths.roadmap.detail()}>
          <RoadmapDetail />
        </Route>
        <Route path={paths.roadmap.list}>
          <RoadmapList />
        </Route>
        <Route path={paths.governance.create}>
          <GovernanceCreate />
        </Route>
        <Route path={paths.governance.detail()}>
          <GovernanceDetail />
        </Route>
        <Route path={paths.governance.list}>
          <GovernanceList />
        </Route>
        <PrivateRoute path={paths.governanceMultisig}>
          <GovernanceMultisig />
        </PrivateRoute>
        <PrivateRoute path={paths.automations.history()}>
          <AutomationHistoryList />
        </PrivateRoute>
        <PrivateRoute path={paths.automations.list}>
          <AutomationList />
        </PrivateRoute>
        <PrivateRoute path={paths.settings.confirmEmail()}>
          <SettingsConfirmEmail />
        </PrivateRoute>
        <PrivateRoute path={paths.settings.list}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute path={paths.referral.calculator}>
          <ReferralCalculator />
        </PrivateRoute>
        <PrivateRoute path={paths.referral.transactions}>
          <ReferralTransactions />
        </PrivateRoute>
        <PrivateRoute path={paths.referral.list}>
          <Referral />
        </PrivateRoute>
        <CanRoute action="read" subject="User" path={paths.users}>
          <Users />
        </CanRoute>
        <Route path="/trading-view">
          <TradingView />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
