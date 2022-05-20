import clsx from 'clsx'

import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './settings-notifications-card.css'
import { Switch } from '~/common/switch'
import { CanDemo } from '~/auth/can-demo'

export type SettingsContactCardProps = {
  onSwitch: (v: boolean) => void
  title: string
  description: JSX.Element
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
          {props.description}
        </Typography>
      </div>
      <div className={styles.buttons}>
        <CanDemo targetArgument="onChange">
          <Switch
            onChange={(e) => props.onSwitch(e.target.checked)}
            checked={props.enabled}
          />
        </CanDemo>
      </div>
    </Paper>
  )
}
