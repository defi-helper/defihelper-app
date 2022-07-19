import ReactGA from 'react-ga'
import amplitude from 'amplitude-js'
import { config } from '~/config'

const amplitudeInstance = amplitude.getInstance()
if (config.AMPLITUDE) {
  amplitudeInstance.init(config.AMPLITUDE, undefined, {
    includeFbclid: true,
    includeReferrer: true,
    includeUtm: true,
    includeGclid: true,
  })
}

export const analytics = {
  async log(
    event: string,
    params: { [key: string]: string | boolean | number | undefined | null } = {}
  ) {
    try {
      await Promise.all([
        window.dataLayer.push({
          event,
          ...params,
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
      await Promise.all([ReactGA.ga('event', 'wallet_connected')])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
  async onAutomationCreated() {
    try {
      await Promise.all([ReactGA.ga('event', 'automation_created')])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
  async onAutoStakingEnabled() {
    try {
      await Promise.all([ReactGA.ga('event', 'auto_staking_enabled')])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },

  async onNotificationsEnabled() {
    try {
      await Promise.all([ReactGA.ga('event', 'auto_staking_enabled')])
    } catch (err) {
      console.warn('unable to send analytics goal')
    }
  },
}
