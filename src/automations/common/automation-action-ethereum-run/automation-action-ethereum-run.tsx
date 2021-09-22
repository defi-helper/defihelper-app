import { MenuItem, TextField } from '@material-ui/core'
import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import * as styles from './automation-action-ethereum-run.css'

type FormValues = { contract: string }

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
      props.onSubmit(JSON.stringify({ id: formValues.contract }))
    }

    return (
      <form
        className={clsx(styles.root, props.className)}
        onSubmit={reactHookSubmit(handleSubmit)}
      >
        <Controller
          render={({ field }) => (
            <TextField
              label="Contract"
              {...field}
              select
              helperText={formState.errors.contract?.message}
              error={Boolean(formState.errors.contract?.message)}
              defaultValue={props.defaultValues?.contract}
              value={field.value || ''}
            >
              {props.contracts.map((contract) => (
                <MenuItem key={contract.id} value={contract.address}>
                  {contract.adapter}({contract.protocol.name})
                  {contract.wallet.address}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="contract"
          control={control}
        />
        <Button onClick={props.onDeploy}>Deploy new</Button>
        <Button type="submit" size="small">
          Save
        </Button>
      </form>
    )
  }
