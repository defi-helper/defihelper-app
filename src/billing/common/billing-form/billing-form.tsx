import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { bignumberUtils } from '~/common/bignumber-utils'
import { NumericalInput } from '~/common/numerical-input'
import { billingFormSchema } from './billing-form.validation'

type FormValues = {
  amount: string
}

export type BillingFormProps = {
  className?: string
  onSubmit: (amount: string) => void
  loading: boolean
  balance?: string | number | null
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    marginBottom: 10,
  },
}))

export const BillingForm: React.VFC<BillingFormProps> = (props) => {
  const classes = useStyles()

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(billingFormSchema),
  })

  return (
    <form
      noValidate
      autoComplete="off"
      className={clsx(classes.root, props.className)}
      onSubmit={handleSubmit((formValues) => props.onSubmit(formValues.amount))}
    >
      <Typography>
        Net balance: {bignumberUtils.format(props.balance)}
      </Typography>
      <NumericalInput
        label="Amount"
        {...register('amount')}
        className={classes.input}
        disabled={props.loading}
        helperText={formState.errors.amount?.message}
        error={Boolean(formState.errors.amount)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={props.loading}
      >
        {props.loading ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  )
}
