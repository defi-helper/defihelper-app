import clsx from 'clsx'

import { RoadmapCard, Proposal } from '~/roadmap/common'
import { UserType } from '~/api/_generated-types'
import { Typography } from '~/common/typography'
import * as styles from './roadmap-grid.css'
import { STATUSES } from '../constants'

export type RoadmapGridProps = {
  proposals: Proposal[]
  user?: Pick<UserType, 'id' | 'createdAt' | 'role'> | null
  onEdit: (proposal: Proposal) => void
  onVote: (proposal: Proposal) => void
  onUnvote: (proposal: Proposal) => void
  onDelete: (proposal: Proposal) => void
  onAddTag: (proposal: Proposal) => void
  onRemoveTag: (proposal: Proposal) => void
  status: string | null
}

export const RoadmapGrid: React.VFC<RoadmapGridProps> = (props) => {
  const handleVote = (proposal: Proposal) => () => {
    props.onVote(proposal)
  }
  const handleUnvote = (proposal: Proposal) => () => {
    props.onUnvote(proposal)
  }

  const handleDelete = (proposal: Proposal) => async () => {
    props.onDelete(proposal)
  }

  const handleEdit = (proposal: Proposal) => () => {
    props.onEdit(proposal)
  }

  const handleAddTag = (proposal: Proposal) => () => {
    props.onAddTag(proposal)
  }

  const handleRemoveTag = (proposal: Proposal) => () => {
    props.onRemoveTag(proposal)
  }

  return (
    <>
      <Typography
        transform="uppercase"
        family="mono"
        className={clsx(
          styles.colTitle,
          styles.colTitles[props.status as keyof typeof STATUSES]
        )}
      >
        {STATUSES[props.status as keyof typeof STATUSES]}
      </Typography>
      <div className={styles.root}>
        {props.proposals.map((proposal) => {
          const voted = proposal.votes.list?.some(
            (votes) => votes.user.id === props.user?.id
          )

          return (
            <RoadmapCard
              key={proposal.id}
              {...proposal}
              voted={voted}
              onVote={handleVote(proposal)}
              onUnvote={handleUnvote(proposal)}
              onDelete={handleDelete(proposal)}
              onEdit={handleEdit(proposal)}
              onAddTag={handleAddTag(proposal)}
              onRemoveTag={handleRemoveTag(proposal)}
            />
          )
        })}
      </div>
    </>
  )
}
