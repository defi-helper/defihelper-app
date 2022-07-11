import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { analytics } from '~/analytics'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import * as styles from './settings-billing-form-dialog.css'
import { settingsBillingFormSchema } from './settings-billing-form-dialog.validation'

type FormValues = {
  amount: string
}

export type SettingsBillingFormDialogProps = {
  onConfirm: (formValues: FormValues) => void
  onCancel: () => void
}

export const SettingsBillingFormDialog: React.VFC<SettingsBillingFormDialogProps> =
  (props) => {
    const { register, formState, handleSubmit, getValues } =
      useForm<FormValues>({
        resolver: yupResolver(settingsBillingFormSchema),
      })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleSubmit(props.onConfirm)}
        >
          <NumericalInput
            {...register('amount')}
            className={styles.input}
            placeholder="Enter amount"
            helperText={formState.errors.amount?.message}
            error={Boolean(formState.errors.amount?.message)}
          />
          <div className={styles.buttons}>
            <Button
              type="submit"
              onClick={() => {
                analytics.log(
                  'auto_staking_pop_up_top_up_your_defihelper_balance_submit_click',
                  {
                    amount: getValues('amount'),
                  }
                )
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={props.onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    )
  }
