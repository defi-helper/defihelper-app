import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { settingsIntegrationBinanceSchema } from './settings-integration-binance-dialog.validation'
import * as styles from './settings-integration-binance-dialog.css'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { createApiInstructionLink } from './settings-integration-binance-dialog.css'

type FormValues = {
  apiKey: string
  secretKey: string
}

export type SettingsIntegrationBinanceDialogProps = {
  onConfirm: (formValues: FormValues) => void
  defaultValues?: FormValues
}

export const SettingsIntegrationBinanceDialog: React.VFC<SettingsIntegrationBinanceDialogProps> =
  (props) => {
    const { register, handleSubmit, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsIntegrationBinanceSchema),
    })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          onSubmit={handleSubmit(props.onConfirm)}
          className={styles.form}
        >
          <Typography className={styles.apiHint}>
            Please create API key(select read permission only for your safety)
            in your Binance account and fill the fields below. Keep in mind we
            can not to spend or withdraw any assets from your account!
            <br />
            <Link
              href="https://www.binance.com/en/support/faq/360002502072"
              target="_blank"
              className={createApiInstructionLink}
            >
              How to create API key
            </Link>
          </Typography>

          <Input
            {...register('apiKey')}
            className={styles.input}
            placeholder="API Key"
            defaultValue={props.defaultValues?.apiKey}
            helperText={formState.errors.apiKey?.message}
            error={Boolean(formState.errors.apiKey?.message)}
          />
          <Input
            {...register('secretKey')}
            className={styles.input}
            placeholder="Secret key"
            defaultValue={props.defaultValues?.secretKey}
            helperText={formState.errors.secretKey?.message}
            error={Boolean(formState.errors.secretKey?.message)}
          />
          <div className={styles.buttons}>
            <Button type="submit">Connect</Button>
          </div>
        </form>
      </Dialog>
    )
  }
