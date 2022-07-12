import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'
import amplitude from 'amplitude-js'
import TagManager from 'react-gtm-module'
import { config } from '~/config'

const amplitudeInstance = amplitude.getInstance()
if (config.IS_DEV) {
  amplitudeInstance.init('b9898c691a1821d6c098d311329f7b03')
  TagManager.initialize({
    gtmId: 'GTM-NWWFXMV',
  })
}

export const analytics = {
  async log(event: string, params = {}) {
    try {
      await Promise.all([
        TagManager.dataLayer({
          dataLayerName: event,
          dataLayer: params,
        }),
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
    analytics.log(`page_${identifier}`, {
      hash,
      path,
      search,
    })
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
