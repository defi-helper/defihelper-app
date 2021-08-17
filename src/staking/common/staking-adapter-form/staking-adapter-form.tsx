import { Button, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'

import { Typography } from '~/common/typography'
import { Adapter, AdapterWallet } from '~/common/load-adapter'
import { bignumberUtils } from '~/common/bignumber-utils'
import { NumericalInput } from '~/common/numerical-input'

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
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },

  input: {
    marginBottom: 20,
  },
}))

export const StakingAdapterForm: React.VFC<Partial<StakingAdapterFormProps>> = (
  props
) => {
  const classes = useStyles()

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
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <NumericalInput
        className={classes.input}
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
          {Object.entries(props.wallet.earned).map(
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
      <Button type="submit" onClick={handleStake} disabled={props.disabled}>
        {props.stake ? 'loading...' : 'Stake'}
      </Button>
      <Button type="submit" onClick={handleUnStake} disabled={props.disabled}>
        {props.unstake ? 'loading...' : 'Unstake'}
      </Button>
      <Button onClick={handleClaim} disabled={props.disabled}>
        {props.claim ? 'loading...' : 'Claim'}
      </Button>
      <Button onClick={handleExit} disabled={props.disabled}>
        {props.exit ? 'loading...' : 'Exit'}
      </Button>
    </form>
  )
}
