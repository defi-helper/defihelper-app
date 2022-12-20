import React from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { Exchange, Pair, Token } from '~/trade/common/trade.api'
import * as styles from './trade-confirm-buy-dialog.css'

export type TradeConfirmBuyDialogProps = {
  onConfirm: () => void
  exchange: Exchange
  total: string
  boughtToken?: Pair['pairInfo']['tokens'][number]
  network: string
  boughtPrice: string
  tokens?: Token[]
  name: string
  amount: string
  secondToken?: string
  firstToken?: string
}

export const TradeConfirmBuyDialog: React.VFC<TradeConfirmBuyDialogProps> = (
  props
) => {
  const network = networksConfig[props.network]

  return (
    <Dialog className={styles.root}>
      <Typography variant="h4" className={styles.title}>
        Order confirmation
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2">Wallet</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {network && <Icon icon={network.icon} width={24} height={24} />}
          {props.name}
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
          {props.tokens?.map(({ symbol }) => symbol).join('/')}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2">Amount</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {props.amount} {props.firstToken}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2">Total</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {props.total} {props.secondToken}
        </Typography>
      </div>
      <div className={styles.button}>
        <Button
          color="green"
          onClick={props.onConfirm}
          className={styles.buttonInner}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}
