import clsx from 'clsx'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAsyncFn, useAsyncRetry, useToggle } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Restake, StopLossComponent } from '~/common/load-adapter'
import { Loader } from '~/common/loader'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Slider } from '~/common/slider'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { StakingAutomatesContract } from '~/staking/common'
import * as styles from './invest-stop-loss.css'
import { InvestStepsProgress } from '../invest-steps-progress'

export type InvestStopLossProps = {
  onConfirm: (value: {
    path: string[]
    amountOut: string
    amountOutMin: string
    active: boolean
    mainToken: string
    withdrawToken: string
  }) => void
  adapter?: StopLossComponent
  uni3Adapter?: Restake['stopLoss']
  onScan?: (txId: string) => void
  mainTokens?: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
  withdrawTokens: {
    id: string
    logoUrl: string
    symbol: string
    address: string
  }[]
  initialStopLoss: StakingAutomatesContract['stopLoss']
  onDelete: () => Promise<void>
  onCancel: () => void
  onToggleAutoCompound: (active: boolean) => void
  autoCompoundActive: boolean | null
  canDelete: boolean
  isUniV3: boolean
  onRebalanceToggle: (active: boolean) => void
  rebalanceEnabled: boolean
  inline?: boolean
  onSkip?: () => void
}

export const InvestStopLoss: React.FC<InvestStopLossProps> = (props) => {
  const [stopLoss, toggleStopLoss] = useToggle(
    props.inline || Boolean(props.initialStopLoss)
  )
  const [autoRebalance, toggleAutoRebalance] = useToggle(props.rebalanceEnabled)
  const [autoCompound, toggleAutoCompound] = useToggle(
    props.autoCompoundActive ?? false
  )
  const [mainToken, setMainToken] = useState(
    props.initialStopLoss?.inToken?.id ?? props.mainTokens?.[0]?.id ?? ''
  )
  const [withdrawToken, setWithdrawToken] = useState(
    props.initialStopLoss?.outToken?.id ?? props.withdrawTokens?.[0]?.id ?? ''
  )
  const [stopLossPrice, setStopLossPrice] = useState(
    props.initialStopLoss?.params?.amountOut ?? '0'
  )
  const [percent, setPercent] = useState(props.initialStopLoss ? 0 : 10)

  const priceChangedManully = useRef(false)

  const withDrawTokensMap = useMemo(
    () =>
      props.withdrawTokens?.reduce((acc, token) => {
        acc.set(token.id, {
          symbol: token.symbol,
          address: token.address,
        })

        return acc
      }, new Map<string, { symbol: string; address: string }>()),
    [props.withdrawTokens]
  )
  const mainTokensMap = useMemo(
    () =>
      props.mainTokens?.reduce((acc, token) => {
        acc.set(token.id, {
          symbol: token.symbol,
          address: token.address,
        })

        return acc
      }, new Map<string, { symbol: string; address: string }>()),
    [props.mainTokens]
  )

  const path = useAsyncRetry(async () => {
    const mainTokenAddress = mainTokensMap?.get(mainToken)?.address
    const withdrawTokenAddress = withDrawTokensMap?.get(withdrawToken)?.address

    const pathadapter =
      mainTokenAddress && withdrawTokenAddress
        ? props.adapter?.methods.autoPath(
            mainTokenAddress,
            withdrawTokenAddress
          )
        : undefined

    return props.initialStopLoss?.params?.path ?? pathadapter
  }, [
    props.adapter,
    mainToken,
    mainTokensMap,
    withDrawTokensMap,
    withdrawToken,
    props.initialStopLoss,
  ])

  const price = useAsyncRetry(async () => {
    if (!path.value) return

    return props.adapter?.methods.amountOut(path.value)
  }, [props.adapter, props.initialStopLoss, path.value])

  const handleChangePrice = (event: React.FormEvent<HTMLInputElement>) => {
    priceChangedManully.current = true

    setStopLossPrice(event.currentTarget.value)

    const newPercent = Math.abs(
      Number(
        bignumberUtils.toFixed(
          bignumberUtils.mul(
            bignumberUtils.div(
              bignumberUtils.minus(event.currentTarget.value, price.value),
              price.value
            ),
            100
          )
        )
      )
    )

    setPercent(newPercent)
  }

  const handleChangePercent = (
    event: React.FormEvent<HTMLInputElement> | number | number[]
  ) => {
    const value = Math.abs(
      Number(
        Array.isArray(event) || typeof event === 'number'
          ? event
          : event.currentTarget.value
      )
    )

    setStopLossPrice(
      bignumberUtils.minus(
        price.value,
        bignumberUtils.mul(bignumberUtils.div(value, 100), price.value)
      )
    )

    setPercent(value)
  }

  useEffect(() => {
    if (!price.value || !props.initialStopLoss) return

    const newPercent = Math.abs(
      Number(
        bignumberUtils.toFixed(
          bignumberUtils.mul(
            bignumberUtils.div(
              bignumberUtils.minus(
                props.initialStopLoss.params.amountOut,
                price.value
              ),
              price.value
            ),
            100
          )
        )
      )
    )

    setPercent(newPercent)
  }, [price.value, props.initialStopLoss])
  useEffect(() => {
    if (!price.value || priceChangedManully.current) return

    setStopLossPrice(
      bignumberUtils.minus(
        price.value,
        bignumberUtils.mul(bignumberUtils.div(percent, 100), price.value)
      )
    )
  }, [price.value, percent])

  const [confirm, handleConfirm] = useAsyncFn(async () => {
    if (!props.adapter) return

    if (
      (stopLoss ||
        (props.initialStopLoss?.params?.amountOut &&
          props.initialStopLoss.params.amountOut !== stopLossPrice) ||
        props.inline) &&
      path.value
    ) {
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
    }

    props.onConfirm({
      path: path.value as string[],
      amountOut: stopLossPrice,
      amountOutMin: '0',
      active: stopLoss,
      mainToken,
      withdrawToken,
    })
  }, [
    props.adapter,
    path.value,
    stopLossPrice,
    stopLoss,
    mainToken,
    withdrawToken,
  ])

  const [deleteState, handleDelete] = useAsyncFn(async () => {
    const res = await props.adapter?.methods.removeStopLoss()

    await res?.tx.wait()

    await props.onDelete()

    return props.onCancel()
  }, [])

  const [runNowState, handleRunNow] = useAsyncFn(async () => {
    const can = await props.uni3Adapter?.methods.canEmergencyWithdraw()

    if (can instanceof Error) throw can

    const res = await props.uni3Adapter?.methods.emergencyWithdraw()

    const resWait = await res?.tx.wait()

    if (!resWait?.transactionHash) return

    return props.onScan?.(resWait.transactionHash)
  }, [])

  const handleToggleAutoCompound = () => {
    const active = !autoCompound

    props.onToggleAutoCompound(active)

    toggleAutoCompound(active)
  }

  const handleToggleRebalance = () => {
    const active = !autoRebalance

    props.onRebalanceToggle(active)
    toggleAutoRebalance(active)
  }

  return (
    <>
      <div>
        {props.inline ? (
          <>
            <InvestStepsProgress current={3} success={2} />
            <Typography
              family="mono"
              transform="uppercase"
              as="div"
              align="center"
              className={styles.titleInline}
            >
              Settings
            </Typography>
          </>
        ) : (
          <Typography
            variant="body2"
            transform="uppercase"
            family="mono"
            className={styles.title}
          >
            Settings
          </Typography>
        )}
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
          <Dropdown
            trigger="hover"
            control={
              <ButtonBase>
                <Icon icon="question" width={16} height={16} />
              </ButtonBase>
            }
          >
            You can protect your investment in this pool with our
            <br />
            &apos;Stop-Loss&apos; feature. We will track the value of your
            <br />
            liquidity, and then remove and sell your LP tokens to the single
            <br />
            token when the price is lower than the threshold that you set.
          </Dropdown>
        </div>
        {stopLoss && (
          <>
            {price.loading && !price.value ? (
              <div className={styles.loader}>
                <Loader height={36} />
              </div>
            ) : (
              <>
                <Select
                  label="Main token"
                  className={styles.input}
                  value={mainToken}
                  onChange={(event) => setMainToken(event.currentTarget.value)}
                  disabled={confirm.loading}
                >
                  {props.mainTokens?.map((token) => (
                    <SelectOption value={token.id} key={token.id}>
                      {token.logoUrl ? (
                        <img
                          src={token.logoUrl}
                          className={styles.img}
                          alt=""
                        />
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
                  onChange={(event) =>
                    setWithdrawToken(event.currentTarget.value)
                  }
                  disabled={confirm.loading}
                >
                  {props.withdrawTokens?.map((token) => (
                    <SelectOption value={token.id} key={token.id}>
                      {token.logoUrl ? (
                        <img
                          src={token.logoUrl}
                          className={styles.img}
                          alt=""
                        />
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
                    {withDrawTokensMap.get(withdrawToken)?.symbol}
                  </Typography>
                </div>
                {props.isUniV3 && (
                  <ButtonBase
                    onClick={handleRunNow}
                    className={styles.runNow}
                    disabled={runNowState.loading || !props.canDelete}
                  >
                    {runNowState.loading && (
                      <CircularProgress
                        height="1em"
                        width="1em"
                        className={styles.deleteButtonLoader}
                      />
                    )}
                    <span
                      className={clsx(
                        runNowState.loading && styles.deleteButtonText
                      )}
                    >
                      RUN NOW
                    </span>
                  </ButtonBase>
                )}
                <div className={styles.input}>
                  <NumericalInput
                    label="Stop-loss activation"
                    value={stopLossPrice}
                    onChange={handleChangePrice}
                    className={styles.price}
                    min={0}
                    max={price.value}
                    rightSide={withDrawTokensMap.get(withdrawToken)?.symbol}
                    disabled={confirm.loading}
                  />
                  <div className={styles.inputRow}>
                    <NumericalInput
                      size="small"
                      className={styles.numberInput}
                      value={-percent}
                      min={0}
                      max={100}
                      onChange={handleChangePercent}
                      disabled={confirm.loading}
                      rightSide="%"
                    />
                    <Slider
                      reverse
                      className={styles.slider}
                      value={percent}
                      min={0}
                      max={100}
                      onChange={handleChangePercent}
                      disabled={confirm.loading}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {props.autoCompoundActive !== null && (
        <div className={styles.row}>
          <div className={styles.rowHeading}>
            <Typography>Auto Compound</Typography>
            <Switch
              size="small"
              onChange={handleToggleAutoCompound}
              disabled={confirm.loading}
              checked={autoCompound}
            />
            <Dropdown
              trigger="hover"
              control={
                <ButtonBase>
                  <Icon icon="question" width={16} height={16} />
                </ButtonBase>
              }
            >
              This pool has a built-in &apos;Auto-staking&apos; automation. It
              <br />
              helps you earn more by automatically adding your profits to the
              <br />
              deposit, effectively auto-compounding your interest.
            </Dropdown>
          </div>
        </div>
      )}
      {props.isUniV3 && (
        <div className={styles.row}>
          <div className={styles.rowHeading}>
            <Typography>Auto Rebalance</Typography>
            <Switch
              size="small"
              onChange={handleToggleRebalance}
              disabled={confirm.loading}
              checked={autoRebalance}
            />
            <Dropdown
              trigger="hover"
              control={
                <ButtonBase>
                  <Icon icon="question" width={16} height={16} />
                </ButtonBase>
              }
            >
              This pool has a built-in &apos;Auto Rebalance&apos; automation.
              <br />
              It helps you to continue earn fees when the price of your token
              <br />
              is out of your investment range.
            </Dropdown>
          </div>
        </div>
      )}
      {!props.inline && (
        <>
          <ButtonBase
            onClick={handleDelete}
            className={styles.deleteButton}
            disabled={deleteState.loading || !props.canDelete}
          >
            {deleteState.loading && (
              <CircularProgress
                height="1em"
                width="1em"
                className={styles.deleteButtonLoader}
              />
            )}
            <span
              className={clsx(deleteState.loading && styles.deleteButtonText)}
            >
              DELETE CONTRACT
            </span>
          </ButtonBase>
        </>
      )}
      {props.inline && (
        <Button
          className={styles.confirm}
          loading={confirm.loading}
          onClick={props.onSkip}
          color="secondary"
        >
          SKIP NOW
        </Button>
      )}
      <Button
        className={styles.confirm}
        loading={confirm.loading}
        onClick={handleConfirm}
        color={props.inline ? 'green' : undefined}
      >
        confirm
      </Button>
    </>
  )
}
