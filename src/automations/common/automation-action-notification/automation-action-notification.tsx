import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { UserContactFragmentFragment } from '~/graphql/_generated-types'
import { AutomationForm } from '../automation-form'
import { AutomationContactsDialog } from '../automation-contacts-dialog'
import { AutomationChooseButton } from '../automation-choose-button'
import { Icon } from '~/common/icon'
import * as styles from './automation-action-notification.css'
import { automationActionNotificationSchema } from './automation-action-notification.validation'

type FormValues = {
  contact: UserContactFragmentFragment
  message: string
}

export type AutomationActionNotificationProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: Omit<FormValues, 'contact'> & { contactId: string }
  contacts: UserContactFragmentFragment[]
}

export const AutomationActionNotification: React.VFC<AutomationActionNotificationProps> =
  (props) => {
    const {
      handleSubmit,
      register,
      formState,
      control,
      setValue,
      reset,
      watch,
      trigger,
    } = useForm<FormValues>({
      resolver: yupResolver(automationActionNotificationSchema),
    })

    const [openContactDialog] = useDialog(AutomationContactsDialog)

    const handleAddContact = async () => {
      try {
        const contact = await openContactDialog({
          contacts: props.contacts,
        })

        setValue('contact', contact)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    useEffect(() => {
      const contact = props.contacts.find(
        ({ id }) => id === props.defaultValues?.contactId
      )

      if (contact) {
        reset({
          contact,
          message: props.defaultValues?.message,
        })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultValues, props.contacts])

    const contactId = watch('contact.id')

    useEffect(() => {
      if (!contactId) return

      trigger()
    }, [contactId, trigger])

    return (
      <AutomationForm
        onSubmit={handleSubmit(({ contact, message }) =>
          props.onSubmit(
            JSON.stringify({
              message,
              contactId: contact?.id,
            })
          )
        )}
      >
        <Controller
          render={({ field }) => (
            <AutomationChooseButton
              onClick={props.contacts.length ? handleAddContact : undefined}
              label="contact"
              className={styles.input}
              error={formState.errors.contact?.id?.message}
            >
              {props.contacts.length ? (
                <>
                  {field.value && (
                    <>
                      <Icon icon={field.value.broker} width="24" height="24" />
                      {field.value?.name.length
                        ? field.value?.name
                        : field.value?.address || 'Untitled'}
                    </>
                  )}
                  {!field.value && 'Choose contact'}
                </>
              ) : (
                'Please add your contact in settings first'
              )}
            </AutomationChooseButton>
          )}
          name="contact"
          control={control}
        />
        <Input
          label="Message"
          {...register('message', { required: true })}
          type="textarea"
          error={Boolean(formState.errors.message?.message)}
          defaultValue={props.defaultValues?.message}
          className={styles.input}
        />
        <Button type="submit">Submit</Button>
      </AutomationForm>
    )
  }
