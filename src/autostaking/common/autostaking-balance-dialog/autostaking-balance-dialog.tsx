import { useForm } from 'react-hook-form'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-balance-dialog.css'

type FormValues = {
  amount: string
}

export type AutostakingBalanceDialogProps = {
  onConfirm: () => void
  balance: string
  network: string
  wallet: string
  priceUSD: string | undefined
  recomendedIncome: string | undefined
  token: string | undefined
  onSubmit: (formValues: FormValues) => Promise<void>
}

export const AutostakingBalanceDialog: React.VFC<AutostakingBalanceDialogProps> =
  (props) => {
    const { register, handleSubmit, formState, setValue } =
      useForm<FormValues>()

    const handleOnSubmit = handleSubmit(async (formValues) => {
      try {
        await props.onSubmit(formValues)
        props.onConfirm()
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })

    const handleRecommendedIncome = () => {
      setValue('amount', props.recomendedIncome ?? '0')
    }

    return (
      <Dialog className={styles.root}>
        <div className={styles.mb}>
          <Typography
            variant="body2"
            transform="uppercase"
            className={styles.title}
            as="span"
          >
            TOP UP YOUR DEFIHELPER BALANCE
          </Typography>
        </div>
        <Typography variant="body2" className={styles.subtitle}>
          Your personal balance on DeFiHelper is used to pay network commissions
          for automations performed, as well as DeFiHelper commissions. You can
          collect the balance on your balance at any time.
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleOnSubmit}
        >
          <NumericalInput
            {...register('amount', { required: true })}
            placeholder="Enter amount"
            className={styles.input}
            helperText={formState.errors.amount?.message}
            error={Boolean(formState.errors.amount?.message)}
          />
          <div className={styles.balances}>
            <Typography variant="body2" className={styles.grey}>
              Recommended amount to deposit
            </Typography>
            <ButtonBase
              className={styles.recomendedBalance}
              onClick={handleRecommendedIncome}
            >
              {bignumberUtils.format(props.recomendedIncome)} {props.token} ($
              {bignumberUtils.format(
                bignumberUtils.mul(props.recomendedIncome, props.priceUSD)
              )}
              )
            </ButtonBase>
            <Typography variant="body2" className={styles.grey}>
              Your DeFiHelper balance for wallet{' '}
              <Link
                href={buildExplorerUrl({
                  network: props.network,
                  address: props.wallet,
                })}
                target="_blank"
              >
                {cutAccount(props.wallet)}
              </Link>
            </Typography>
            <Typography variant="body2">
              {bignumberUtils.format(props.balance)} {props.token} ($
              {bignumberUtils.format(
                bignumberUtils.mul(props.balance, props.priceUSD)
              )}
              )
            </Typography>
          </div>
          <Button
            type="submit"
            size="small"
            className={styles.button}
            loading={formState.isSubmitting}
          >
            submit
          </Button>
        </form>
      </Dialog>
    )
  }
