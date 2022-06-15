import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useUpdateEffect, useUnmount } from 'react-use'
import isEmpty from 'lodash.isempty'

import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { settingsIntegrationHuobiSchema } from './settings-integration-huobi-form.validation'
import * as styles from './settings-integration-huobi-dialog.css'

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
  'https://www.huobi.com/support/en-us/detail/360000203002'

export const SettingsIntegrationHuobiForm: React.VFC<SettingsIntegrationDialogProps> =
  (props) => {
    const { register, handleSubmit, formState, watch } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsIntegrationHuobiSchema),
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
          placeholder="Access Key"
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
          placeholder="Secret Key"
          defaultValue={props.defaultValues?.secret}
          helperText={formState.errors.secret?.message}
          error={Boolean(formState.errors.secret?.message)}
        />
      </form>
    )
  }
