import { useState } from 'react'
import { useGate, useStore } from 'effector-react'
import omit from 'lodash.omit'

import { AppLayout } from '~/layouts'
import { authModel } from '~/auth'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import {
  Proposal,
  RoadmapAttentionDialog,
  RoadmapForm,
  RoadmapGrid,
  RoadmapGroupedByStatus,
  RoadmapSuccessDialog,
} from '~/roadmap/common'
import { Typography } from '~/common/typography'
import { Input } from '~/common/input'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { useQueryParams } from '~/common/hooks'
import { Head } from '~/common/head'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Loader } from '~/common/loader'
import { SearchDialog } from '~/common/search-dialog'
import * as model from './roadmap-list.model'
import * as styles from './roadmap-list.css'

export type RoadmapListProps = unknown

export const RoadmapList: React.VFC<RoadmapListProps> = () => {
  const proposals = useStore(model.$proposalList)
  const groupedProposals = useStore(model.$groupedProposals)
  const loading = useStore(model.fetchProposalListFx.pending)
  const createLoading = useStore(model.createProposalFx.pending)
  const searchParams = useQueryParams()

  const [search, setSearch] = useState('')
  const [openSearchDialog] = useDialog(SearchDialog)

  const user = useStore(authModel.$user)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openRoadmapForm] = useDialog(RoadmapForm)
  const [openRoadmapSuccess] = useDialog(RoadmapSuccessDialog)
  const [openRoadmapAttention] = useDialog(RoadmapAttentionDialog)

  const status = searchParams.get('status')

  const handleSearchMobile = async () => {
    try {
      const result = await openSearchDialog()

      setSearch(result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  useGate(model.ProposalListGate, { status, search })

  const handleVote = (proposal: Proposal) => {
    model.voteProposalFx(proposal)
  }
  const handleUnvote = (proposal: Proposal) => {
    model.unvoteProposalFx({
      proposal,
      userId: user?.id,
    })
  }

  const handleDelete = async (proposal: Proposal) => {
    try {
      await openConfirmDialog()

      model.deleteProposalFx(proposal)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleAdd = async () => {
    try {
      if (!user) {
        await openRoadmapAttention()

        return
      }

      const result = await openRoadmapForm()

      await model.createProposalFx(omit(result, ['plannedAt', 'releasedAt']))

      await openRoadmapSuccess()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleEdit = async (proposal: Proposal) => {
    try {
      const result = await openRoadmapForm({ defaultValues: proposal })

      model.updateProposalFx({
        id: proposal.id,
        input: result,
        proposal,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const hasGroupedProposals = Object.values(groupedProposals).some((group) =>
    Boolean(group?.list?.length)
  )

  return (
    <AppLayout
      title="Roadmap"
      action={
        <div className={styles.action}>
          <ButtonBase
            className={styles.searchButton}
            onClick={handleSearchMobile}
          >
            <Icon icon="search" width="16" height="16" />
          </ButtonBase>
          <Button
            variant="contained"
            color="blue"
            onClick={handleAdd}
            loading={createLoading}
            className={styles.createMobile}
          >
            +
          </Button>
        </div>
      }
    >
      <Head title="Roadmap" />
      <div className={styles.header}>
        <Typography variant="h3">Roadmap</Typography>
        <Input
          placeholder="Search"
          className={styles.input}
          value={search}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="blue"
          className={styles.addButton}
          onClick={handleAdd}
          loading={createLoading}
        >
          + New Proposal
        </Button>
      </div>
      {loading && (
        <Paper radius={8} className={styles.loader}>
          <Loader height="36" />
        </Paper>
      )}
      {!loading && hasGroupedProposals && !(status || search) && (
        <RoadmapGroupedByStatus
          proposals={groupedProposals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onVote={handleVote}
          onUnvote={handleUnvote}
          user={user}
        />
      )}
      {!loading && (status || search) && (
        <RoadmapGrid
          proposals={proposals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onVote={handleVote}
          onUnvote={handleUnvote}
          user={user}
        />
      )}
      {(status || search) && <model.ProposalListPagination />}
    </AppLayout>
  )
}
