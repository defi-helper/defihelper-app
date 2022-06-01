import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-balance-dialog.css'

export type AutostakingBalanceDialogProps = {
  onConfirm: () => void
}

export const AutostakingBalanceDialog: React.VFC<AutostakingBalanceDialogProps> =
  (props) => {
    const { register, handleSubmit } = useForm<{ balance: string }>()

    const handleOnSubmit = handleSubmit((formValues) => {
      console.log(formValues)

      props.onConfirm()
    })

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
            {...register('balance')}
            placeholder="Enter amount"
            className={styles.input}
          />
          <div className={styles.balances}>
            <Typography variant="body2" className={styles.grey}>
              Recommended amount to deposit
            </Typography>
            <Typography variant="body2" className={styles.recomendedBalance}>
              1 BNB ($290,76)
            </Typography>
            <Typography variant="body2" className={styles.grey}>
              Your DeFiHelper balance for wallet 23wbs4...4dsda2
            </Typography>
            <Typography variant="body2">2 BNB ($582,22)</Typography>
          </div>
          <Button type="submit">submit</Button>
        </form>
      </Dialog>
    )
  }
