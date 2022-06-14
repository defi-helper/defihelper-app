import clsx from 'clsx'

import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactStatusEnum } from '~/api/_generated-types'
import { CanDemo } from '~/auth/can-demo'
import { ButtonBase } from '~/common/button-base'
import { Switch } from '~/common/switch'
import * as styles from './settings-contact-card.css'

export type SettingsContactCardProps = {
  title: string
  address?: string
  type: string
  status?: UserContactStatusEnum
  onConnect?: () => void
  onDisconnect?: () => void
  loading?: boolean
  className?: string
}

export const SettingsContactCard: React.VFC<SettingsContactCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography className={styles.title} as="div" variant="body3">
        {props.title}
      </Typography>
      <div className={styles.subtitle}>
        <Icon
          icon={props.type === 'email' ? 'email' : 'telegram'}
          className={styles.icon}
        />
        <Typography variant="body3" as="span">
          {props.address}
        </Typography>
        <Typography variant="body3" as="div" className={styles.buttons}>
          <CanDemo>
            <ButtonBase
              onClick={!props.status ? props.onConnect : props.onDisconnect}
              className={clsx({
                [styles.connect]: !props.status,
                [styles.disconnect]: props.status,
              })}
            >
              {!props.status ? 'connect' : 'disconnect'}
            </ButtonBase>
          </CanDemo>
        </Typography>
      </div>
      <div className={styles.switcher}>
        <Typography variant="body2" as="div">
          Portfolio Status
        </Typography>
        <Switch />
        <ButtonBase className={styles.date}>
          12:00 <Icon icon="arrowDown" width="1em" height="1em" />
        </ButtonBase>
      </div>
    </Paper>
  )
}
