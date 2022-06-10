import clsx from 'clsx'

import { Button } from '~/common/button'
import { Chip } from '~/common/chip'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactStatusEnum } from '~/api/_generated-types'
import * as styles from './settings-contact-card.css'
import { CanDemo } from '~/auth/can-demo'

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
      <Typography className={styles.title} as="div">
        <Icon
          icon={props.type === 'email' ? 'email' : 'telegram'}
          className={styles.icon}
        />
        <Typography variant="inherit">{props.title}</Typography>
        {props.status === UserContactStatusEnum.Inactive && (
          <Chip color="grey" className={styles.status}>
            {props.status}
          </Chip>
        )}
      </Typography>
      <div className={styles.subtitle}>
        <Typography variant="body2" as="span">
          {props.address}
        </Typography>
      </div>
      <div className={styles.buttons}>
        <CanDemo>
          {!props.status ? (
            <Button
              size="small"
              variant="light"
              color="primary"
              onClick={props.onConnect}
              loading={props.loading}
            >
              Connect
            </Button>
          ) : (
            <Button
              size="small"
              variant="light"
              color="red"
              onClick={props.onDisconnect}
              loading={props.loading}
            >
              Disconnect
            </Button>
          )}
        </CanDemo>
      </div>
    </Paper>
  )
}
