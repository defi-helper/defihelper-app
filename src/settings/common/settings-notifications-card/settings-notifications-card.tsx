import clsx from 'clsx'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './settings-notifications-card.css'
import { Switch } from '~/common/switch'

export type SettingsContactCardProps = {
  onSwitch: (v: boolean) => void
  title: string
  enabled: boolean
}

export const SettingsNotificationsCard: React.VFC<SettingsContactCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root)}>
      <div className={styles.title}>
        <Typography>{props.title}</Typography>
      </div>
      <div className={styles.subtitle}>
        <Typography variant="body2" as="span">
          We will send you your portfolio value and how much you have earned
          every day
        </Typography>
      </div>
      <div className={styles.buttons}>
        <Switch
          onChange={(e) => props.onSwitch(e.target.checked)}
          defaultChecked={props.enabled}
        />
      </div>
    </Paper>
  )
}
