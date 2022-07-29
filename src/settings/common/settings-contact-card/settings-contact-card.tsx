import clsx from 'clsx'

import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import {
  UserContactStatusEnum,
  UserNotificationTypeFragment,
} from '~/api/_generated-types'
import { CanDemo } from '~/auth/can-demo'
import { ButtonBase } from '~/common/button-base'
import { Switch } from '~/common/switch'
import { Dropdown } from '~/common/dropdown'
import { Button } from '~/common/button'
import * as styles from './settings-contact-card.css'

export type SettingsContactCardProps = {
  isConnected: boolean
  title: string
  address?: string
  type: string
  currentTimezone: string
  status?: UserContactStatusEnum
  notification?: UserNotificationTypeFragment
  onConnect?: () => void
  onDisconnect?: () => void
  onToggleNotification?: (state: boolean, hour: number) => void
  onUpdateNotification?: (state: boolean, hour: number) => void
  loading?: boolean
  className?: string
}

export const SettingsContactCard: React.VFC<SettingsContactCardProps> = (
  props
) => {
  const formatHour = (n: number): string => `${String(n).padStart(2, '0')}:00`
  const handleToggleNotification = () => {
    if (!props.onToggleNotification) return
    props.onToggleNotification(
      !props.notification,
      props.notification?.time ?? 12
    )
  }
  const handleUpdateNotification = (state: boolean, hour: number) => {
    if (!props.onUpdateNotification) return
    props.onUpdateNotification(state, hour)
  }

  if (!props.isConnected) {
    return (
      <Paper radius={8} className={clsx(styles.root, props.className)}>
        <Typography className={styles.title} as="div" variant="body3">
          {props.title}
        </Typography>
        <div className={styles.subtitle}>
          <Typography variant="body3" as="span">
            Connect your {props.type} account to receive smart notifications
            about your portfolio
          </Typography>
        </div>
        <div>
          <Button
            color="blue"
            onClick={props.onConnect}
            className={styles.connectPrimaryButton}
          >
            Connect
            <Icon
              icon={props.type === 'email' ? 'email' : 'telegram'}
              className={styles.icon}
            />
          </Button>
        </div>
      </Paper>
    )
  }

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
          {props.address ?? 'turn on notifications'}
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
        <Switch
          disabled={!props?.onToggleNotification}
          checked={!!props.notification}
          onChange={handleToggleNotification}
        />
        <Dropdown
          control={
            <ButtonBase className={styles.date}>
              {props.notification?.time
                ? formatHour(props.notification?.time)
                : '12:00'}{' '}
              <Icon icon="arrowDown" width="1em" height="1em" />
            </ButtonBase>
          }
          className={styles.dropdown}
          offset={[0, 8]}
        >
          {Array.from(Array(24).keys()).map((v) => (
            <ButtonBase
              className={clsx(styles.dropdownItem)}
              onClick={() => handleUpdateNotification(!!props.notification, v)}
              key={v}
            >
              {formatHour(v)}
            </ButtonBase>
          ))}
        </Dropdown>
      </div>

      <div className={styles.timezone}>
        <Typography variant="body2" as="div">
          Current time zone
        </Typography>

        <Typography variant="body2" as="div">
          {props.currentTimezone}
        </Typography>
      </div>
    </Paper>
  )
}
