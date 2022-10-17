import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useEffect, useState } from 'react'
import { useThrottle } from 'react-use'
import { bignumberUtils } from '~/common/bignumber-utils'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Checkbox } from '~/common/checkbox'
import { dateUtils } from '~/common/date-utils'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
import { Paper } from '~/common/paper'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import { Typography } from '~/common/typography'
import { Contract } from '~/staking/common'
import * as styles from './staking-apy-dialog.css'
import * as model from './staking-apy-dialog.model'

export type StakingApyDialogProps = {
  staked: string
  onCancel: () => void
  onConfirm: () => void
  tokens: Contract['tokens']
  contractName: Contract['name']
  contractId: Contract['id']
}

const StakedFor: Record<string, number> = {
  '1D': 1,
  '7D': 7,
  '30D': 30,
  '1Y': 365,
}

const Tabs = (props: {
  children: Record<string, number>
  title: React.ReactNode
  onChange: (value: number) => void
  value: number
  className?: string
}) => {
  return (
    <div className={clsx(styles.tabs, props.className)}>
      <Typography variant="body3" className={styles.label}>
        {props.title}
      </Typography>
      <div className={styles.tabsPaper}>
        {Object.entries(props.children).map(([key, value]) => (
          <ButtonBase
            key={value}
            onClick={() => props.onChange(value)}
            className={clsx(styles.tabsItem, {
              [styles.tabsItemActive]: props.value === value,
            })}
          >
            {key}
          </ButtonBase>
        ))}
      </div>
    </div>
  )
}

export const StakingApyDialog: React.FC<StakingApyDialogProps> = (props) => {
  const [amount, setAmount] = useState(
    bignumberUtils.eq(props.staked, 0) ? '1000' : props.staked
  )
  const [stakedFor, setStakedFor] = useState(StakedFor['1D'])
  const [isRestake, setIsRestake] = useState(true)

  const throttledAmount = useThrottle(amount, 500)

  const restakeCalculator = useStore(model.$restakeCalculator)

  useEffect(() => {
    model.restakeCalculatorFx({
      contract: props.contractId,
      amount: throttledAmount,
      period: stakedFor,
      isRestake,
    })
  }, [throttledAmount, stakedFor, isRestake, props.contractId])

  useEffect(() => {
    return () => {
      model.reset()
    }
  }, [])

  const apyBoost = bignumberUtils.mul(restakeCalculator?.apyBoost, 100)

  return (
    <Dialog className={styles.root}>
      <Typography
        variant="body3"
        family="mono"
        transform="uppercase"
        className={styles.title}
      >
        Roi calculator
      </Typography>
      {!isEmpty([...props.tokens.stake, ...props.tokens.reward]) && (
        <div>
          <StakeRewardTokens
            stakeTokens={props.tokens.stake}
            rewardTokens={props.tokens.reward}
            size={20}
          />
        </div>
      )}
      <NumericalInput
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        rightSide="$"
        className={styles.mb16}
        label="Amount"
      />
      <Tabs
        title="Staked for"
        onChange={setStakedFor}
        value={stakedFor}
        className={styles.mb16}
      >
        {StakedFor}
      </Tabs>
      <Typography variant="body3" className={clsx(styles.label, styles.mb16)}>
        Auto-compouding
        <Checkbox
          checked={isRestake}
          onChange={(event) => setIsRestake(event.target.checked)}
        />
      </Typography>
      <Link
        href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
        target="_blank"
        color="blue"
        className={styles.howItWorks}
      >
        How auto-staking works?
      </Link>
      <Paper radius={8} className={styles.paper}>
        <div>
          <Typography variant="body3" className={styles.fs12}>
            Yield in USD*
          </Typography>
          <Typography variant="body2" weight="bold">
            ${bignumberUtils.format(restakeCalculator?.earnedUSD)}
          </Typography>
        </div>
        {isRestake && (
          <>
            <div>
              <Typography variant="body3" className={styles.fs12}>
                Next restake at
              </Typography>
              <Typography variant="body2" weight="bold">
                {restakeCalculator?.nextRestakeAt
                  ? dateUtils.format(
                      restakeCalculator.nextRestakeAt,
                      'DD/MM HH:mm'
                    )
                  : '-'}
              </Typography>
            </div>
            <div>
              <Typography variant="body3" className={styles.fs12}>
                Boosted APY
              </Typography>
              <Typography variant="body2" weight="bold">
                {bignumberUtils.gt(apyBoost, 0) ? (
                  <>{bignumberUtils.formatMax(apyBoost)} %</>
                ) : (
                  <>
                    You will earn $
                    {bignumberUtils.format(restakeCalculator?.earnedUSD)} in
                    next 30 days. It&apos;s not enough to use the
                    auto-compounding effectively
                  </>
                )}
              </Typography>
            </div>
          </>
        )}
      </Paper>
      <Typography variant="body3" className={styles.attention}>
        *the amount of yield is calculated based on the average price of token
        for the last 30 days
      </Typography>
      <Button color="green" onClick={props.onConfirm} className={styles.button}>
        INVEST
      </Button>
    </Dialog>
  )
}
