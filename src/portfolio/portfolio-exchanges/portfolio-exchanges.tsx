import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-exchanges.css'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as model from '~/settings/settings-integrations/settings-integrations.model'

export type PortfolioDeployedContractsProps = {
  className?: string
}

export const PortfolioExchanges: React.VFC<PortfolioDeployedContractsProps> = (
  props
) => {
  const integrations = useStore(model.$integrationsList)
  useEffect(() => {
    model.fetchEstablishedIntegrationsListFx()
  }, [])

  if (!integrations.length) return <></>

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
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </Paper>
      </div>
    </div>
  )
}
