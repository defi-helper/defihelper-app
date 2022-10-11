import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { config } from '~/config'
import { UserContactBrokerEnum } from '~/api/_generated-types'
import * as styles from './settings-success-dialog.css'

export enum TransactionEnum {
  refund = 'refund',
  deposit = 'deposit',
}

export type SettingsSuccessDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  type: UserContactBrokerEnum | TransactionEnum
  confirmationCode?: string
}

const TITLES = {
  [UserContactBrokerEnum.Email]:
    'Please check your email and confirm your subscription',
  [UserContactBrokerEnum.Telegram]: 'Please confirm your Telegram username',
  [TransactionEnum.refund]: 'Refund successful',
  [TransactionEnum.deposit]:
    'Deposit successful. Please wait 3-5 minutes until the money will appear on your balance',
}

export const SettingsSuccessDialog: React.VFC<SettingsSuccessDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography className={styles.title}>{TITLES[props.type]}</Typography>

      {props.type === UserContactBrokerEnum.Telegram && (
        <Typography className={styles.description}>
          don&apos;t forget to press START in the chat to confirm your username
        </Typography>
      )}
      <div className={styles.actions}>
        {props.type === UserContactBrokerEnum.Email && (
          <Button onClick={props.onConfirm} size="small">
            Continue
          </Button>
        )}
        {props.type === UserContactBrokerEnum.Telegram && (
          <Button
            as="a"
            href={`https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${props.confirmationCode}`}
            target="_blank"
            size="small"
          >
            Open telegram
          </Button>
        )}
      </div>
    </Dialog>
  )
}
