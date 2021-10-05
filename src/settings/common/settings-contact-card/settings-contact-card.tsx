import clsx from 'clsx'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './settings-contact-card.css'

export type SettingsContactCardProps = {
  title: string
  address: string
  type: string
  onEdit: () => void
  onDelete: () => void
  deleting?: boolean
  editing?: boolean
  className?: string
}

export const SettingsContactCard: React.VFC<SettingsContactCardProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography>{props.title}</Typography>
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
        <Button
          size="small"
          variant="light"
          color="primary"
          onClick={props.onEdit}
          loading={props.editing}
          disabled={props.deleting}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="light"
          color="red"
          onClick={props.onDelete}
          disabled={props.editing}
          loading={props.deleting}
        >
          Delete
        </Button>
      </div>
    </Paper>
  )
}
