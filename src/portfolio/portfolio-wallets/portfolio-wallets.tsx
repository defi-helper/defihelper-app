import { useStore } from 'effector-react'
import clsx from 'clsx'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { Button } from '~/common/button'
import { PortfolioAddWalletDialog } from '~/portfolio/common'
import { useDialog } from '~/common/dialog'
import { Can } from '~/auth'
import { useWalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Paper } from '~/common/paper'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Icon } from '~/common/icon'
import { bignumberUtils } from '~/common/bignumber-utils'
import { cutAccount } from '~/common/cut-account'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import * as model from './portfolio-wallets.model'
import * as styles from './portfolio-wallets.css'
import { networksConfig } from '~/networks-config'

export type PortfolioWalletsProps = {
  className?: string
}

export const PortfolioWallets: React.VFC<PortfolioWalletsProps> = (props) => {
  const [openAddWalletDialog] = useDialog(PortfolioAddWalletDialog)
  const [openWalletList] = useWalletList()

  const handleOpenAddWalletDialog = async () => {
    try {
      const res = await openAddWalletDialog()

      model.addWalletFx(res)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOpenWalletList = async () => {
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.signMessage({
        chainId: String(wallet.chainId),
        provider: wallet.provider,
        account: wallet.account,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const wallets = useStore(settingsWalletModel.$wallets)

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Wallets
        </Typography>
        <Can I="create" a="Wallet">
          <Button
            color="blue"
            onClick={handleOpenAddWalletDialog}
            className={styles.addWalletAdmin}
          >
            +
            <Typography variant="inherit" className={styles.addWalletTitle}>
              add wallet(admin)
            </Typography>
          </Button>
        </Can>
        <Button
          color="blue"
          onClick={handleOpenWalletList}
          className={styles.addWallet}
        >
          +
          <Typography variant="inherit" className={styles.addWalletTitle}>
            add wallet
          </Typography>
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <Paper className={styles.table} radius={8}>
          <div className={clsx(styles.tableRow, styles.tableHeader)}>
            <Typography variant="body3">Wallet</Typography>
            <Typography variant="body3">Address</Typography>
            <Typography variant="body3">
              <Icon icon="automation" width="20" height="20" />
            </Typography>
            <Typography variant="body3">Value</Typography>
          </div>
          <div className={styles.tableBody}>
            {wallets.map((wallet) => (
              <div key={wallet.id} className={styles.tableRow}>
                <Typography variant="body2" as="div">
                  <Jazzicon
                    diameter={20}
                    seed={jsNumberForAddress(wallet.address)}
                    paperStyles={{ verticalAlign: 'middle' }}
                  />{' '}
                  {wallet.name || 'untitled'}
                </Typography>
                <Typography variant="body2" as="div">
                  {networksConfig[wallet.network] && (
                    <Icon
                      icon={networksConfig[wallet.network].icon}
                      className={styles.blockchainIcon}
                    />
                  )}{' '}
                  <Link
                    href={buildExplorerUrl({
                      network: wallet.network,
                      address: wallet.address,
                    })}
                    target="_blank"
                  >
                    {cutAccount(wallet.address)}
                  </Link>
                </Typography>
                <Typography variant="body2" as="div">
                  4
                </Typography>
                <Typography variant="body2" as="div">
                  $
                  {bignumberUtils.format(
                    bignumberUtils.plus(
                      wallet.metric.stakedUSD,
                      wallet.metric.earnedUSD
                    )
                  )}
                </Typography>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}
