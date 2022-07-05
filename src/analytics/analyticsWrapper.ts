import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'
import amplitude from 'amplitude-js'
import { config } from '~/config'

const amplitudeInstance = amplitude.getInstance()
if (config.AMPLITUDE) {
  amplitudeInstance.init(config.AMPLITUDE)
}

export const analytics = {
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

  amplitude: {
    async walletConnectedSuccessful(payload: {
      address: string
      network: string
      blockchain: string
    }) {
      try {
        await amplitudeInstance.logEvent('wallet_connected_successful', payload)
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async addWallet() {
      try {
        await amplitudeInstance.logEvent('add_wallet')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async telegramConnect() {
      try {
        await amplitudeInstance.logEvent('telegram_connect')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async telegramOpen() {
      try {
        await amplitudeInstance.logEvent('telegram_open')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async emailConnect() {
      try {
        await amplitudeInstance.logEvent('email_connect')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async emailSave() {
      try {
        await amplitudeInstance.logEvent('email_save')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async connectCex() {
      try {
        await amplitudeInstance.logEvent('connect_cex')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async portfolioConnectWalletPreAuth() {
      try {
        await amplitudeInstance.logEvent('portfolio_connect_wallet_before_auth')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async automationAdd() {
      try {
        await amplitudeInstance.logEvent('automation_add')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async automationSetup() {
      try {
        await amplitudeInstance.logEvent('automation_setup')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async automationSectionSwitch(value: string | null) {
      try {
        await amplitudeInstance.logEvent(
          `automation_section_${value ?? 'none'}`
        )
      } catch {
        console.warn('unable to send analytics goal')
      }
    },

    async automationByEventSection() {
      try {
        await amplitudeInstance.logEvent('automation_by_event_section')
      } catch {
        console.warn('unable to send analytics goal')
      }
    },
  },
}
