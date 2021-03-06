import { Link } from 'react-router-dom'

import { paths } from '~/paths'
import { Can } from '~/auth'
import { Paper } from '~/common/paper'
import { Proposal } from '~/roadmap/common/roadmap.types'
import { RoadmapVote } from '~/roadmap/common/roadmap-vote'
import { RoadmapStatus } from '~/roadmap/common/roadmap-status'
import { Typography } from '~/common/typography'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { MarkdownRender } from '~/common/markdown-render'
import * as styles from './roadmap-card.css'
import { CanDemo } from '~/auth/can-demo'

export type RoadmapCardProps = Proposal & {
  onEdit?: () => void
  onAddTag?: () => void
  onRemoveTag?: () => void
  onDelete?: () => void
  onUnvote: () => void
  onVote: () => void
  voted?: boolean
}

export const RoadmapCard: React.VFC<RoadmapCardProps> = (props) => {
  return (
    <Paper className={styles.root} radius={8}>
      <div className={styles.header}>
        <Typography
          as={Link}
          to={paths.roadmap.detail(props.id)}
          className={styles.proposalTitle}
        >
          {props.title}
        </Typography>
        {(props.onDelete || props.onEdit) && (
          <Can I="update" a="Proposal">
            <Dropdown
              control={
                <ButtonBase
                  className={styles.manageButton}
                  disabled={props.updating || props.deleting}
                >
                  <Icon icon="dots" />
                </ButtonBase>
              }
              offset={[0, 8]}
            >
              <Can I="update" a="Proposal">
                <ButtonBase
                  onClick={props.onEdit}
                  disabled={props.updating}
                  className={styles.manageButtonItem}
                >
                  Edit
                </ButtonBase>
              </Can>
              <Can I="update" a="Proposal">
                <ButtonBase
                  onClick={props.onAddTag}
                  disabled={props.updating}
                  className={styles.manageButtonItem}
                >
                  Add tag
                </ButtonBase>
              </Can>
              <Can I="update" a="Proposal">
                <ButtonBase
                  onClick={props.onRemoveTag}
                  disabled={props.updating}
                  className={styles.manageButtonItem}
                >
                  Remove tag
                </ButtonBase>
              </Can>
              <Can I="delete" a="Proposal">
                <ButtonBase
                  onClick={props.onDelete}
                  disabled={props.deleting}
                  className={styles.manageButtonItem}
                >
                  Delete
                </ButtonBase>
              </Can>
            </Dropdown>
          </Can>
        )}
      </div>
      <Typography variant="body2" as="div" className={styles.description}>
        <MarkdownRender>{props.description}</MarkdownRender>
      </Typography>
      <div className={styles.info}>
        <Dropdown
          control={<RoadmapStatus>{props.status}</RoadmapStatus>}
          placement="top-start"
          offset={[0, 8]}
        >
          <div className={styles.textRow}>
            <Typography variant="body3" as="span" className={styles.titleRow}>
              Planned
            </Typography>
            <Typography variant="body3" as="span">
              {props.plannedAt ?? '-'}
            </Typography>
          </div>
          <div className={styles.textRow}>
            <Typography variant="body3" as="span" className={styles.titleRow}>
              Released
            </Typography>
            <Typography variant="body3" as="span">
              {props.releasedAt ?? '-'}
            </Typography>
          </div>
        </Dropdown>

        <CanDemo targetArgument="onVote">
          <RoadmapVote
            onUnvote={props.onUnvote}
            onVote={props.onVote}
            voted={props.voted}
          >
            {props.votes.list?.length}
          </RoadmapVote>
        </CanDemo>
      </div>
    </Paper>
  )
}
