import { useForm } from 'react-hook-form'

import { Typography } from '~/common/typography'
import { Adapter, AdapterWallet } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import * as styles from './staking-adapter-form.css'

export type StakingAdapterFormProps = {
  metrics: Adapter['metrics']
  reward: Adapter['reward']
  staking: Adapter['staking']
  wallet: AdapterWallet | null
  disabled?: boolean
  tokens?: Record<string, string>
  onConfirm: (amount: string) => void
  poolName: string
}

export const StakingAdapterForm: React.VFC<StakingAdapterFormProps> = (
  props
) => {
  const { register, formState, handleSubmit } = useForm<{ amount: string }>()

  const handleOnSubmit = handleSubmit(({ amount }) => {
    props.onConfirm(amount)
  })

  return (
    <Dialog className={styles.root}>
      <Typography
        variant="body3"
        family="mono"
        transform="uppercase"
        className={styles.title}
      >
        Stake {props.poolName}
      </Typography>
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleOnSubmit}
      >
        <NumericalInput
          label="LP Amount"
          helperText={formState.errors.amount?.message}
          error={Boolean(formState.errors.amount?.message)}
          disabled={props.disabled}
          className={styles.input}
          {...register('amount')}
        />
        <Button type="submit" className={styles.button}>
          Stake
        </Button>
      </form>
    </Dialog>
  )
}
