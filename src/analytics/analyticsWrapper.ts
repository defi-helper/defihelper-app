import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'
import amplitude from 'amplitude-js'
import { config } from '~/config'

const amplitudeInstance = amplitude.getInstance()
if (config.AMPLITUDE) {
  amplitudeInstance.init(config.AMPLITUDE)
}

export const analytics = {
  async log(event: string, params = {}) {
    try {
      await Promise.all([
        ym('reachGoal', event),
        ReactGA.ga('event', event),
        amplitudeInstance.logEvent(event, params),
      ])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },

  async reportPathChange(path: string, hash: string, search: string) {
    const identifier = path
      .toLowerCase()
      .replace(/^\/|\/$/g, '')
      .replaceAll('/', '_')
      .replace(/[^a-z0-9_]/gi, '')
    await amplitudeInstance.logEvent(`page_${identifier}`, {
      hash,
      path,
      search,
    })
  },

  async reportComponentClick(
    identifier: string,
    path: string,
    component: string
  ) {
    try {
      await amplitudeInstance.logEvent(`${component}_${identifier}`, {
        path,
        component,
        source: 'app',
      })
    } catch {
      console.warn('unable to send analytics goal')
    }
  },

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
