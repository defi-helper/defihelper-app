import clsx from 'clsx'
import React from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'

import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'
import { bignumberUtils } from '~/common/bignumber-utils'
import { cutAccount } from '~/common/cut-account'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { networksConfig } from '~/networks-config'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as styles from './portfolio-deployed-contracts.css'
import * as model from './portfolio-deployed-contracts.model'
import { PortfolioAssetCard } from '../common'
import { Loader } from '~/common/loader'
import { ButtonBase } from '~/common/button-base'

export type PortfolioDeployedContractsProps = {
  className?: string
}

export const PortfolioDeployedContracts: React.VFC<PortfolioDeployedContractsProps> =
  (props) => {
    const automatesContracts = useStore(
      stakingAutomatesModel.$automatesContracts
    )

    const openedWallet = useStore(model.$openedWallet)
    const assetsByWallet = useStore(model.$assetsByWallet)
    const assetsLoading = useStore(model.fetchAssetsByWalletFx.pending)

    useGate(stakingAutomatesModel.StakingAutomatesGate, null)

    const handleOpenWallet = (walletId: string | null) => () => {
      model.openWallet(walletId)
    }

    if (!automatesContracts.length) return <></>

    return (
      <div className={clsx(styles.root, props.className)}>
        <div className={styles.header}>
          <Typography variant="h3" className={styles.title}>
            Deployed contracts
          </Typography>
        </div>
        <div className={styles.tableWrap}>
          <Paper className={styles.table} radius={8}>
            <div className={clsx(styles.tableRow, styles.tableHeader)}>
              <Typography variant="body3">Name</Typography>
              <Typography variant="body3">Address</Typography>
              <Typography variant="body3">APY</Typography>
              <Typography variant="body3">APY Boost</Typography>
            </div>
            <div className={styles.tableBody}>
              {automatesContracts.map((automateContract) => (
                <React.Fragment key={automateContract.id}>
                  <div className={styles.tableRow}>
                    <Typography variant="body2" as="div">
                      <Jazzicon
                        diameter={20}
                        seed={jsNumberForAddress(automateContract.address)}
                        paperStyles={{ verticalAlign: 'middle' }}
                      />{' '}
                      {automateContract.contract?.name || 'untitled'}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {automateContract.contract &&
                        networksConfig[automateContract.contract.network] && (
                          <Icon
                            icon={
                              networksConfig[automateContract.contract.network]
                                .icon
                            }
                            className={styles.blockchainIcon}
                          />
                        )}{' '}
                      {automateContract.contract && (
                        <Link
                          href={buildExplorerUrl({
                            network: automateContract.contract.network,
                            address: automateContract.address,
                          })}
                          target="_blank"
                        >
                          {cutAccount(automateContract.address)}
                        </Link>
                      )}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {bignumberUtils.format(
                        automateContract.contract?.metric.aprYear
                      )}
                      %
                    </Typography>
                    <Typography variant="body2" as="div">
                      {bignumberUtils.format(
                        automateContract.contract?.metric.myAPYBoost
                      )}
                      %
                    </Typography>
                    <ButtonBase
                      onClick={handleOpenWallet(
                        openedWallet === automateContract.wallet.id
                          ? null
                          : automateContract.wallet.id
                      )}
                    >
                      <Icon
                        icon={
                          openedWallet === automateContract.wallet.id
                            ? 'arrowTop'
                            : 'arrowDown'
                        }
                        width="24"
                        height="24"
                      />
                    </ButtonBase>
                  </div>
                  {openedWallet === automateContract.wallet.id &&
                  assetsLoading ? (
                    <div className={clsx(styles.loader, styles.mb)}>
                      <Loader height="16" />
                    </div>
                  ) : (
                    <>
                      {openedWallet === automateContract.wallet.id &&
                        !isEmpty(assetsByWallet) && (
                          <>
                            {assetsByWallet.map((asset, index) => (
                              <PortfolioAssetCard
                                row={asset}
                                key={String(index)}
                              />
                            ))}
                          </>
                        )}
                      {openedWallet === automateContract.wallet.id &&
                        isEmpty(assetsByWallet) && (
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
