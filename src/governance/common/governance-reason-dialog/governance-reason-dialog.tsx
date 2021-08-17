import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import * as styles from './governance-reason-dialog.css'

export type GovernanceReasonDialogProps = {
  onConfirm: (reason: string) => void
}

export const GovernanceReasonDialog: React.VFC<GovernanceReasonDialogProps> = (
  props
) => {
  const { register, handleSubmit, formState } = useForm<{ reason: string }>()

  return (
    <Dialog className={styles.root}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit((formValues) =>
          props.onConfirm(formValues.reason)
        )}
        className={styles.form}
      >
        <Input
          label="Reason"
          {...register('reason')}
          disabled={formState.isSubmitting}
          className={styles.input}
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Dialog>
  )
}
