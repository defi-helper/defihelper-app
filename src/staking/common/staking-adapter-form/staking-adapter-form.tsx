import { useEffect, useState } from 'react'

import { Typography } from '~/common/typography'
import { Adapter, AdapterWallet } from '~/common/load-adapter'
import { bignumberUtils } from '~/common/bignumber-utils'
import { NumericalInput } from '~/common/numerical-input'
import { Button } from '~/common/button'
import * as styles from './staking-adapter-form.css'

export type StakingAdapterFormProps = {
  metrics: Adapter['metrics']
  reward: Adapter['reward']
  staking: Adapter['staking']
  wallet: AdapterWallet | null
  disabled?: boolean
  onClaim: (amount: string) => void
  onStake: (amount: string) => void
  onUnStake: (amount: string) => void
  onExit: (amount: string) => void
  claim?: boolean
  exit?: boolean
  stake?: boolean
  unstake?: boolean
  tokens?: Record<string, string>
  onTurnOn: () => void
}

export const StakingAdapterForm: React.VFC<Partial<StakingAdapterFormProps>> = (
  props
) => {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const handleClaim = () => props.onClaim?.(amount)
  const handleStake = () => props.onStake?.(amount)
  const handleUnStake = () => props.onUnStake?.(amount)
  const handleExit = () => props.onExit?.(amount)

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAmount(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!amount) {
      setError('Required')
    } else {
      setError('')
    }
  }, [amount])

  return (
    <form
      noValidate
      autoComplete="off"
      className={styles.root}
      onSubmit={handleSubmit}
    >
      {false && (
        <>
          <NumericalInput
            className={styles.input}
            label="Amount"
            value={amount}
            onChange={handleChange}
            helperText={error}
            error={Boolean(error)}
            disabled={props.disabled}
          />
          <Typography>
            APY: {bignumberUtils.format(props.metrics?.aprYear)} %
          </Typography>
          <Typography>
            Total Value Locked: ${bignumberUtils.format(props.metrics?.tvl)}
          </Typography>
          {props.wallet && (
            <Typography>
              {Object.entries(props.wallet?.earned ?? {}).map(
                ([address, { balance, usd }]) => (
                  <span key={address}>
                    Balance: {bignumberUtils.format(balance)}{' '}
                    {props.tokens?.[address]} ($
                    {bignumberUtils.format(usd)})
                  </span>
                )
              )}
            </Typography>
          )}
          <Typography>
            Earned: {bignumberUtils.format(props.wallet?.metrics.earned)}{' '}
            {Object.keys(props.wallet?.earned ?? {}).map(
              (address) => props.tokens?.[address]
            )}{' '}
            ($
            {bignumberUtils.format(props.wallet?.metrics.earnedUSD)})
          </Typography>
          <Typography>
            Staked: {bignumberUtils.format(props.wallet?.metrics.staking)}{' '}
            {Object.keys(props.wallet?.staked ?? {}).map(
              (address) => props.tokens?.[address]
            )}{' '}
            ($
            {bignumberUtils.format(props.wallet?.metrics.stakingUSD)})
          </Typography>
        </>
      )}
      <div>
        <Button
          disabled={props.disabled}
          size="small"
          color="pink"
          variant="light"
        >
          {props.stake ? 'loading...' : '0 Notifications'}
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          onClick={handleStake}
          disabled={props.disabled}
          size="small"
          color="blue"
          variant="light"
        >
          {props.stake ? 'loading...' : 'Stake'}
        </Button>
      </div>
      <div className={styles.turnOn}>
        <Button
          onClick={props.onTurnOn}
          disabled={props.disabled}
          size="small"
          color="lime"
          variant="light"
        >
          {props.unstake ? 'loading...' : 'Turn on'}
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          onClick={handleUnStake}
          disabled={props.disabled}
          size="small"
          color="red"
          variant="light"
        >
          {props.unstake ? 'loading...' : 'Unstake'}
        </Button>
      </div>
      <div className={styles.claim}>
        <Button
          onClick={handleClaim}
          disabled={props.disabled}
          size="small"
          color="green"
          variant="light"
        >
          {props.claim ? 'loading...' : 'Claim'}
        </Button>
      </div>
      {false && (
        <div>
          <Button onClick={handleExit} disabled={props.disabled} size="small">
            {props.exit ? 'loading...' : 'Exit'}
          </Button>
        </div>
      )}
    </form>
  )
}
