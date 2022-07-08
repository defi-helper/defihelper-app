import { useStore } from 'effector-react'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import isEmpty from 'lodash.isempty'

import { Button } from '~/common/button'
import {
  PortfolioAddWalletDialog,
  PortfolioAssetCard,
  PortfolioAssetsHeader,
} from '~/portfolio/common'
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
import { ButtonBase } from '~/common/button-base'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { networksConfig } from '~/networks-config'
import { Loader } from '~/common/loader'
import { Dropdown } from '~/common/dropdown'
import * as model from './portfolio-wallets.model'
import * as styles from './portfolio-wallets.css'
import { CanDemo } from '~/auth/can-demo'
import { analytics } from '~/analytics'

export type PortfolioWalletsProps = {
  className?: string
}

export const PortfolioWallets: React.VFC<PortfolioWalletsProps> = (props) => {
  const [openAddWalletDialog] = useDialog(PortfolioAddWalletDialog)
  const [openWalletList] = useWalletList()
  const openedWallet = useStore(model.$openedWallet)
  const wallets = useStore(settingsWalletModel.$walletsWithMetrics)
  const assetsByWallet = useStore(model.$assetsByWallet)
  const assetsLoading = useStore(model.fetchAssetsByWalletFx.pending)

  const handleOpenAddWalletDialog = async () => {
    analytics.log('portfolio_add_wallet_click')
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
    analytics.log('portfolio_add_wallet_click')
    try {
      const wallet = await openWalletList()

      if (!wallet.account) return

      walletNetworkModel.signMessage({
        connector: wallet.connector,
        chainId: wallet.chainId,
        provider: wallet.provider,
        blockchain: wallet.blockchain,
        account: wallet.account,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOpenWallet = (walletId: string | null) => () => {
    model.openWallet(walletId)
  }

  useEffect(() => {
    const abortController = new AbortController()
    settingsWalletModel.fetchWalletListMetricsFx(abortController.signal)

    return () => abortController.abort()
  }, [])

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

        <CanDemo>
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
        </CanDemo>
      </div>
      <div className={styles.tableWrap}>
        <Paper className={styles.table} radius={8}>
          <div className={clsx(styles.tableRow, styles.tableHeader)}>
            <Typography variant="body3">Wallet</Typography>
            <Typography variant="body3">Address</Typography>
            <Typography variant="body3" align="right">
              <Dropdown
                trigger="hover"
                control={
                  <ButtonBase>
                    <Icon icon="automation" width="20" height="20" />
                  </ButtonBase>
                }
              >
                <Typography>Auto-staking</Typography>
              </Dropdown>
            </Typography>
            <Typography variant="body3" align="right">
              Value
            </Typography>
          </div>
          <div className={styles.tableBody}>
            {[...wallets.nonEmpty, ...wallets.empty].map((wallet) => (
              <React.Fragment key={wallet.id}>
                <div className={styles.tableRow}>
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
                  <Typography variant="body2" as="div" align="right">
                    {wallet.triggersCount ?? 0}
                  </Typography>
                  <Typography variant="body2" as="div" align="right">
                    ${bignumberUtils.format(wallet.metric?.worth)}
                  </Typography>
                  <ButtonBase
                    onClick={handleOpenWallet(
                      openedWallet === wallet.id ? null : wallet.id
                    )}
                  >
                    <Icon
                      icon={
                        openedWallet === wallet.id ? 'arrowUp' : 'arrowDown'
                      }
                      width="24"
                      height="24"
                    />
                  </ButtonBase>
                </div>
                {openedWallet === wallet.id && assetsLoading ? (
                  <div className={clsx(styles.loader, styles.mb)}>
                    <Loader height="16" />
                  </div>
                ) : (
                  <>
                    {openedWallet === wallet.id && !isEmpty(assetsByWallet) && (
                      <>
                        <PortfolioAssetsHeader />
                        {assetsByWallet.map((asset, index) => (
                          <PortfolioAssetCard row={asset} key={String(index)} />
                        ))}
                      </>
                    )}
                    {openedWallet === wallet.id && isEmpty(assetsByWallet) && (
                      <Typography
                        className={styles.mb}
                        variant="body2"
                        as="div"
                        align="center"
                      >
                        No assets found
                      </Typography>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}
