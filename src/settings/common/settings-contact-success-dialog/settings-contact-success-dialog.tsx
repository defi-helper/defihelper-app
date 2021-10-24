import { Dialog } from '~/common/dialog'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import * as styles from './settings-contact-success-dialog.css'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import { config } from '~/config'

export type SettingsContactSuccessDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  type: UserContactBrokerEnum
  confirmationCode: string
}

const TITLES = {
  [UserContactBrokerEnum.Email]:
    'Please confirm your email by clicking the link in the email',
  [UserContactBrokerEnum.Telegram]: 'Please click to the button and enable bot',
}

export const SettingsContactSuccessDialog: React.VFC<SettingsContactSuccessDialogProps> =
  (props) => {
    return (
      <Dialog className={styles.root}>
        <Typography align="center" className={styles.title}>
          {TITLES[props.type]}
        </Typography>
        <div className={styles.actions}>
          <Button onClick={props.onConfirm}>Ok</Button>
          {props.type === UserContactBrokerEnum.Telegram && (
            <Button
              as="a"
              href={`https://t.me/${config.TELEGRAM_BOT_USERNAME}?start=${props.confirmationCode}`}
              target="_blank"
            >
              Open telegram
            </Button>
          )}
        </div>
      </Dialog>
    )
  }
