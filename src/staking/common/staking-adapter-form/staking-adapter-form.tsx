import { Button, TextField, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'

import { AdapterActions, Adapter, AdapterWallet } from '~/common/load-adapter'
import { bignumberUtils } from '~/common/bignumber-utils'

export type StakingAdapterFormProps = {
  actions: AdapterActions | null
  metrics: Adapter['metrics']
  reward: Adapter['reward']
  staking: Adapter['staking']
  wallet: AdapterWallet | null
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0'
  },

  input: {
    marginBottom: 20
  }
}))

const createStakingAction =
  (
    actions?: AdapterActions | null,
    action?: keyof AdapterActions,
    decimals?: number
  ) =>
  (amount: string) =>
  async () => {
    if (!actions || !action || !decimals) return

    try {
      const sendAmount = bignumberUtils.toSend(amount, decimals)

      const can = await actions[action].can(sendAmount)

      if (!can || can instanceof Error) return

      await actions[action].send(sendAmount)
    } catch (error) {
      console.error(error.message)
    }
  }

export const StakingAdapterForm: React.VFC<Partial<StakingAdapterFormProps>> = (
  props
) => {
  const classes = useStyles()

  const [amount, setAmount] = useState('')

  const handleClaim = createStakingAction(
    props.actions,
    'claim',
    props.staking?.decimals
  )
  const handleStake = createStakingAction(
    props.actions,
    'stake',
    props.staking?.decimals
  )
  const handleUnStake = createStakingAction(
    props.actions,
    'unstake',
    props.staking?.decimals
  )
  const handleExit = createStakingAction(
    props.actions,
    'exit',
    props.staking?.decimals
  )

  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <TextField
        className={classes.input}
        label="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
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
                Balance: {bignumberUtils.format(balance)}
                <br /> Balance: ${bignumberUtils.format(usd)}
              </span>
            )
          )}
        </Typography>
      )}
      <Typography>
        Earned: {bignumberUtils.format(props.wallet?.metrics.earned)}
      </Typography>
      <Typography>
        Earned: ${bignumberUtils.format(props.wallet?.metrics.earnedUSD)}
      </Typography>
      <Typography>
        Staked: {bignumberUtils.format(props.wallet?.metrics.staking)}
      </Typography>
      <Typography>
        Staked: ${bignumberUtils.format(props.wallet?.metrics.stakingUSD)}
      </Typography>
      <Button type="button" onClick={handleClaim(amount)}>
        Claim
      </Button>
      <Button type="button" onClick={handleStake(amount)}>
        Stake
      </Button>
      <Button type="button" onClick={handleUnStake(amount)}>
        Unstake
      </Button>
      <Button type="button" onClick={handleExit(amount)}>
        Exit
      </Button>
    </form>
  )
}
