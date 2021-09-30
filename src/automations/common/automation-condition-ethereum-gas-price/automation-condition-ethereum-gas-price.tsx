import { MenuItem, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { NumericalInput } from '~/common/numerical-input'
import { Networks } from '../constants'
import * as styles from './automation-condition-ethereum-gas-price.css'

type FormValues = {
  network: string
  tolerance: string
}

export type AutomationConditionEthereumGasPriceProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
}

export const AutomationConditionEthereumGasPrice: React.VFC<AutomationConditionEthereumGasPriceProps> =
  (props) => {
    const { handleSubmit, formState, register, control } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    return (
      <form
        noValidate
        autoComplete="off"
        className={styles.root}
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
              defaultValue={props.defaultValues?.network}
              value={field.value || ''}
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
        <NumericalInput
          {...register('tolerance')}
          placeholder="Tolerance"
          helperText={formState.errors.tolerance?.message}
          error={Boolean(formState.errors.tolerance?.message)}
          defaultValue={props.defaultValues?.tolerance}
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
