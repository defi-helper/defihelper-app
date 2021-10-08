import { MenuItem, TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { UserContactFragmentFragment } from '~/graphql/_generated-types'
import * as styles from './automation-action-notification.css'

type FormValues = {
  contactId: string
  message: string
}

export type AutomationActionNotificationProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
  contacts: UserContactFragmentFragment[]
}

export const AutomationActionNotification: React.VFC<AutomationActionNotificationProps> =
  (props) => {
    const { handleSubmit, register, formState, control } = useForm<FormValues>({
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
        <Controller
          render={({ field }) => (
            <TextField
              label="Contact"
              {...field}
              select
              helperText={formState.errors.contactId?.message}
              error={Boolean(formState.errors.contactId?.message)}
              defaultValue={props.defaultValues?.contactId}
              value={field.value || ''}
            >
              {props.contacts.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="contactId"
          control={control}
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
