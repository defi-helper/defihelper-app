import { MenuItem, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import * as styles from './automation-condition-ethereum-optimal.css'

type FormValues = {
  id: string
}

export type AutomationConditionEthereumOptimalProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
  contracts: AutomationContractFragmentFragment[]
}

export const AutomationConditionEthereumOptimal: React.VFC<AutomationConditionEthereumOptimalProps> =
  (props) => {
    const { handleSubmit, formState, control } = useForm<FormValues>({
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
              label="Contract"
              {...field}
              select
              helperText={formState.errors.id?.message}
              error={Boolean(formState.errors.id?.message)}
              defaultValue={props.defaultValues?.id}
              value={field.value || ''}
            >
              {props.contracts.map((contract) => (
                <MenuItem key={contract.id} value={contract.id}>
                  {contract.adapter}({contract.protocol.name})
                  {contract.wallet.address}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="id"
          control={control}
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
