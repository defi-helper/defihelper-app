import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-action-ethereum-run.css'

type FormValues = {
  id: string
}

export type AutomationActionEthereumRunProps = {
  className?: string
  onSubmit: (formValues: string) => void
  onDeploy: () => void
  contracts: AutomationContractFragmentFragment[]
  defaultValues?: FormValues
}

export const AutomationActionEthereumRun: React.VFC<AutomationActionEthereumRunProps> =
  (props) => {
    const {
      formState,
      control,
      handleSubmit: reactHookSubmit,
    } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    const handleSubmit = (formValues: FormValues) => {
      props.onSubmit(JSON.stringify({ id: formValues.id }))
    }

    return (
      <AutomationForm onSubmit={reactHookSubmit(handleSubmit)}>
        <Controller
          render={({ field }) => (
            <Select
              label="Contract"
              {...field}
              helperText={formState.errors.id?.message}
              error={Boolean(formState.errors.id?.message)}
              defaultValue={props.defaultValues?.id}
              value={field.value || ''}
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
        <Button onClick={props.onDeploy} className={styles.input}>
          Deploy new
        </Button>
        <Button type="submit">Save</Button>
      </AutomationForm>
    )
  }
