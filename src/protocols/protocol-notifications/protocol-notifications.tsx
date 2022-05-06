import phone from '~/assets/images/phone.png'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './protocol-notifications.css'

export type ProtocolNotificationsProps = unknown

export const ProtocolNotifications: React.VFC<ProtocolNotificationsProps> =
  () => {
    return (
      <Paper radius={8} className={styles.root}>
        <div className={styles.imgWrap}>
          <img alt="" src={phone} className={styles.img} />
        </div>
        <Typography variant="h3">
          Set up{' '}
          <Typography variant="inherit" className={styles.green}>
            notifications
          </Typography>{' '}
          and get daily updates on your portfolio via{' '}
          <Typography variant="inherit" className={styles.green}>
            Telegram
          </Typography>{' '}
          or{' '}
          <Typography variant="inherit" className={styles.green}>
            email
          </Typography>
          <br />
          <br />
        </Typography>
      </Paper>
    )
  }
