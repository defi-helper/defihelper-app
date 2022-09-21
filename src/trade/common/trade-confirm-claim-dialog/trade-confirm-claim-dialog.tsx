import React from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { Order } from '~/trade/common/trade.types'
import { Exchange } from '~/trade/common/trade.api'
import { Paper } from '~/common/paper'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as styles from './trade-confirm-claim-dialog.css'

export type TradeConfirmClaimDialogProps = {
  onConfirm: () => void
  order: Order
  exchange: Exchange
  totalRecieve: string
}

export const TradeConfirmClaimDialog: React.VFC<TradeConfirmClaimDialogProps> =
  (props) => {
    const network = networksConfig[props.order.owner.network]

    return (
      <Dialog className={styles.root}>
        <Typography variant="h4" className={styles.title}>
          Confirmation of a transaction
        </Typography>
        <div className={styles.row}>
          <Typography variant="body2">Wallet</Typography>
          <Typography variant="body2" as="div" className={styles.contractName}>
            {network && <Icon icon={network.icon} width={24} height={24} />}
            {props.order.owner.name}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2">Exchange</Typography>
          <Typography variant="body2" as="div" className={styles.contractName}>
            <img
              alt=""
              src={`${props.exchange.Icon}.svg`}
              width={24}
              height={24}
            />
            {props.exchange.Name}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2">Trading Pair</Typography>
          <Typography variant="body2" as="div" className={styles.contractName}>
            <div className={styles.contractIcons}>
              {props.order.tokens.map(({ token }) => (
                <React.Fragment key={token.id}>
                  {token.alias?.logoUrl ? (
                    <img
                      src={token.alias?.logoUrl}
                      className={styles.contractIcon}
                      alt=""
                    />
                  ) : (
                    <Paper className={styles.contractUnknownTokenIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}
                </React.Fragment>
              ))}
            </div>
            {props.order.tokens.map(({ token }) => token.symbol).join('/')}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2">Mode</Typography>
          <Typography variant="body2" as="div">
            Buy
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2">Total Receive</Typography>
          <Typography variant="body2" as="div">
            {bignumberUtils.format(props.totalRecieve)}
          </Typography>
        </div>
        <Button
          color="green"
          onClick={props.onConfirm}
          className={styles.button}
        >
          Confirm Receive
        </Button>
      </Dialog>
    )
  }
