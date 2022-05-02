import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '~/common/button'
import { dateUtils } from '~/common/date-utils'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { ProtocolSocialPostProviderEnum } from '~/api/_generated-types'
import * as model from './protocol-media-activity.model'
import * as styles from './protocol-media-activity.css'

export const ProtocolMediaActivity: React.VFC = () => {
  const mediaActity = useStore(model.$socialPosts)
  const loading = useStore(model.fetchSocialPostsFx.pending)

  const socialPostsOffset = useRef(0)
  const params = useParams<{ protocolId: string }>()

  const handleReadMore = () => {
    model.fetchSocialPostsFx({
      ...params,
      offset: (socialPostsOffset.current += 3),
    })
  }

  useEffect(() => {
    if (mediaActity.length) return

    model.fetchSocialPostsFx({
      ...params,
      offset: 0,
    })
  }, [params, mediaActity])

  useEffect(() => {
    return () => model.reset()
  }, [])

  return (
    <div className={clsx(styles.root)}>
      <Typography variant="h3" className={styles.title}>
        Recent Media Activity
      </Typography>
      {!isEmpty(mediaActity) && (
        <>
          <div className={styles.grid}>
            {mediaActity.map((activity) => (
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
          {!(mediaActity.length % 3) && (
            <div className={styles.more}>
              <Button onClick={handleReadMore} loading={loading}>
                Read more
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
