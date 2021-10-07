import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { Dialog } from '~/common/dialog'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import * as styles from './settings-contact-form-dialog.css'

export type FormValues = {
  name: string
  address: string
  broker: UserContactBrokerEnum
}

export type SettingsContactFormDialogProps = {
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
  defaultValues?: FormValues
}

export const SettingsContactFormDialog: React.VFC<SettingsContactFormDialogProps> =
  (props) => {
    const {
      handleSubmit: hookFormSubmit,
      register,
      formState,
    } = useForm<Omit<FormValues, 'broker'>>({
      defaultValues: props.defaultValues,
    })

    const handleOnSubmit = (formValues: FormValues) => {
      props.onConfirm({
        ...formValues,
        broker: UserContactBrokerEnum.Email,
      })
    }

    return (
      <Dialog className={styles.root}>
        <form noValidate onSubmit={hookFormSubmit(handleOnSubmit)}>
          <Input
            {...register('name')}
            label="Name"
            placeholder="Contact Name"
            className={styles.input}
            disabled={formState.isSubmitted}
          />
          <Input
            {...register('address')}
            label="Address"
            placeholder="Enter Address"
            className={styles.input}
            helperText="Email or Telegram"
            disabled={formState.isSubmitted || Boolean(props.defaultValues)}
          />
          <div className={styles.buttons}>
            <Button type="submit" size="small" disabled={formState.isSubmitted}>
              {props.defaultValues ? 'Edit' : 'Create'}
            </Button>
            <Button
              onClick={props.onCancel}
              size="small"
              variant="outlined"
              color="red"
              disabled={formState.isSubmitted}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    )
  }
