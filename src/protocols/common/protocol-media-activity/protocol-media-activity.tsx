import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { Icon } from '~/common/icon'
import { dateUtils } from '~/common/date-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ProtocolQuery } from '~/graphql/_generated-types'
import * as styles from './protocol-media-activity.css'

export type ProtocolMediaActivityProps = {
  className?: string
  mediaActity: Exclude<
    Exclude<ProtocolQuery['protocol'], null | undefined>['socialPosts']['list'],
    null | undefined
  >
}

export const ProtocolMediaActivity: React.VFC<ProtocolMediaActivityProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Recent Media Activity
      </Typography>
      {isEmpty(props.mediaActity) && <Typography>Empty</Typography>}
      {!isEmpty(props.mediaActity) && (
        <div className={styles.grid}>
          {props.mediaActity.map((activity) => (
            <Paper
              radius={8}
              key={activity.id}
              className={styles.card}
              as="a"
              href={activity.link}
              target="_blank"
            >
              <Typography variant="body2" className={styles.cardUsername}>
                <Icon
                  icon={activity.provider}
                  height="24"
                  width="24"
                  className={
                    activity.provider === 'twitter'
                      ? styles.twitterIcon
                      : undefined
                  }
                />{' '}
                {activity.title}
              </Typography>
              <Typography className={styles.cardText}>
                {activity.content}
              </Typography>
              <Typography variant="body2" className={styles.cardDate}>
                {dateUtils.format(activity.createdAt, 'DD MMM YY')}
              </Typography>
            </Paper>
          ))}
        </div>
      )}
    </div>
  )
}
