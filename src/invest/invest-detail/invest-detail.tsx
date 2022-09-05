import { cutAccount } from '~/common/cut-account'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import * as styles from './invest-detail.css'

export type InvestDetailProps = unknown

export const InvestDetail: React.VFC<InvestDetailProps> = () => {
  const currentWallet = walletNetworkModel.useWalletNetwork()

  return (
    <div className={styles.root}>
      <div>
        <Icon icon="autostaking" width={40} height={40} />
        <Typography variant="h3">Invest</Typography>
      </div>
      {currentWallet && (
        <>Connected wallet {cutAccount(currentWallet.account)}</>
      )}
    </div>
  )
}
