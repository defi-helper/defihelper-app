import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAsyncFn, useAsyncRetry, useToggle, useThrottle } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { Dialog } from '~/common/dialog'
import { StopLossComponent } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Slider } from '~/common/slider'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { StakingAutomatesContract } from '~/staking/common'
import * as styles from './invest-stop-loss-dialog.css'

export type InvestStopLossDialogProps = {
  onConfirm: (value: {
    path: string[]
    amountOut: string
    amountOutMin: string
    active: boolean
  }) => void
  adapter?: StopLossComponent
  mainTokens?: { logoUrl: string; symbol: string; address: string }[]
  withdrawTokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
  initialStopLoss: StakingAutomatesContract['stopLoss']
  onDelete: () => Promise<void>
  onCancel: () => void
  onToggleAutoCompound: (active: boolean) => void
  autoCompoundActive: boolean | null
}

export const InvestStopLossDialog: React.VFC<InvestStopLossDialogProps> = (
  props
) => {
  const [stopLoss, toggleStopLoss] = useToggle(Boolean(props.initialStopLoss))
  const [autoCompound, toggleAutoCompound] = useToggle(
    props.autoCompoundActive ?? false
  )
  const [mainToken, setMainToken] = useState(
    props.initialStopLoss?.inToken?.address ??
      props.mainTokens?.[0]?.address ??
      ''
  )
  const [withdrawToken, setWithdrawToken] = useState(
    props.initialStopLoss?.outToken?.address ??
      props.withdrawTokens?.[0]?.address ??
      ''
  )
  const [stopLossPrice, setStopLossPrice] = useState(
    props.initialStopLoss?.params?.amountOut ?? ''
  )
  const [percent, setPercent] = useState(0)

  const path = useAsyncRetry(async () => {
    return (
      props.initialStopLoss?.params?.path ??
      props.adapter?.methods.autoPath(mainToken, withdrawToken)
    )
  }, [props.adapter, mainToken, withdrawToken, props.initialStopLoss])

  const price = useAsyncRetry(async () => {
    if (!path.value) return

    return (
      props.initialStopLoss?.amountOut ??
      props.adapter?.methods.amountOut(path.value)
    )
  }, [props.adapter, props.initialStopLoss, path.value])

  const percentThrottled = useThrottle(percent, 300)
  const stopLossPriceThrottled = useThrottle(stopLossPrice, 300)

  useEffect(() => {
    if (!price.value) return

    setStopLossPrice(
      bignumberUtils.toFixed(
        bignumberUtils.minus(
          price.value,
          bignumberUtils.mul(
            bignumberUtils.div(percentThrottled, 100),
            price.value
          )
        )
      )
    )
  }, [price.value, percentThrottled])

  useEffect(() => {
    if (!price.value) return

    const newPercent = Number(
      bignumberUtils.toFixed(
        bignumberUtils.mul(
          bignumberUtils.div(
            bignumberUtils.minus(stopLossPriceThrottled, price.value),
            price.value
          ),
          100
        )
      )
    )

    setPercent(-newPercent)
  }, [price.value, stopLossPriceThrottled])

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

    await result.tx.wait()

    props.onConfirm({
      path: path.value,
      amountOut: stopLossPrice,
      amountOutMin: '0',
      active: stopLoss,
    })
  }, [props.adapter, path.value, stopLossPrice])

  const [deleteState, handleDelete] = useAsyncFn(async () => {
    await props.onDelete()

    return props.onCancel()
  }, [])

  const withDrawTokensMap = props.withdrawTokens?.reduce((acc, token) => {
    acc.set(token.address, token.symbol)

    return acc
  }, new Map<string, string>())

  useEffect(() => {
    if (!price.value || props.initialStopLoss) return

    setTimeout(() => {
      setPercent(10)
    }, 500)
  }, [price.value, props.initialStopLoss])

  useEffect(() => {
    props.onToggleAutoCompound(autoCompound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCompound])

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
          <Typography>Stop-Loss</Typography>
          <Switch
            size="small"
            onChange={toggleStopLoss}
            disabled={confirm.loading}
            checked={stopLoss}
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
                {price.value} {withDrawTokensMap.get(withdrawToken)}
              </Typography>
            </div>
            <div className={styles.input}>
              <NumericalInput
                label="Stop-loss activation"
                value={stopLossPrice}
                onChange={(event) => setStopLossPrice(event.target.value)}
                className={styles.price}
                min={0}
                max={price.value}
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
                  rightSide="%"
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
      {props.autoCompoundActive !== null && (
        <div className={styles.row}>
          <div className={styles.rowHeading}>
            <Typography>Auto Compound</Typography>
            <Switch
              size="small"
              onChange={toggleAutoCompound}
              disabled={confirm.loading}
              checked={autoCompound}
            />
          </div>
        </div>
      )}
      <ButtonBase onClick={handleDelete} className={styles.deleteButton}>
        {deleteState.loading && (
          <CircularProgress
            height="1em"
            width="1em"
            className={styles.deleteButtonLoader}
          />
        )}
        <span className={clsx(deleteState.loading && styles.deleteButtonText)}>
          DELETE CONTRACT
        </span>
      </ButtonBase>
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
