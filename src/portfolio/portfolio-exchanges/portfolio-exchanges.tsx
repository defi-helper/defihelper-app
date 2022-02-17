import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import isEmpty from 'lodash.isempty'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-exchanges.css'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as model from '~/settings/settings-integrations/settings-integrations.model'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Loader } from '~/common/loader'
import { PortfolioAssetCard, PortfolioAssetsHeader } from '~/portfolio/common'

export type PortfolioDeployedContractsProps = {
  className?: string
}

export const PortfolioExchanges: React.VFC<PortfolioDeployedContractsProps> = (
  props
) => {
  const integrations = useStore(model.$integrationsList)
  const assetsByWallet = useStore(model.$assetsByIntegration)
  const assetsLoading = useStore(model.fetchAssetsByIntegrationFx.pending)
  const openedWallet = useStore(model.$openedIntegration)

  useEffect(() => {
    model.fetchEstablishedIntegrationsListFx()
  }, [])

  if (!integrations.length) return <></>

  const handleToggleRow = (exchangeId: string) => {
    model.openIntegration(openedWallet === exchangeId ? null : exchangeId)
  }

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Exchanges
        </Typography>
      </div>
      <div className={styles.tableWrap}>
        <Paper className={styles.table} radius={8}>
          <div className={clsx(styles.tableRow, styles.tableHeader)}>
            <Typography variant="body3">Exchange</Typography>
            <Typography variant="body3">Account</Typography>

            <Typography variant="body3" align="right">
              Balance
            </Typography>
          </div>
          <div className={styles.tableBody}>
            {integrations.map((exchange) => {
              return (
                <React.Fragment key={exchange.id}>
                  <div className={styles.tableRow}>
                    <Typography variant="body2">Binance</Typography>

                    <Typography variant="body3">{exchange.account}</Typography>

                    <Typography variant="body3" align="right">
                      ${bignumberUtils.format(exchange.balance, 2)}
                    </Typography>

                    <ButtonBase onClick={() => handleToggleRow(exchange.id)}>
                      <Icon
                        icon={`arrow${
                          openedWallet === exchange.id ? 'Top' : 'Down'
                        }`}
                        width="24"
                        height="24"
                      />
                    </ButtonBase>
                  </div>

                  {openedWallet === exchange.id && assetsLoading ? (
                    <div className={clsx(styles.loader, styles.mb)}>
                      <Loader height="16" />
                    </div>
                  ) : (
                    <>
                      {openedWallet === exchange.id &&
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
                      {openedWallet === exchange.id && isEmpty(assetsByWallet) && (
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
