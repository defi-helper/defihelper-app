import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { settingsRenameSchema } from './settings-rename-wallet-dialog.validation'
import * as styles from './settings-rename-wallet-dialog.css'

type FormValues = {
  name: string
}

export type SettingsRenameWalletDialogProps = {
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
  defaultValues?: FormValues
}

export const SettingsRenameWalletDialog: React.VFC<SettingsRenameWalletDialogProps> =
  (props) => {
    const { register, handleSubmit, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsRenameSchema),
    })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          onSubmit={handleSubmit(props.onConfirm)}
          className={styles.form}
        >
          <Input
            {...register('name')}
            className={styles.input}
            placeholder="Enter wallet name"
            defaultValue={props.defaultValues?.name}
            helperText={formState.errors.name?.message}
            error={Boolean(formState.errors.name?.message)}
          />
          <div className={styles.buttons}>
            <Button type="submit">Rename</Button>
            <Button variant="outlined" onClick={props.onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    )
  }
