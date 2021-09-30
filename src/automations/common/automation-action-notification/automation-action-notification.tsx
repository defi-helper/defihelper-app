import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import * as styles from './automation-action-notification.css'

type FormValues = {
  contactId: string
  message: string
}

export type AutomationActionNotificationProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
}

export const AutomationActionNotification: React.VFC<AutomationActionNotificationProps> =
  (props) => {
    const { handleSubmit, register, formState } = useForm<FormValues>({
      defaultValues: props.defaultValues,
    })

    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
        )}
        className={styles.root}
      >
        <Input
          placeholder="Contact Id"
          {...register('contactId', { required: true })}
          error={Boolean(formState.errors.contactId?.message)}
          helperText={formState.errors.contactId?.message}
          defaultValue={props.defaultValues?.contactId}
        />
        <Input
          placeholder="Message"
          {...register('message', { required: true })}
          error={Boolean(formState.errors.message?.message)}
          helperText={formState.errors.message?.message}
          defaultValue={props.defaultValues?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
