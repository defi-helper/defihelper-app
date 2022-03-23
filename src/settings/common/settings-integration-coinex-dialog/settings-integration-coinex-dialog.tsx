import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { settingsIntegrationSchema } from './settings-integration-coinex-dialog.validation'
import * as styles from './settings-integration-coinex-dialog.css'

type FormValues = {
  apiKey: string
  secret: string
}

export type SettingsIntegrationDialogProps = {
  onConfirm: (formValues: FormValues) => void
  defaultValues?: FormValues
}

const HOW_TO_CREATE_API = // todo PUT CORRECT LINK HERE
  'https://support.coinex.com/hc/en-us/articles/900004316323-What-is-API-and-How-to-Set-it-Up-'

export const SettingsIntegrationCoinexDialog: React.VFC<SettingsIntegrationDialogProps> =
  (props) => {
    const { register, handleSubmit, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsIntegrationSchema),
    })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          onSubmit={handleSubmit(props.onConfirm)}
          className={styles.form}
        >
          <Typography className={styles.apiHint}>
            Please create an API key (with read permission only) in your CoinEx
            account, and fill in the fields below
            <br />
            <br />
            <Link
              href={HOW_TO_CREATE_API}
              target="_blank"
              className={styles.createApiInstructionLink}
            >
              How to create API key
            </Link>
          </Typography>

          <Input
            {...register('apiKey')}
            className={styles.input}
            placeholder="Access ID"
            defaultValue={props.defaultValues?.apiKey}
            helperText={formState.errors.apiKey?.message}
            error={Boolean(formState.errors.apiKey?.message)}
          />
          <Input
            {...register('secret')}
            className={styles.input}
            placeholder="Secret Key"
            defaultValue={props.defaultValues?.secret}
            helperText={formState.errors.secret?.message}
            error={Boolean(formState.errors.secret?.message)}
          />

          <div className={styles.buttons}>
            <Button type="submit">Connect</Button>
          </div>
        </form>
      </Dialog>
    )
  }
