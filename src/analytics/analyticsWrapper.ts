import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'

export const analytics = {
  async onWalletConnected() {
    try {
      await Promise.all([
        ym('reachGoal', 'wallet-connected'),
        ReactGA.ga('event', 'wallet_connected'),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
  async onAutomationCreated() {
    try {
      await Promise.all([
        ym('reachGoal', 'automation-created'),
        ReactGA.ga('event', 'automation_created'),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
  async onDeposit() {
    try {
      await Promise.all([
        ym('reachGoal', 'topped-up-balance'),
        ReactGA.ga('event', 'topped_up_balance'),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },

  async onAutoStakingEnabled() {
    try {
      await Promise.all([
        ym('reachGoal', 'auto-staking-enabled'),
        ReactGA.ga('event', 'auto_staking_enabled'),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },

  async onNotificationsEnabled() {
    try {
      await Promise.all([
        ym('reachGoal', 'auto-staking-enabled'),
        ReactGA.ga('event', 'auto_staking_enabled'),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
}
