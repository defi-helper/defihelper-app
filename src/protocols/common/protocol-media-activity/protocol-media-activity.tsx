import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { Icon } from '~/common/icon'
import { dateUtils } from '~/common/date-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import {
  ProtocolQuery,
  ProtocolSocialPostProviderEnum,
} from '~/graphql/_generated-types'
import { Button } from '~/common/button'
import * as styles from './protocol-media-activity.css'

export type ProtocolMediaActivityProps = {
  className?: string
  mediaActity: Exclude<
    Exclude<ProtocolQuery['protocol'], null | undefined>['socialPosts']['list'],
    null | undefined
  >
  onReadMore: () => void
  loading: boolean
}

export const ProtocolMediaActivity: React.VFC<ProtocolMediaActivityProps> = (
  props
) => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h3" className={styles.title}>
        Recent Media Activity
      </Typography>
      {!isEmpty(props.mediaActity) && (
        <>
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
                    className={clsx(styles.icon, {
                      [styles.twitterIcon]: activity.provider === 'twitter',
                    })}
                  />{' '}
                  {activity.provider !== ProtocolSocialPostProviderEnum.Twitter
                    ? activity.title
                    : ''}
                </Typography>
                <Typography className={styles.cardText} as="div">
                  {activity.content}
                </Typography>
                <Typography variant="body2" className={styles.cardDate}>
                  {dateUtils.format(activity.createdAt, 'DD MMM YY')}
                </Typography>
              </Paper>
            ))}
          </div>
          {!(props.mediaActity.length % 3) && (
            <div className={styles.more}>
              <Button onClick={props.onReadMore} loading={props.loading}>
                Read more
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
