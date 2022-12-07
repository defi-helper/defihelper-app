import React, { useState } from 'react'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { hasBoughtPrice, Order } from '~/trade/common/trade.types'
import { Exchange, Pair } from '~/trade/common/trade.api'
import { Paper } from '~/common/paper'
import { NumericalInput } from '~/common/numerical-input'
import { ButtonBase } from '~/common/button-base'
import * as styles from './trade-edit-dialog.css'

export type TradeEditDialogProps = {
  onConfirm: (boughtPrice: string) => void
  order: Order
  exchange?: Exchange
  boughtToken?: Pair['pairInfo']['tokens'][number]
  currentPrice?: string
}

export const TradeEditDialog: React.VFC<TradeEditDialogProps> = (props) => {
  const [boughtPrice, setBoughtPrice] = useState(
    hasBoughtPrice(props.order.callData)
      ? props.order.callData.boughtPrice ?? '0'
      : '0'
  )

  const network = networksConfig[props.order.owner.network]

  const handleConfirm = () => {
    props.onConfirm(boughtPrice)
  }

  const handleChangePrice = () => {
    setBoughtPrice(props.currentPrice ?? '0')
  }

  return (
    <Dialog className={styles.root}>
      <Typography variant="h4" className={styles.title}>
        Edit order
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2">Wallet</Typography>
        <Typography variant="body2" as="div" className={styles.contractName}>
          {network && <Icon icon={network.icon} width={24} height={24} />}
          {props.order.owner.name}
        </Typography>
      </div>
      {props.exchange && (
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
      )}
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
        <Typography variant="body2">Bought price</Typography>
        <NumericalInput
          value={boughtPrice}
          onChange={(event) => setBoughtPrice(event.target.value)}
          rightSide={props.boughtToken?.symbol}
          size="small"
        />
      </div>
      <div className={styles.row}>
        <Typography variant="body2">Current price</Typography>
        <Typography
          as={ButtonBase}
          variant="body2"
          onClick={handleChangePrice}
          className={styles.currentPrice}
        >
          {props.currentPrice ?? '0'} BUSD
        </Typography>
      </div>
      <div className={styles.button}>
        <Button
          color="green"
          onClick={handleConfirm}
          className={styles.buttonInner}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  )
}
