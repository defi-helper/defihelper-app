import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdateEffect, useUnmount } from 'react-use'
import isEmpty from 'lodash.isempty'

import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { settingsIntegrationSchema } from './settings-integration-poloniex-form.validation'
import * as styles from './settings-integration-poloniex-form.css'

type FormValues = {
  apiKey: string
  secret: string
}

export type SettingsIntegrationDialogProps = {
  onSubmit: (formValues: FormValues) => void
  onChange: (formValues: Partial<FormValues>) => void
  defaultValues?: FormValues
  className?: string
}

const HOW_TO_CREATE_API =
  'https://support.poloniex.com/hc/en-us/articles/360060622793-How-to-Create-an-API-Secret-Key-Set'

export const SettingsIntegrationPoloniexForm: React.VFC<SettingsIntegrationDialogProps> =
  (props) => {
    const { register, handleSubmit, formState, watch } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsIntegrationSchema),
      mode: 'onBlur',
    })

    const formValues = watch()

    useUpdateEffect(() => {
      if (!isEmpty(formState.errors)) return props.onChange?.({})

      props.onChange?.(formValues)
    }, [formValues, formState])

    useUnmount(() => {
      props.onChange?.({})
    })

    return (
      <form
        noValidate
        onSubmit={handleSubmit(props.onSubmit)}
        className={clsx(styles.form, props.className)}
      >
        <Input
          {...register('apiKey')}
          className={styles.input}
          placeholder="API key"
          defaultValue={props.defaultValues?.apiKey}
          helperText={formState.errors.apiKey?.message}
          error={Boolean(formState.errors.apiKey?.message)}
          label={
            <Link
              href={HOW_TO_CREATE_API}
              target="_blank"
              className={styles.createApiInstructionLink}
            >
              How to create API key
            </Link>
          }
        />
        <Input
          {...register('secret')}
          className={styles.input}
          placeholder="Secret"
          defaultValue={props.defaultValues?.secret}
          helperText={formState.errors.secret?.message}
          error={Boolean(formState.errors.secret?.message)}
        />
      </form>
    )
  }
