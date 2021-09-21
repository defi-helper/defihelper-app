import { Checkbox, FormLabel, MenuItem, TextField } from '@material-ui/core'
import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  AutomateTriggerCreateInputType,
  AutomateTriggerTypeEnum,
  WalletType,
} from '~/graphql/_generated-types'
import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { automationTriggerFormSchema } from './automation-trigger-form.validation'
import * as styles from './automation-trigger-form.css'

export type AutomationTriggerFormProps = {
  className?: string
  wallets: Pick<
    WalletType,
    'address' | 'id' | 'network' | 'createdAt' | 'blockchain' | 'publicKey'
  >[]
  onSubmit: (formValues: AutomateTriggerCreateInputType) => void
  defaultValues?: AutomateTriggerCreateInputType
  loading?: boolean
}

export const AutomationTriggerForm: React.VFC<AutomationTriggerFormProps> = (
  props
) => {
  const { register, handleSubmit, setValue, formState, control } =
    useForm<AutomateTriggerCreateInputType>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(automationTriggerFormSchema),
    })

  const active = register('active')

  return (
    <form
      noValidate
      autoComplete="off"
      className={clsx(styles.root, props.className)}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Controller
        render={({ field }) => (
          <TextField
            label="wallet"
            select
            {...field}
            helperText={formState.errors.wallet?.message}
            error={Boolean(formState.errors.wallet?.message)}
            disabled={Boolean(props.defaultValues) || props.loading}
            defaultValue={props.defaultValues?.wallet ?? ''}
            value={field.value ?? ''}
          >
            {props.wallets.map(({ id, address, network }) => (
              <MenuItem key={id} value={id}>
                address: {address}
                <br />
                network: {network}
              </MenuItem>
            ))}
          </TextField>
        )}
        name="wallet"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            label="Type"
            select
            {...field}
            helperText={formState.errors.type?.message}
            error={Boolean(formState.errors.type?.message)}
            disabled={Boolean(props.defaultValues) || props.loading}
            defaultValue={props.defaultValues?.type ?? ''}
            value={field.value ?? ''}
          >
            {Object.entries(AutomateTriggerTypeEnum).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
        name="type"
        control={control}
      />
      <Input
        label="name"
        {...register('name')}
        helperText={formState.errors.type?.message}
        error={Boolean(formState.errors.type?.message)}
        defaultValue={props.defaultValues?.name}
        disabled={props.loading}
      />
      <FormLabel>
        Active
        <Checkbox
          inputRef={active.ref}
          onChange={(_, checked) => setValue('active', checked)}
          defaultChecked={props.defaultValues?.active ?? undefined}
          disabled={props.loading}
        />
      </FormLabel>
      <Button type="submit" loading={props.loading}>
        {props.defaultValues ? 'Save' : 'Create'}
      </Button>
    </form>
  )
}
