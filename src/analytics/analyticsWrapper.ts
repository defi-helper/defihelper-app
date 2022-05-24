import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'

export const analytics = {
  onWalletConnected() {
    Promise.all([
      ym('reachGoal', 'wallet-connected'),
      ReactGA.ga('event', 'wallet_connected'),
    ])
  },
  onAutomationCreated() {
    Promise.all([
      ym('reachGoal', 'automation-created'),
      ReactGA.ga('event', 'automation_created'),
    ])
  },
  onDeposit() {
    Promise.all([
      ym('reachGoal', 'topped-up-balance'),
      ReactGA.ga('event', 'topped_up_balance'),
    ])
  },

  onAutoStakingEnabled() {
    Promise.all([
      ym('reachGoal', 'auto-staking-enabled'),
      ReactGA.ga('event', 'auto_staking_enabled'),
    ])
  },

  onNotificationsEnabled() {
    Promise.all([
      ym('reachGoal', 'auto-staking-enabled'),
      ReactGA.ga('event', 'auto_staking_enabled'),
    ])
  },
}
