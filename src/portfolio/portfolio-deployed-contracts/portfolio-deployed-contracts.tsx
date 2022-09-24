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
import { PortfolioAssetCard, PortfolioAssetsHeader } from '~/portfolio/common'
import { ButtonBase } from '~/common/button-base'
import { Loader } from '~/common/loader'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as styles from './portfolio-deployed-contracts.css'
import * as model from './portfolio-deployed-contracts.model'

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

    const handleOpenWallet = (wallet: model.OpenedWallet) => () => {
      if (wallet && !wallet.walletId.length) return

      model.openWallet(wallet)
    }

    if (!automatesContracts.length) return <></>

    return (
      <div className={clsx(styles.root, props.className)}>
        <div className={styles.header}>
          <Typography variant="h3" className={styles.title}>
            Your investments
          </Typography>
        </div>
        <div className={styles.tableWrap}>
          <Paper className={styles.table} radius={8}>
            <div className={clsx(styles.tableRow, styles.tableHeader)}>
              <Typography variant="body3">Name</Typography>
              <Typography variant="body3">Address</Typography>
              <Typography variant="body3" align="right">
                Value
              </Typography>
              <Typography variant="body3" align="right">
                APY
              </Typography>
              <Typography variant="body3" align="right">
                Boosted APY
              </Typography>
            </div>
            <div className={styles.tableBody}>
              {automatesContracts.map((automateContract) => {
                const apyboostDifference = bignumberUtils.minus(
                  automateContract.contract?.metric.myAPYBoost,
                  automateContract.contract?.metric.aprYear
                )
                const validDiff =
                  !bignumberUtils.isNaN(apyboostDifference) &&
                  bignumberUtils.gt(apyboostDifference, '0.001')

                return (
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
                                networksConfig[
                                  automateContract.contract.network
                                ].icon
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
                      <Typography variant="body2" as="div" align="right">
                        $
                        {bignumberUtils.format(
                          automateContract.contractWallet?.metric.stakedUSD
                        )}
                      </Typography>
                      <Typography variant="body2" as="div" align="right">
                        {bignumberUtils.formatMax(
                          bignumberUtils.mul(
                            automateContract.contract?.metric.aprYear,
                            100
                          ),
                          10000,
                          true
                        )}
                        %
                      </Typography>
                      <Typography variant="body2" as="div" align="right">
                        {validDiff
                          ? bignumberUtils.formatMax(
                              bignumberUtils.mul(
                                automateContract.contract?.metric.myAPYBoost,
                                100
                              ),
                              10000
                            )
                          : 0}
                        %
                      </Typography>
                      <ButtonBase
                        onClick={handleOpenWallet(
                          openedWallet?.contractId === automateContract.id
                            ? null
                            : {
                                walletId:
                                  automateContract.contractWallet?.id ?? '',
                                contractId: automateContract.id,
                              }
                        )}
                      >
                        <Icon
                          icon={
                            openedWallet?.contractId === automateContract.id
                              ? 'arrowUp'
                              : 'arrowDown'
                          }
                          width="24"
                          height="24"
                        />
                      </ButtonBase>
                    </div>
                    {openedWallet?.contractId === automateContract.id &&
                    assetsLoading ? (
                      <div className={clsx(styles.loader, styles.mb)}>
                        <Loader height="16" />
                      </div>
                    ) : (
                      <>
                        {openedWallet?.contractId === automateContract.id &&
                          !isEmpty(assetsByWallet) && (
                            <>
                              <PortfolioAssetsHeader />
                              {assetsByWallet.map((asset, index) => (
                                <PortfolioAssetCard
                                  row={asset}
                                  key={String(index)}
                                />
                              ))}
                            </>
                          )}
                        {openedWallet?.contractId === automateContract.id &&
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
                )
              })}
            </div>
          </Paper>
        </div>
      </div>
    )
  }
