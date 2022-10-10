import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'
import omit from 'lodash.omit'

import {
  STATUSES,
  RoadmapCard,
  Proposal,
  ProposalsByStatus,
} from '~/roadmap/common'
import { Typography } from '~/common/typography'
import { UserType } from '~/api/_generated-types'
import * as styles from './roadmap-grouped-by-status.css'
import { paths } from '~/paths'

export type RoadmapGroupedByStatusProps = {
  proposals: ProposalsByStatus
  user?: Pick<UserType, 'id' | 'createdAt' | 'role'> | null
  onEdit: (proposal: Proposal) => void
  onVote: (proposal: Proposal) => void
  onUnvote: (proposal: Proposal) => void
  onDelete: (proposal: Proposal) => void
  onAddTag: (proposal: Proposal) => void
  onRemoveTag: (proposal: Proposal) => void
}

export const RoadmapGroupedByStatus: React.VFC<RoadmapGroupedByStatusProps> = (
  props
) => {
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
    <div className={styles.root}>
      {Object.entries(omit(props.proposals, 'pagination')).map(
        ([status, proposalsByStatusesItem]) => (
          <div key={status}>
            <Typography
              transform="uppercase"
              family="mono"
              className={clsx(
                styles.colTitle,
                styles.colTitles[status as keyof typeof STATUSES]
              )}
              as={ReactRouterLink}
              to={`${paths.roadmap.list}?status=${status}`}
            >
              {STATUSES[status as keyof typeof STATUSES]}{' '}
              {proposalsByStatusesItem?.pagination.count}
            </Typography>
            <ul className={styles.list}>
              {proposalsByStatusesItem?.list?.map((proposal) => {
                const voted = proposal.votes.list?.some(
                  (votes) => votes.user.id === props.user?.id
                )

                return (
                  <li key={proposal.id}>
                    <RoadmapCard
                      {...proposal}
                      voted={voted}
                      onVote={handleVote(proposal)}
                      onUnvote={handleUnvote(proposal)}
                      onDelete={handleDelete(proposal)}
                      onEdit={handleEdit(proposal)}
                      onAddTag={handleAddTag(proposal)}
                      onRemoveTag={handleRemoveTag(proposal)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      )}
    </div>
  )
}
