import clsx from 'clsx'

import { Button } from '~/common/button'
import { Chip } from '~/common/chip'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactStatusEnum } from '~/graphql/_generated-types'
import * as styles from './settings-contact-card.css'

export type SettingsContactCardProps = {
  title: string
  address?: string
  type: string
  status?: UserContactStatusEnum
  onEdit?: () => void
  onDelete?: () => void
  loading?: boolean
  className?: string
}

export const SettingsContactCard: React.VFC<SettingsContactCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.title}>
        <Typography>{props.title}</Typography>
        {props.status === UserContactStatusEnum.Inactive && (
          <Chip color="grey">{props.status}</Chip>
        )}
      </div>
      <div className={styles.subtitle}>
        <Icon
          icon={props.type === 'email' ? 'email' : 'telegram'}
          className={styles.icon}
        />
        <Typography variant="body2" as="span">
          {props.address}
        </Typography>
      </div>
      <div className={styles.buttons}>
        {!props.status ? (
          <Button
            size="small"
            variant="light"
            color="primary"
            onClick={props.onEdit}
            loading={props.loading}
          >
            Connect
          </Button>
        ) : (
          <Button
            size="small"
            variant="light"
            color="red"
            onClick={props.onDelete}
            loading={props.loading}
          >
            Disconnect
          </Button>
        )}
      </div>
    </Paper>
  )
}
