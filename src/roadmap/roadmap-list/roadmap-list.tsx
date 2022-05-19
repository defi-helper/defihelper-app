import { useEffect, useState } from 'react'
import { useGate, useStore } from 'effector-react'
import omit from 'lodash.omit'
import { Link as ReactRouterLink } from 'react-router-dom'

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
  RoadmapTag,
  TAGS,
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
import { ProposalTagEnum } from '~/api/_generated-types'
import { Select, SelectOption } from '~/common/select'
import { CanDemo } from '~/auth/common/can-demo'
import { paths } from '~/paths'
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
  const [currentOption, setOption] = useState<string>('')
  const [openSearchDialog] = useDialog(SearchDialog)

  const user = useStore(authModel.$user)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openRoadmapForm] = useDialog(RoadmapForm)
  const [openRoadmapSuccess] = useDialog(RoadmapSuccessDialog)
  const [openRoadmapAttention] = useDialog(RoadmapAttentionDialog)
  const [openRoadmapTag] = useDialog(RoadmapTag)

  const status = searchParams.get('status')
  const tag = searchParams.get('tag')

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

  useGate(model.ProposalListGate, {
    status,
    search,
    tag: currentOption as ProposalTagEnum,
  })

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

      const result = await openRoadmapForm({
        defaultTag: tag ?? undefined,
      })

      const createdProposal = await model.createProposalFx(
        omit(result, ['plannedAt', 'releasedAt', 'tags'])
      )
      await model.tagProposalFx({
        proposal: createdProposal.id,
        status: createdProposal.status,
        tag: result.tags,
      })

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
      await model.updateProposalFx({
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

  const handleAddTag = async (proposal: Proposal) => {
    try {
      const result = await openRoadmapTag()

      model.tagProposalFx({
        proposal: proposal.id,
        tag: result.tag,
        status: proposal.status,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleRemoveTag = async (proposal: Proposal) => {
    try {
      const result = await openRoadmapTag({
        defaultValues: {
          tag: proposal.tags[0],
        },
      })

      model.untagProposalFx({
        proposal: proposal.id,
        tag: result.tag,
        status: proposal.status,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    if (!tag || !user) return

    handleAdd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag, user])

  return (
    <AppLayout
      title={
        <div className={styles.mobileTabs}>
          <div>Vote</div>
          <Typography
            variant="inherit"
            as={ReactRouterLink}
            to={paths.governance.list}
            className={styles.inacitveTab}
          >
            Governance
          </Typography>
        </div>
      }
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
      <Head title="Vote" />
      <div className={styles.header}>
        <Typography variant="h3">Vote</Typography>
        <Typography
          variant="h3"
          as={ReactRouterLink}
          to={paths.governance.list}
          className={styles.inacitveTab}
        >
          Governance
        </Typography>
        <Typography
          variant="body2"
          transform="uppercase"
          family="mono"
          className={styles.year}
        >
          DFH {new Date().getFullYear()} roadmap
        </Typography>
        <CanDemo>
          <Button
            variant="contained"
            color="blue"
            className={styles.addButton}
            onClick={handleAdd}
            loading={createLoading}
          >
            + New Request
          </Button>
        </CanDemo>
      </div>
      <Typography variant="h4" className={styles.subtitle}>
        Here you can see the planned features of the service and vote and add
        the features you need
      </Typography>
      <div className={styles.inputs}>
        <Select
          value={currentOption}
          onChange={({ target }) => setOption(target.value)}
          className={styles.select}
        >
          <SelectOption value="">All</SelectOption>
          {Object.entries(TAGS).map(([key, title]) => (
            <SelectOption key={key} value={key}>
              {title}
            </SelectOption>
          ))}
        </Select>
        <Input
          placeholder="Search"
          value={search}
          className={styles.search}
          onChange={handleSearch}
        />
      </div>
      {loading && (
        <Paper radius={8} className={styles.loader}>
          <Loader height="36" />
        </Paper>
      )}
      {!loading &&
        hasGroupedProposals &&
        !(status || search || currentOption) && (
          <RoadmapGroupedByStatus
            proposals={groupedProposals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onVote={handleVote}
            onUnvote={handleUnvote}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            user={user}
          />
        )}
      {!loading && (status || search || currentOption) && (
        <RoadmapGrid
          proposals={proposals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onVote={handleVote}
          onUnvote={handleUnvote}
          user={user}
          status={status}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      )}
      {(status || search) && <model.ProposalListPagination />}
    </AppLayout>
  )
}
