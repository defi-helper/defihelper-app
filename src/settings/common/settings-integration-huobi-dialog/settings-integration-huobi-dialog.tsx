import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { settingsIntegrationHuobiSchema } from './settings-integration-huobi-dialog.validation'
import * as styles from './settings-integration-huobi-dialog.css'

type FormValues = {
  apiKey: string
  apiSecret: string
}

export type SettingsIntegrationBinanceDialogProps = {
  onConfirm: (formValues: FormValues) => void
  defaultValues?: FormValues
}

const HOW_TO_CREATE_API =
  'https://www.huobi.com/support/en-us/detail/360000203002'

export const SettingsIntegrationHuobiDialog: React.VFC<SettingsIntegrationBinanceDialogProps> =
  (props) => {
    const { register, handleSubmit, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsIntegrationHuobiSchema),
    })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          onSubmit={handleSubmit(props.onConfirm)}
          className={styles.form}
        >
          <Typography className={styles.apiHint}>
            Please create an API key (with read permission only) in your Houbi
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
            placeholder="Access Key"
            defaultValue={props.defaultValues?.apiKey}
            helperText={formState.errors.apiKey?.message}
            error={Boolean(formState.errors.apiKey?.message)}
          />
          <Input
            {...register('apiSecret')}
            className={styles.input}
            placeholder="Secret Key"
            defaultValue={props.defaultValues?.apiSecret}
            helperText={formState.errors.apiSecret?.message}
            error={Boolean(formState.errors.apiSecret?.message)}
          />
          <div className={styles.buttons}>
            <Button type="submit">Connect</Button>
          </div>
        </form>
      </Dialog>
    )
  }
