import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'
import omit from 'lodash.omit'
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd'

import {
  STATUSES,
  RoadmapCard,
  Proposal,
  ProposalsByStatus,
} from '~/roadmap/common'
import { Typography } from '~/common/typography'
import { ProposalStatusEnum, UserType } from '~/api/_generated-types'
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
  onDragEnd: (proposal: Proposal & { nextStatus: ProposalStatusEnum }) => void
  dragDisabled: boolean
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

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const prevProposal =
      props.proposals[result.source.droppableId as ProposalStatusEnum]?.list?.[
        result.source.index
      ]

    if (!prevProposal) return

    props.onDragEnd({
      ...prevProposal,
      nextStatus: result.destination.droppableId as ProposalStatusEnum,
    })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
              <Droppable
                droppableId={status}
                type="TASK"
                isDropDisabled={props.dragDisabled}
              >
                {(taskDroppableProvided) => {
                  return (
                    <ul
                      className={styles.list}
                      {...taskDroppableProvided.droppableProps}
                      ref={taskDroppableProvided.innerRef}
                    >
                      {proposalsByStatusesItem?.list?.map(
                        (proposal, proposalIndex) => {
                          const voted = proposal.votes.list?.some(
                            (votes) => votes.user.id === props.user?.id
                          )

                          return (
                            <Draggable
                              key={proposal.id}
                              draggableId={proposal.id}
                              index={proposalIndex}
                              isDragDisabled={props.dragDisabled}
                            >
                              {(taskDraggableProvided) => {
                                return (
                                  <li
                                    key={proposal.id}
                                    {...taskDraggableProvided.draggableProps}
                                    {...taskDraggableProvided.dragHandleProps}
                                    ref={taskDraggableProvided.innerRef}
                                  >
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
                              }}
                            </Draggable>
                          )
                        }
                      )}
                      {taskDroppableProvided.placeholder}
                    </ul>
                  )
                }}
              </Droppable>
            </div>
          )
        )}
      </div>
    </DragDropContext>
  )
}
