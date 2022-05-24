import ym from 'react-yandex-metrika'
import ReactGA from 'react-ga'

export const analytics = {
  onWalletConnected() {
    ym('reachGoal', 'wallet-connected')
    ReactGA.ga('send', 'wallet_connected')
  },
  onAutomationCreated() {
    ym('reachGoal', 'automation-created')
    ReactGA.ga('send', 'automation_created')
  },
  onDeposit() {
    ym('reachGoal', 'topped-up-balance')
    ReactGA.ga('send', 'topped_up_balance')
  },
}
