import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { Dialog } from '~/common/dialog'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import * as styles from './settings-contact-form-dialog.css'
import { settingsContactFormSchame } from './settings-contact-form-dialog.schema'

export type FormValues = {
  address: string
  broker: UserContactBrokerEnum
}

export type SettingsContactFormDialogProps = {
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
  defaultValues?: Partial<FormValues>
}

export const SettingsContactFormDialog: React.VFC<SettingsContactFormDialogProps> =
  (props) => {
    const {
      handleSubmit: hookFormSubmit,
      register,
      formState,
      watch,
    } = useForm<FormValues>({
      defaultValues: props.defaultValues,
      resolver: yupResolver(settingsContactFormSchame),
    })

    const handleOnSubmit = ({ broker, address }: FormValues) => {
      props.onConfirm({
        broker,
        address: broker === UserContactBrokerEnum.Email ? address : '',
      })
    }

    const broker = watch('broker')

    return (
      <Dialog className={styles.root}>
        <form noValidate onSubmit={hookFormSubmit(handleOnSubmit)}>
          {broker === UserContactBrokerEnum.Email && (
            <Input
              {...register('address')}
              label="Address"
              placeholder="Enter Address"
              className={styles.input}
              disabled={formState.isSubmitting || Boolean(props.defaultValues)}
              helperText={formState.errors.address?.message}
              error={Boolean(formState.errors.address?.message)}
            />
          )}
          <div className={styles.buttons}>
            <Button
              type="submit"
              size="small"
              disabled={formState.isSubmitting}
            >
              {props.defaultValues ? 'Save' : 'Create'}
            </Button>
            <Button
              onClick={props.onCancel}
              size="small"
              variant="outlined"
              color="red"
              disabled={formState.isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    )
  }
