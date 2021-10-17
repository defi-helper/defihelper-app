import { useStore } from 'effector-react'
import clsx from 'clsx'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { Button } from '~/common/button'
import { PortfolioAddWalletDialog } from '~/portfolio/common'
import { useDialog } from '~/common/dialog'
import { Can } from '~/users'
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

export type PortfolioWalletsProps = {
  className?: string
}

const BLOCKCHAIN_ICONS: Record<
  string,
  'wavesRegular' | 'ethereumRegular' | 'bnbRegular'
> = {
  1: 'ethereumRegular',
  3: 'ethereumRegular',
  1666600000: 'ethereumRegular',
  42: 'ethereumRegular',
  4: 'ethereumRegular',
  5: 'ethereumRegular',
  56: 'bnbRegular',
  97: 'bnbRegular',
  waves: 'wavesRegular',
  main: 'wavesRegular',
  W: 'wavesRegular',
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
            + add wallet(admin)
          </Button>
        </Can>
        <Button color="blue" onClick={handleOpenWalletList}>
          + add wallet
        </Button>
      </div>
      <Paper className={styles.table} radius={8}>
        <div className={clsx(styles.tableRow, styles.tableHeader)}>
          <Typography variant="body3">Wallet</Typography>
          <Typography variant="body3">Address</Typography>
          <Typography variant="body3">Portfolio %</Typography>
          <Typography variant="body3">
            <Icon icon="automation" width="20" height="20" />
          </Typography>
          <Typography variant="body3">Assets</Typography>
          <Typography variant="body3">Value</Typography>
          <Typography variant="body3">Value 24h</Typography>
          <Typography variant="body3">Value 7d</Typography>
        </div>
        <div className={styles.tableBody}>
          {wallets.map((wallet) => (
            <div key={wallet.id} className={styles.tableRow}>
              <Typography variant="body2">
                <Jazzicon
                  diameter={20}
                  seed={jsNumberForAddress(wallet.address)}
                  paperStyles={{ verticalAlign: 'middle' }}
                />{' '}
                {wallet.name || 'untitled'}
              </Typography>
              <Typography variant="body2">
                <Icon
                  icon={BLOCKCHAIN_ICONS[wallet.network]}
                  className={styles.blockchainIcon}
                />{' '}
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
              <Typography variant="body2">12%</Typography>
              <Typography variant="body2">4</Typography>
              <Typography variant="body2">12</Typography>
              <Typography variant="body2">
                ${bignumberUtils.format('720864')}
              </Typography>
              <Typography variant="body2" className={styles.positive}>
                {bignumberUtils.format('0.2')}%
              </Typography>
              <Typography variant="body2" className={styles.negative}>
                {bignumberUtils.format('-0.2')}%
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}
