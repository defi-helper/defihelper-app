import clsx from 'clsx'
import { MenuItem, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '~/common/input'
import * as styles from './automation-condition-ethereum-balance.css'
import { Button } from '~/common/button'
import { automationConditionEthereumSchema } from './automation-condition-ethereum.validation'
import { NumericalInput } from '~/common/numerical-input'

type FormValues = {
  wallet: string
  value: string
  op: string
  network: string
}

export type AutomationConditionEthereumBalanceProps = {
  className?: string
  onSubmit: (formValues: string) => void
  defaultValues: FormValues
}

enum ConditionTypes {
  greater = '>',
  greaterOrEqual = '>=',
  less = '<',
  lessOrEqual = '<=',
  notEqual = '!=',
  equal = '==',
}

enum Networks {
  ethereum = '1',
  ropsten = '2',
  binance = '56',
}

export const AutomationConditionEthereumBalance: React.VFC<AutomationConditionEthereumBalanceProps> =
  (props) => {
    const { register, handleSubmit, formState, control } = useForm<FormValues>({
      resolver: yupResolver(automationConditionEthereumSchema),
      defaultValues: props.defaultValues,
    })

    return (
      <form
        className={clsx(styles.root, props.className)}
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
        )}
      >
        <Controller
          render={({ field }) => (
            <TextField
              label="Network"
              {...field}
              select
              helperText={formState.errors.network?.message}
              error={Boolean(formState.errors.network?.message)}
              defaultValue={props.defaultValues.network}
            >
              {Object.entries(Networks).map(([key, networkId]) => (
                <MenuItem key={key} value={networkId}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="network"
          control={control}
        />
        <Input
          label="wallet"
          {...register('wallet')}
          helperText={formState.errors.wallet?.message}
          error={Boolean(formState.errors.wallet?.message)}
          defaultValue={props.defaultValues.wallet}
        />
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Condition"
              select
              helperText={formState.errors.op?.message}
              error={Boolean(formState.errors.op?.message)}
              defaultValue={props.defaultValues.op}
            >
              {Object.entries(ConditionTypes).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="op"
          control={control}
        />
        <NumericalInput
          label="value"
          {...register('value')}
          helperText={formState.errors.value?.message}
          error={Boolean(formState.errors.value?.message)}
          defaultValue={props.defaultValues.value}
        />
        <Button type="submit" size="small">
          Save
        </Button>
      </form>
    )
  }
