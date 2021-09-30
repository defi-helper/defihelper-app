import { useMemo } from 'react'
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
import { Typography } from '~/common/typography'
import { Input } from '~/common/input'
import { automationTriggerFormSchema } from './automation-trigger-form.validation'
import { safeJsonParse } from '../safe-json-parse'
import * as styles from './automation-trigger-form.css'

type Params = {
  network: string
  address: string
  event: string
}

type FormValues = Omit<AutomateTriggerCreateInputType, 'params'> & Params

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
  const defaultValues = useMemo(() => {
    const { params, ...values } = props.defaultValues ?? {}

    return {
      ...values,
      ...safeJsonParse(params),
    }
  }, [props.defaultValues])

  const {
    register,
    handleSubmit: hookFormSubmit,
    setValue,
    formState,
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(automationTriggerFormSchema),
  })

  const active = register('active')

  const handleSubmit = (formValues: FormValues) => {
    const { event, network, address, ...restofValues } = formValues

    props.onSubmit({
      ...restofValues,
      params: JSON.stringify({ event, network, address }),
    })
  }

  return (
    <form
      noValidate
      autoComplete="off"
      className={clsx(styles.root, props.className)}
      onSubmit={hookFormSubmit(handleSubmit)}
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
        placeholder="Name"
        {...register('name')}
        helperText={formState.errors.name?.message}
        error={Boolean(formState.errors.name?.message)}
        defaultValue={props.defaultValues?.name}
        disabled={props.loading}
      />
      <div>
        <Typography>Params</Typography>
        <Input
          placeholder="Network"
          {...register('network')}
          helperText={formState.errors.network?.message}
          error={Boolean(formState.errors.network?.message)}
          defaultValue={defaultValues.network}
          disabled={Boolean(props.defaultValues) || props.loading}
        />
        <Input
          placeholder="Address"
          {...register('address')}
          helperText={formState.errors.address?.message}
          error={Boolean(formState.errors.address?.message)}
          defaultValue={defaultValues.address}
          disabled={Boolean(props.defaultValues) || props.loading}
        />
        <Input
          placeholder="Event"
          {...register('event')}
          helperText={formState.errors.event?.message}
          error={Boolean(formState.errors.event?.message)}
          defaultValue={defaultValues.event}
          disabled={Boolean(props.defaultValues) || props.loading}
        />
      </div>
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
