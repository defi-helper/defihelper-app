import clsx from 'clsx'

import * as styles from './roadmap-vote.css'
import { Icon } from '~/common/icon'
import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'

export type RoadmapVoteProps = {
  className?: string
  onVote: () => void
  onUnvote: () => void
  voted?: boolean
}

export const RoadmapVote: React.FC<RoadmapVoteProps> = (props) => {
  const handleVoteUnvote = props.voted ? props.onUnvote : props.onVote

  return (
    <ButtonBase
      onClick={handleVoteUnvote}
      className={clsx(
        styles.root,
        props.voted && styles.voted,
        props.className
      )}
    >
      <span className={styles.icon}>
        <Icon icon="upvote" width="14" height="16" />
      </span>
      <Typography as="span" variant="body3" className={styles.title}>
        {props.children ?? 0}
      </Typography>
    </ButtonBase>
  )
}
