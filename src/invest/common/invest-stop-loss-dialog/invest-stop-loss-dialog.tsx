import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAsyncFn, useAsyncRetry, useToggle } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { StopLossComponent } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Slider } from '~/common/slider'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import * as styles from './invest-stop-loss-dialog.css'

export type InvestStopLossDialogProps = {
  onConfirm: () => void
  adapter?: StopLossComponent
  mainTokens?: { logoUrl: string; symbol: string; address: string }[]
  withdrawTokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
}

export const InvestStopLossDialog: React.VFC<InvestStopLossDialogProps> = (
  props
) => {
  const [stopLoss, toggleStopLoss] = useToggle(false)
  const [mainToken, setMainToken] = useState(
    props.mainTokens?.[0]?.address ?? ''
  )
  const [withdrawToken, setWithdrawToken] = useState(
    props.withdrawTokens?.[0]?.address ?? ''
  )
  const [stopLossPrice, setStopLossPrice] = useState('')
  const [percent, setPercent] = useState(10)

  const path = useAsyncRetry(async () => {
    return props.adapter?.methods.autoPath(mainToken, withdrawToken)
  }, [props.adapter, mainToken, withdrawToken])

  const price = useAsyncRetry(async () => {
    if (!path.value) return

    return props.adapter?.methods.amountOut(path.value)
  }, [props.adapter, path.value])

  useEffect(() => {
    try {
      setStopLossPrice(bignumberUtils.mul(price.value, percent))
    } catch (error) {
      console.error('setStopLossPrice', error)
    }
  }, [price.value, percent])

  useEffect(() => {
    try {
      setPercent(
        Number(
          bignumberUtils.toFixed(
            bignumberUtils.mul(
              bignumberUtils.div(stopLossPrice, price.value),
              100
            )
          )
        )
      )
    } catch (error) {
      console.error('setPercent', error)
    }
  }, [price.value, stopLossPrice])

  const [confirm, handleConfirm] = useAsyncFn(async () => {
    if (!props.adapter || !path.value) return

    const can = await props.adapter.methods.canSetStopLoss(
      path.value,
      stopLossPrice,
      '0'
    )

    if (can instanceof Error) throw can

    const result = await props.adapter.methods.setStopLoss(
      path.value,
      stopLossPrice,
      '0'
    )

    return result.tx.wait()
  }, [props.adapter, path.value, stopLossPrice])

  const withDrawTokensMap = props.withdrawTokens?.reduce((acc, token) => {
    acc.set(token.address, token.symbol)

    return acc
  }, new Map<string, string>())

  return (
    <Dialog className={styles.root}>
      <div>
        <Typography
          variant="body2"
          transform="uppercase"
          family="mono"
          className={styles.title}
        >
          Settings
        </Typography>
      </div>
      <Typography variant="body2" className={styles.subtitle}>
        Set up a stop-loss to protect your funds from a sudden drop in liquidity
      </Typography>
      <div className={styles.row}>
        <div
          className={clsx(styles.rowHeading, stopLoss && styles.rowHeadingOpen)}
        >
          <Typography>Stop Loss</Typography>
          <Switch
            size="small"
            onChange={toggleStopLoss}
            disabled={confirm.loading}
          />
        </div>
        {stopLoss && (
          <>
            <Select
              label="Main token"
              className={styles.input}
              value={mainToken}
              onChange={(event) => setMainToken(event.currentTarget.value)}
              disabled={confirm.loading}
            >
              {props.mainTokens?.map((token) => (
                <SelectOption value={token.address} key={token.address}>
                  {token.logoUrl ? (
                    <img src={token.logoUrl} className={styles.img} alt="" />
                  ) : (
                    <span className={styles.imgPlaceHolder} />
                  )}
                  {token.symbol}
                </SelectOption>
              ))}
            </Select>
            <Select
              label="Withdraw to"
              className={styles.input}
              value={withdrawToken}
              onChange={(event) => setWithdrawToken(event.currentTarget.value)}
              disabled={confirm.loading}
            >
              {props.withdrawTokens?.map((token) => (
                <SelectOption value={token.address} key={token.address}>
                  {token.logoUrl ? (
                    <img src={token.logoUrl} className={styles.img} alt="" />
                  ) : (
                    <span className={styles.imgPlaceHolder} />
                  )}
                  {token.symbol}
                </SelectOption>
              ))}
            </Select>
            <div className={styles.input}>
              <Typography variant="body3" className={styles.label}>
                You will get
              </Typography>
              <Typography variant="body2">
                {bignumberUtils.format(price.value)}{' '}
                {withDrawTokensMap.get(withdrawToken)}
              </Typography>
            </div>
            <div className={styles.input}>
              <NumericalInput
                label="Stop-loss price"
                value={stopLossPrice}
                onChange={(event) => setStopLossPrice(event.target.value)}
                className={styles.price}
                rightSide={withDrawTokensMap.get(withdrawToken)}
                disabled={confirm.loading}
              />
              <div className={styles.inputRow}>
                <NumericalInput
                  size="small"
                  className={styles.numberInput}
                  value={-percent}
                  min={0}
                  max={100}
                  onChange={(event) =>
                    setPercent(Number(event.currentTarget.value))
                  }
                  disabled={confirm.loading}
                />
                <Slider
                  reverse
                  className={styles.slider}
                  value={percent}
                  min={0}
                  max={100}
                  onChange={(event) => setPercent(Number(event))}
                  disabled={confirm.loading}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Button
        className={styles.confirm}
        loading={confirm.loading}
        onClick={handleConfirm}
      >
        confirm
      </Button>
    </Dialog>
  )
}
