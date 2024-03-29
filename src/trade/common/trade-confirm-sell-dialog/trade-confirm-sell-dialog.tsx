import React from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { Exchange, Pair, Token } from '~/trade/common/trade.api'
import * as styles from './trade-confirm-sell-dialog.css'

export type TradeConfirmSellDialogProps = {
  onConfirm: () => void
  exchange: Exchange
  totalRecieve: string
  boughtToken?: Pair['pairInfo']['tokens'][number]
  network: string
  boughtPrice: string
  tokens?: Token[]
  name: string
  unit: string
  takeProfit?: string
  stopLoss?: string
  secondToken?: string
  firstToken?: string
  trailingTakeProfit?: boolean
  trailingStopLoss?: boolean
}

export const TradeConfirmSellDialog: React.VFC<TradeConfirmSellDialogProps> = (
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
        <Typography variant="body2">Unit</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {props.unit} {props.firstToken}
        </Typography>
      </div>
      {props.takeProfit && (
        <div className={styles.row}>
          <Typography variant="body2">Take profit</Typography>
          <Typography variant="body2" as="div" className={styles.contractName}>
            {props.takeProfit} {props.secondToken}
          </Typography>
        </div>
      )}
      {props.stopLoss && (
        <div className={styles.row}>
          <Typography variant="body2">Stop-loss</Typography>
          <Typography variant="body2" as="div" className={styles.contractName}>
            {props.stopLoss} {props.secondToken}
          </Typography>
        </div>
      )}
      <div className={styles.row}>
        <Typography variant="body2">Trailing take profit</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {props.trailingTakeProfit ? 'on' : 'off'}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2">Trailing stop-loss</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {props.trailingStopLoss ? 'on' : 'off'}
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
