import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { AutomationForm } from '../automation-form'
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
      <AutomationForm
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
        )}
      >
        <Controller
          render={({ field }) => (
            <Select
              label="Contract"
              {...field}
              helperText={formState.errors.id?.message}
              error={Boolean(formState.errors.id?.message)}
              value={field.value || props.defaultValues?.id || ''}
              className={styles.input}
            >
              {props.contracts.map((contract) => (
                <SelectOption key={contract.id} value={contract.id}>
                  {contract.adapter}({contract.protocol.name})
                  {contract.wallet.address}
                </SelectOption>
              ))}
            </Select>
          )}
          name="id"
          control={control}
        />
        <Button type="submit">Submit</Button>
      </AutomationForm>
    )
  }
